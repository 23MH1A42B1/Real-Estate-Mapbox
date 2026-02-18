const puppeteer = require("puppeteer");

describe("Location Autocomplete", () => {

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

test("Autocomplete moves the map", async () => {

await page.type(
'[data-testid="location-autocomplete"]',
"San Francisco"
);

await page.waitForSelector(
'[data-testid="autocomplete-suggestion-0"]'
);

await page.click(
'[data-testid="autocomplete-suggestion-0"]'
);

const center = await page.evaluate(() => {
 return window.mapboxMap.getCenter();
});

expect(center).toBeTruthy();

});

afterAll(async () => {
await browser.close();
});

});
