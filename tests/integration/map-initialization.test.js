const puppeteer = require("puppeteer");

describe("Map Initialization Test", () => {

let browser;
let page;

beforeAll(async () => {

browser = await puppeteer.launch({
 headless: true,
 args: ["--no-sandbox"]
});

page = await browser.newPage();

await page.goto(
 process.env.APP_URL || "http://localhost:3006/properties"
);

});

test("Map loads successfully", async () => {

await page.waitForSelector(
'[data-testid="map-loaded"]',
{ timeout: 10000 }
);

const element =
await page.$('[data-testid="map-loaded"]');

expect(element).not.toBeNull();

});

afterAll(async () => {

await browser.close();

});

});
