import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Input } from "./input";

describe("Input", () => {
	it("renders with placeholder", () => {
		render(<Input placeholder="Enter text" />);
		const input = screen.getByPlaceholderText("Enter text");
		expect(input).toBeInTheDocument();
	});

	it("renders with different types", () => {
		const { rerender } = render(<Input type="email" data-testid="input" />);
		expect(screen.getByTestId("input")).toHaveAttribute("type", "email");

		rerender(<Input type="password" data-testid="input" />);
		expect(screen.getByTestId("input")).toHaveAttribute("type", "password");

		rerender(<Input type="number" data-testid="input" />);
		expect(screen.getByTestId("input")).toHaveAttribute("type", "number");
	});

	it("applies custom className", () => {
		render(<Input className="custom-class" data-testid="input" />);
		expect(screen.getByTestId("input")).toHaveClass("custom-class");
	});

	it("handles disabled state", () => {
		render(<Input disabled data-testid="input" />);
		expect(screen.getByTestId("input")).toBeDisabled();
	});

	it("handles value changes", async () => {
		const { user } = render(<Input data-testid="input" />);
		const input = screen.getByTestId("input");

		await user.type(input, "Hello World");
		expect(input).toHaveValue("Hello World");
	});

	it("renders with aria-invalid for error state", () => {
		render(<Input aria-invalid={true} data-testid="input" />);
		expect(screen.getByTestId("input")).toHaveAttribute("aria-invalid", "true");
	});

	it("has correct data-slot attribute", () => {
		render(<Input data-testid="input" />);
		expect(screen.getByTestId("input")).toHaveAttribute("data-slot", "input");
	});
});
