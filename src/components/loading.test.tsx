import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Loading } from "./loading";

describe("Loading", () => {
	it("renders spinner without text", () => {
		render(<Loading />);
		const spinner = document.querySelector(".animate-spin");
		expect(spinner).toBeInTheDocument();
	});

	it("renders with text", () => {
		render(<Loading text="Loading data..." />);
		expect(screen.getByText("Loading data...")).toBeInTheDocument();
	});

	it("renders with small size", () => {
		render(<Loading size="sm" />);
		const spinner = document.querySelector(".animate-spin");
		expect(spinner).toHaveClass("h-4", "w-4");
	});

	it("renders with medium size (default)", () => {
		render(<Loading />);
		const spinner = document.querySelector(".animate-spin");
		expect(spinner).toHaveClass("h-8", "w-8");
	});

	it("renders with large size", () => {
		render(<Loading size="lg" />);
		const spinner = document.querySelector(".animate-spin");
		expect(spinner).toHaveClass("h-12", "w-12");
	});

	it("renders fullScreen when prop is true", () => {
		const { container } = render(<Loading fullScreen />);
		const wrapper = container.firstChild;
		expect(wrapper).toHaveClass("min-h-screen");
	});

	it("applies custom className", () => {
		const { container } = render(<Loading className="custom-class" />);
		const wrapper = container.firstChild;
		expect(wrapper).toHaveClass("custom-class");
	});

	it("does not show text when not provided", () => {
		render(<Loading />);
		const textElement = document.querySelector("p");
		expect(textElement).not.toBeInTheDocument();
	});
});
