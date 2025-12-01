import { expect, test } from "@playwright/test";

test.describe("Dashboard (Protected Route)", () => {
	test("should redirect to login when not authenticated", async ({ page }) => {
		await page.goto("/dashboard");

		// Should be redirected to login
		await expect(page).toHaveURL(/\/login/);
	});

	test("should include callback URL when redirected", async ({ page }) => {
		await page.goto("/dashboard");

		// Should have callbackUrl parameter
		await expect(page).toHaveURL(/callbackUrl/);
	});
});
