import { expect, test } from "@playwright/test";

test.describe("Authentication", () => {
	test("should display login page", async ({ page }) => {
		await page.goto("/login");

		await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
		await expect(page.getByLabel(/username/i)).toBeVisible();
		await expect(page.getByLabel(/password/i)).toBeVisible();
		await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
	});

	test("should display register page", async ({ page }) => {
		await page.goto("/register");

		await expect(
			page.getByRole("heading", { name: /create account/i }),
		).toBeVisible();
		await expect(page.getByLabel(/email/i)).toBeVisible();
		await expect(page.getByLabel(/username/i)).toBeVisible();
	});

	test("should show validation errors on empty login submit", async ({
		page,
	}) => {
		await page.goto("/login");

		await page.getByRole("button", { name: /sign in/i }).click();

		// Should show validation errors
		await expect(page.getByText(/required|invalid/i).first()).toBeVisible();
	});

	test("should have link to register from login", async ({ page }) => {
		await page.goto("/login");

		const registerLink = page.getByRole("link", { name: /create account/i });
		await expect(registerLink).toBeVisible();
		await registerLink.click();
		await expect(page).toHaveURL(/\/register/);
	});

	test("should have link to login from register", async ({ page }) => {
		await page.goto("/register");

		const loginLink = page.getByRole("link", { name: /sign in/i });
		await expect(loginLink).toBeVisible();
		await loginLink.click();
		await expect(page).toHaveURL(/\/login/);
	});
});
