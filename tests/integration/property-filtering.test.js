const puppeteer = require("puppeteer");
const fs = require("fs");

describe("Property Filtering Test", () => {

let browser;
let page;

beforeAll(async () => {

browser = await puppeteer.launch({
 headless: true,
 args: ["--no-sandbox"]
});

page = await browser.newPage();

await page.goto("http://app:3006/properties");

await page.waitForSelector(
 '[data-testid="map-loaded"]'
);

});

test("Properties should be visible", async () => {

const cards =
 await page.$$('[data-testid^="property-card-"]');

expect(cards.length).toBeGreaterThan(0);

});

afterAll(async () => {

await page.screenshot({
 path:
 "test-results/screenshots/property-filtering.png"
});

await browser.close();

});

});
