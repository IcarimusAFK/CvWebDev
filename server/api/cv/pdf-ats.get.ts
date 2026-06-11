import { chromium } from 'playwright'
import { getCvContent, parseCvLocale } from '~/data/cv'

export default defineEventHandler(async (event) => {
  const locale = parseCvLocale(getQuery(event).lang)
  const { profile } = getCvContent(locale)
  const requestUrl = getRequestURL(event)
  const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`
  const targetUrl = `${baseUrl}/?pdf=ats&lang=${locale}`

  let browser

  try {
    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({
      viewport: {
        width: 794,
        height: 1123,
      },
    })

    await page.goto(targetUrl, {
      waitUntil: 'networkidle',
      timeout: 30_000,
    })

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '15mm',
        right: '15mm',
        bottom: '15mm',
        left: '15mm',
      },
    })

    const filename = `cv-ats-${profile.name.toLowerCase().replace(/\s+/g, '-')}${locale === 'en' ? '-en' : ''}.pdf`

    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `attachment; filename="${filename}"`)

    return pdf
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Impossible de générer le PDF ATS',
    })
  }
  finally {
    await browser?.close()
  }
})
