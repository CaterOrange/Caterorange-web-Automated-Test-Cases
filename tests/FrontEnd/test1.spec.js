import { login } from "../FrontEnd/login";
import { test, expect } from "@playwright/test";
import { url } from "./config";

test.describe("CaterOrange User", () => {
  let page;

  test.beforeAll(
    "create page",
    async ({ browser }) => {
      const context = await browser.newContext({
        recordVideo: {
          dir: "video/",
          size: {
            width: 640,
            height: 480,
          },
        },
      });

      page = await context.newPage();

    }
  );

  test.only("Login", async () => {
    await login(page);
    await expect(page).toHaveTitle("CaterOrange");
  });

  test("Validate Corporate Meals navigation bar", async () => {
    await page.goto(`${url}/home`);
    const navText = await page.textContent("text=CORPORATE MEALS");
    expect(navText).toBe("CORPORATE MEALS");
  });

  test("Check meal sections visibility", async () => {
    await page.goto("https://dev.caterorange.com/home");
    expect(await page.isVisible("text=Breakfast")).toBeTruthy();
    expect(await page.isVisible("text=Veg Lunch")).toBeTruthy();
    expect(await page.isVisible("text=NonVeg Lunch")).toBeTruthy();
  });

  test("Validate meal prices", async () => {
    await page.goto("https://dev.caterorange.com/home");
    const breakfastPrice = await page.textContent("text=Price Per Plate: 40/-");
    const vegLunchPrice = await page.textContent("text=Price Per Plate: 99/-");
    const nonVegLunchPrice = await page.textContent(
      "text=Price Per Plate: 120/-"
    );
    expect(breakfastPrice).toBe("Price Per Plate: 40/-");
    expect(vegLunchPrice).toBe("Price Per Plate: 99/-");
    expect(nonVegLunchPrice).toBe("Price Per Plate: 120/-");
  });

  test("Test quantity increment and decrement", async () => {
    await page.goto("https://dev.caterorange.com/home");

    // Increase quantity for Breakfast
    await page.click('text=Breakfast >> button:has-text("+")');
    let quantity = await page.inputValue(
      'text=Breakfast >> input[type="number"]'
    );
    expect(quantity).toBe("1");

    // Decrease quantity for Breakfast
    await page.click('text=Breakfast >> button:has-text("-")');
    quantity = await page.inputValue('text=Breakfast >> input[type="number"]');
    expect(quantity).toBe("0");
  });

  test("Verify Change button functionality", async () => {
    await page.goto("https://dev.caterorange.com/home");
    await page.click("text=Change");
    // Add assertions based on expected outcome, such as a modal or a redirect.
  });

  test("Validate refresh button functionality", async () => {
    await page.goto("https://dev.caterorange.com/home");
    await page.click('text=Breakfast >> button[title="Refresh"]');
    // Add assertions based on the expected behavior.
  });
});
