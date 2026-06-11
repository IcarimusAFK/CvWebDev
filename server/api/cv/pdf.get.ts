import { chromium } from 'playwright'
import { getCvContent, parseCvLocale } from '~/data/cv'

const MM_TO_PX = 96 / 25.4
const PAGE_WIDTH_MM = 210
const PAGE_HEIGHT_MM = 297

const pageWidthPx = PAGE_WIDTH_MM * MM_TO_PX
const pageHeightPx = PAGE_HEIGHT_MM * MM_TO_PX

export default defineEventHandler(async (event) => {
  const locale = parseCvLocale(getQuery(event).lang)
  const { profile } = getCvContent(locale)
  const requestUrl = getRequestURL(event)
  const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`
  const targetUrl = `${baseUrl}/?pdf=1&lang=${locale}`

  let browser

  try {
    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({
      viewport: {
        width: Math.round(pageWidthPx),
        height: Math.round(pageHeightPx),
      },
    })

    await page.goto(targetUrl, {
      waitUntil: 'networkidle',
      timeout: 30_000,
    })

    const { width, height } = await page.evaluate(() => {
      const main = document.querySelector('main') as HTMLElement

      return {
        width: main.scrollWidth,
        height: main.scrollHeight,
      }
    })

    const scale = Math.min(
      pageWidthPx / width,
      pageHeightPx / height,
      1,
    )

    const pdf = await page.pdf({
      width: `${PAGE_WIDTH_MM}mm`,
      height: `${PAGE_HEIGHT_MM}mm`,
      printBackground: true,
      preferCSSPageSize: true,
      scale: Math.max(scale, 0.1),
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      },
    })

    const filename = `cv-${profile.name.toLowerCase().replace(/\s+/g, '-')}${locale === 'en' ? '-en' : ''}.pdf`

    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `attachment; filename="${filename}"`)

    return pdf
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Impossible de générer le PDF',
    })
  }
  finally {
    await browser?.close()
  }
})
