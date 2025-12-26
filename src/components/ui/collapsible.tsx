import * as React from "react"
import { cn } from "@/lib/utils"

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const CollapsibleContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>({
  open: false,
  onOpenChange: () => {},
})

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ className, children, open: controlledOpen, onOpenChange, ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen

    const handleOpenChange = (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    }

    return (
      <CollapsibleContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
        <div ref={ref} className={cn("", className)} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    )
  }
)
Collapsible.displayName = "Collapsible"

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(CollapsibleContext)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOpenChange(!open)
    onClick?.(e)
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn("", className)}
      onClick={handleClick}
      aria-expanded={open}
      {...props}
    >
      {children}
    </button>
  )
})
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open } = React.useContext(CollapsibleContext)

  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    >
      {children}
    </div>
  )
})
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
