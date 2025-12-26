import { ChevronDown, Check, FileText, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type ProgressStatus = "undone" | "on progress" | "done";

interface FormSectionProps {
  title: string;
  description: string;
  isOpen: boolean;
  isComplete: boolean;
  progress?: ProgressStatus;
  onToggle: () => void;
  children: React.ReactNode;
}

export function FormSection({ title, description, isOpen, isComplete, progress, onToggle, children }: FormSectionProps) {
  // Determine progress status if not explicitly provided
  const progressStatus: ProgressStatus = progress || (isComplete ? "done" : isOpen ? "on progress" : "undone");

  // Get progress chip styling
  const getProgressChip = () => {
    switch (progressStatus) {
      case "done":
        return (
          <span className="inline-flex items-center gap-1 bg-success text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
            <Check className="w-3 h-3" />
            Done
          </span>
        );
      case "on progress":
        return (
          <span className="inline-flex items-center gap-1 bg-primary/20 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3" />
            On Progress
          </span>
        );
      case "undone":
        return (
          <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-xs font-medium px-2 py-0.5 rounded-full">
            Undone
          </span>
        );
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle} className="shadow-card rounded-lg overflow-hidden animate-fade-in">
      <CollapsibleTrigger className="w-full">
        <div className={cn(
          "section-header",
          isOpen ? "rounded-t-lg rounded-b-none section-header-active" : "rounded-lg section-header-inactive"
        )}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{title}</h3>
                {getProgressChip()}
              </div>
              <p 
                className={cn(
                  "text-sm mt-0.5",
                  isOpen ? "text-primary-foreground/70" : ""
                )}
                style={!isOpen ? { color: 'rgba(0, 0, 0, 0.5)' } : undefined}
              >
                {description}
              </p>
            </div>
          </div>
          <ChevronDown className={cn(
            "w-5 h-5 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="section-content">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

