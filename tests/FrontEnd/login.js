const { email, password, url } = require( "./config");

async function login(page) {
    await page.goto(url);
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(email);
  
    await page.getByPlaceholder("Password").click();
    await page.getByPlaceholder("Password").fill(password);
  
    await page.locator("//button[normalize-space()='Sign In']").click();
  
  }

  module.exports ={ login }