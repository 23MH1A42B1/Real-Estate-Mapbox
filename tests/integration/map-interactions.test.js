const puppeteer = require("puppeteer");

describe("Map Marker Interaction", () => {

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

test("Click marker highlights property", async () => {

await page.waitForSelector('[data-testid^="map-marker-"]');

const marker =
await page.$('[data-testid^="map-marker-"]');

await marker.click();

const highlighted =
await page.$('.property-card');

expect(highlighted).toBeTruthy();

});

afterAll(async () => {
await browser.close();
});

});
