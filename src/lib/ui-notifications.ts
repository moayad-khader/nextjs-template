import { toast } from "sonner";

type messageTypes = "success" | "info" | "error" | "warning";
type Position =
	| "top-left"
	| "top-right"
	| "bottom-left"
	| "bottom-right"
	| "top-center"
	| "bottom-center";

export const notify = async (
	data: string[] | string,
	type: messageTypes,
	position: Position = "bottom-left",
) => {
	if (Array.isArray(data)) {
		for (const message of data) {
			toast[type](message, {
				position,
			});
		}
	} else {
		toast[type](data, {
			position,
		});
	}
};
