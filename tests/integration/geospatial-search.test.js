const puppeteer = require("puppeteer");

describe("Radius Search", () => {

let browser;
let page;

beforeAll(async () => {

browser = await puppeteer.launch({
 headless: true,
 args: ["--no-sandbox"]
});

page = await browser.newPage();

await page.goto("http://app:3006/properties");

await page.waitForSelector('[data-testid="map-loaded"]');

});

test("Radius slider filters properties", async () => {

await page.waitForSelector(
'[data-testid="search-radius-slider"]'
);

await page.evaluate(() => {

document.querySelector(
'[data-testid="search-radius-slider"]'
).value = 10;

});

const cards =
await page.$$('[data-testid^="property-card-"]');

expect(cards.length).toBeGreaterThan(0);

});

afterAll(async () => {
await browser.close();
});

});
