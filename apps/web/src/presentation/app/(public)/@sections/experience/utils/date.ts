import { format, parseISO } from "date-fns";

export function formatDate(dateStr: string): string {
	return format(parseISO(dateStr), "MMM yyyy");
}
