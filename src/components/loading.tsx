import { cn } from "@/lib/utils";

type LoadingProps = {
	size?: "sm" | "md" | "lg";
	text?: string;
	className?: string;
	fullScreen?: boolean;
};

const sizes = {
	sm: "h-4 w-4 border-2",
	md: "h-8 w-8 border-3",
	lg: "h-12 w-12 border-4",
};

export function Loading({
	size = "md",
	text,
	className,
	fullScreen = false,
}: LoadingProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-center",
				fullScreen && "min-h-screen",
				className,
			)}
		>
			<div className="flex flex-col items-center gap-3">
				<div
					className={cn(
						"animate-spin rounded-full border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100",
						sizes[size],
					)}
				/>
				{text && (
					<p className="text-sm text-zinc-500 dark:text-zinc-400">{text}</p>
				)}
			</div>
		</div>
	);
}
