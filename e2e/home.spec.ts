import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
	test("should display the home page", async ({ page }) => {
		await page.goto("/home");

		// Check page loads
		await expect(page).toHaveTitle(/Next.js Template/);
	});

	test("should navigate to login page", async ({ page }) => {
		await page.goto("/home");

		// Click login link if present
		const loginLink = page.getByRole("link", { name: /login|sign in/i });
		if (await loginLink.isVisible()) {
			await loginLink.click();
			await expect(page).toHaveURL(/\/login/);
		}
	});
});
