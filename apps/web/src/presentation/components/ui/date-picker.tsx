import type * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { Calendar } from "@/presentation/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/presentation/components/ui/popover"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
}

export function DatePicker({ value, onChange, placeholder = "Pick a date" }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-empty={!value}
          className="flex h-10 w-full items-center justify-between border border-transparent border-b-input bg-transparent px-0 py-2 text-sm transition-[color,border-color] outline-none focus-visible:border-b-ring data-[empty=true]:text-muted-foreground"
        >
          {value ? format(value, "d MMM yyyy") : <span>{placeholder}</span>}
          <ChevronDownIcon className="size-3.5 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  )
}
