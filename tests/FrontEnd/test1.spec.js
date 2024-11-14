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

  test("Login", async () => {
    await login(page);
    await expect(page).toHaveTitle("CaterOrange");
  });


});
