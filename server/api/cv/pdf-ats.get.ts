import { chromium } from 'playwright'
import { profile } from '~/data/profile'

export default defineEventHandler(async (event) => {
  const requestUrl = getRequestURL(event)
  const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`
  const targetUrl = `${baseUrl}/?pdf=ats`

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

    const filename = `cv-ats-${profile.name.toLowerCase().replace(/\s+/g, '-')}.pdf`

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
