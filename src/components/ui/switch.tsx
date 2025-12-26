import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked
      onCheckedChange?.(newChecked)
    }

    return (
      <input
        type="checkbox"
        className={cn(
          "peer h-6 w-11 shrink-0 cursor-pointer rounded-full border border-input bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary",
          className
        )}
        ref={ref}
        checked={checked}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
