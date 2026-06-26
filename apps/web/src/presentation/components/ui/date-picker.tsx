interface DatePickerProps {
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
}

export function DatePicker({
	value,
	onChange,
	placeholder = "dd/mm/aaaa",
}: DatePickerProps) {
	return (
		<input
			type="text"
			value={value ?? ""}
			onChange={(e) => onChange?.(e.target.value)}
			placeholder={placeholder}
			maxLength={10}
			className="w-full border-b border-input bg-transparent py-2 text-sm outline-none transition-[border-color] placeholder:text-muted-foreground focus:border-b-ring"
		/>
	);
}
