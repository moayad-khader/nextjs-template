import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Button } from "./button";

describe("Button", () => {
	it("renders with default variant", () => {
		render(<Button>Click me</Button>);
		expect(
			screen.getByRole("button", { name: /click me/i }),
		).toBeInTheDocument();
	});

	it("renders with destructive variant", () => {
		render(<Button variant="destructive">Delete</Button>);
		const button = screen.getByRole("button", { name: /delete/i });
		expect(button).toHaveClass("bg-destructive");
	});

	it("renders with outline variant", () => {
		render(<Button variant="outline">Outline</Button>);
		const button = screen.getByRole("button", { name: /outline/i });
		expect(button).toHaveClass("border");
	});

	it("renders with different sizes", () => {
		const { rerender } = render(<Button size="sm">Small</Button>);
		expect(screen.getByRole("button")).toHaveClass("h-8");

		rerender(<Button size="lg">Large</Button>);
		expect(screen.getByRole("button")).toHaveClass("h-10");
	});

	it("renders as child component when asChild is true", () => {
		render(
			<Button asChild>
				<a href="/test">Link Button</a>
			</Button>,
		);
		expect(
			screen.getByRole("link", { name: /link button/i }),
		).toBeInTheDocument();
	});

	it("applies custom className", () => {
		render(<Button className="custom-class">Custom</Button>);
		expect(screen.getByRole("button")).toHaveClass("custom-class");
	});

	it("passes through disabled state", () => {
		render(<Button disabled>Disabled</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});
});
