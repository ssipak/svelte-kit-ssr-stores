import { expect, test } from "@playwright/test";

// We want to see the page the way it's rendered on the server
test.use({ javaScriptEnabled: false });
test("regular counter is polluted while isolated isn't", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.reload({ waitUntil: "domcontentloaded" });
  // The regular counter is persistent on the server
  expect(await page.textContent("#regular")).toBe("2");
  // The isolated counter's value stored on the server as long as request is in processing
  expect(await page.textContent("#isolated")).toBe("1");
});
