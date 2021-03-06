import path from 'path'
import puppeteer, { Browser, Page } from 'puppeteer'

jest.setTimeout(30000)

let browser: Browser
let page: Page

beforeAll(async () => {
  browser =
    process.env.CI === 'true'
      ? await puppeteer.launch({
          headless: true,
          timeout: 0,
          args: ['--no-sandbox']
        })
      : await puppeteer.launch({ headless: false, timeout: 0 })
  page = await browser.newPage()
})
afterAll(() => {
  browser.close()
})

beforeEach(async () => {
  await page.goto('http://localhost:9000')
})

test('Initial display', async () => {
  expect(await page.$eval('[data-test="count"]', v => v.textContent)).toEqual(
    '0'
  )
  expect(
    await page.$eval('[data-test="saga-count"]', v => v.textContent)
  ).toEqual('0')

  await page.screenshot({
    path: path.join(__dirname, '__screenshots__', 'initial-display.png'),
    fullPage: true
  })
})

test('Click the add-count, update the count', async () => {
  await page.waitForSelector('[data-test="add-count"]')
  await page.click('[data-test="add-count"]')

  expect(await page.$eval('[data-test="count"]', v => v.textContent)).toEqual(
    '1'
  )
  expect(
    await page.$eval('[data-test="saga-count"]', v => v.textContent)
  ).toEqual('0')

  await page.screenshot({
    path: path.join(__dirname, '__screenshots__', 'add-count.png'),
    fullPage: true
  })
})

test('Click the button.add-saga-count, update the sagaCount', async () => {
  await page.waitForSelector('[data-test="add-saga-count"]')
  await page.click('[data-test="add-saga-count"]')
  await page.waitFor(1000)

  expect(await page.$eval('[data-test="count"]', v => v.textContent)).toEqual(
    '0'
  )
  expect(
    await page.$eval('[data-test="saga-count"]', v => v.textContent)
  ).toEqual('2')

  await page.screenshot({
    path: path.join(__dirname, '__screenshots__', 'add-saga-count.png'),
    fullPage: true
  })
})
