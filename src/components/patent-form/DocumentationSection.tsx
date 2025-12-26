import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Upload, FileText, Image, BarChart3, Info, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { documentationSchema, type DocumentationFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface DocumentationSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

interface FileUploadProps {
  label: string;
  required?: boolean;
  hint?: string;
  icon: React.ReactNode;
  accept?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function FileUpload({ label, required, hint, icon, accept, value, onChange }: FileUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    fileInputRef.current?.click();
  };

  const validateFile = (file: File): boolean => {
    // Check file size (10MB limit)
    if (file.size > MAX_FILE_SIZE) {
      const fileSizeFormatted = formatFileSize(file.size);
      const maxSizeFormatted = formatFileSize(MAX_FILE_SIZE);
      setError(`File size (${fileSizeFormatted}) exceeds the maximum limit of ${maxSizeFormatted}. Please choose a smaller file.`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (validateFile(file)) {
        onChange?.(file);
      }
    } else {
      onChange?.(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (validateFile(file)) {
        onChange?.(file);
      }
    }
  };

  return (
    <div>
      <label className={`form-label ${required ? 'form-label-required' : ''}`}>{label}</label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          error 
            ? 'border-destructive bg-destructive/5 hover:border-destructive/80' 
            : 'border-border hover:border-primary/50'
        }`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center gap-2">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            error ? 'bg-destructive/10' : 'bg-muted'
          }`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">{hint || 'PDF, DOC, DOCX (max 10MB)'}</p>
            {value && !error && (
              <div className="mt-2">
                <p className="text-xs text-primary font-medium">{value.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Size: {formatFileSize(value.size)}
                </p>
              </div>
            )}
            {error && (
              <p className="text-xs text-destructive mt-2 font-medium">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const trlLevels = [
  { value: "research", label: "Research" },
  { value: "technology-formulation", label: "Technology Formulation" },
  { value: "experimental-proof", label: "Experimental Proof" },
  { value: "lab-validation", label: "Lab Validation" },
  { value: "integrated-validation", label: "Integrated validation" },
  { value: "prototype", label: "Prototype" },
  { value: "demo", label: "Demo" },
  { value: "completed-qualified", label: "Completed and Qualified" },
  { value: "commercialized", label: "Commercialized" },
];

export function DocumentationSection({ onContinue, onValidationChange }: DocumentationSectionProps) {
  const form = useForm<DocumentationFormData>({
    resolver: zodResolver(documentationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      patentDescription: null,
      technicalSpecification: null,
      trlLevel: "",
    },
  });

  const { isValid } = form.formState;

  // Report validation state to parent
  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="auto-saved-badge">
            <Check className="w-3 h-3" />
            Auto-saved
          </span>
        </div>

        <FormField
          control={form.control}
          name="patentDescription"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUpload 
                  label="Patent Description"
                  required
                  icon={<FileText className="w-5 h-5 text-muted-foreground" />}
                  accept=".pdf,.doc,.docx"
                  value={field.value as File | null}
                  onChange={(file) => field.onChange(file)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technicalSpecification"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUpload 
                  label="Technical Specification Document"
                  required
                  icon={<FileText className="w-5 h-5 text-muted-foreground" />}
                  accept=".pdf,.doc,.docx"
                  value={field.value as File | null}
                  onChange={(file) => field.onChange(file)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FileUpload 
          label="Figures/Drawings"
          hint="PDF, PNG, JPG (max 10MB each)"
          icon={<Image className="w-5 h-5 text-muted-foreground" />}
          accept=".pdf,.png,.jpg,.jpeg"
          value={null}
          onChange={() => {}}
        />

        <FileUpload 
          label="Experimental Data/Lab Results (If Any)"
          hint="PDF, CSV, XLSX (max 10MB)"
          icon={<BarChart3 className="w-5 h-5 text-muted-foreground" />}
          accept=".pdf,.csv,.xlsx"
          value={null}
          onChange={() => {}}
        />

        {/* TRL Level */}
        <FormField
          control={form.control}
          name="trlLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">TRL (Technology Readiness Level)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select TRL Level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {trlLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Note */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-sm text-blue-800">
            <span className="font-medium">Note:</span> All documents will be securely stored on IPFS and encrypted for confidentiality.
          </p>
        </div>
      </form>
    </Form>
  );
}

