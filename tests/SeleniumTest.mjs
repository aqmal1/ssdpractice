import { Builder, By, until } from "selenium-webdriver";

(async () => {
  const driver = await new Builder()
    .forBrowser("chrome")
    .usingServer("http://selenium:4444/wd/hub")   // hostname 'selenium' comes from workflow service
    .build();

  try {
    await driver.get("http://app:3000/");         // hostname 'app' defined in workflow
    const h1 = await driver.wait(
      until.elementLocated(By.css("h1")),
      5000
    );
    const text = await h1.getText();
    if (text !== "Hello Secure Software Development") {
      throw new Error("Unexpected page content");
    }
    console.log("✅ Selenium integration test passed");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await driver.quit();
  }
})();
