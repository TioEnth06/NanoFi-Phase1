import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, FileText, Plus, Trash2, Info, Check } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ownershipSchema, type OwnershipFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface OwnershipSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function FileUpload({ 
  label, 
  required, 
  hint, 
  icon, 
  accept, 
  value, 
  onChange,
  error 
}: {
  label: string;
  required?: boolean;
  hint?: string;
  icon: React.ReactNode;
  accept?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  error?: string;
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (validateFile(file)) {
        onChange?.(file);
      } else {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        onChange?.(null);
      }
    } else {
      onChange?.(null);
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

export function OwnershipSection({ onContinue, onValidationChange }: OwnershipSectionProps) {
  const form = useForm<OwnershipFormData>({
    resolver: zodResolver(ownershipSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      proofOfOwnership: null,
      ownershipPercentage: "",
      coOwners: [],
    },
  });

  const { isValid, errors } = form.formState;
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "coOwners",
  });

  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  const proofOfOwnershipError = errors.proofOfOwnership?.message as string | undefined;

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="auto-saved-badge">
            <Check className="w-3 h-3" />
            Auto-saved
          </span>
        </div>

        {/* Proof of Ownership */}
        <FormField
          control={form.control}
          name="proofOfOwnership"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUpload 
                  label="Proof of Patent Ownership (PDF)"
                  required
                  icon={<FileText className="w-5 h-5 text-muted-foreground" />}
                  accept=".pdf"
                  value={field.value as File | null}
                  onChange={(file) => field.onChange(file)}
                  error={proofOfOwnershipError}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Inventor Certification (Optional) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="form-label">Inventor Certification/Affidavit</label>
            <span className="text-xs text-muted-foreground">Optional</span>
          </div>
          <div className="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer border-border hover:border-primary/50">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-muted">
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">Signed affidavit or certification (PDF, max 10MB)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Co-Owners */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="form-label">Co-Owners (If any)</label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => append({ name: '', percentage: '' })}
              className="gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Co-Owner
            </Button>
          </div>
          
          {fields.length > 0 && (
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-3 items-start">
                  <FormField
                    control={form.control}
                    name={`coOwners.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder={`Co-Owner ${index + 1} Name`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`coOwners.${index}.percentage`}
                    render={({ field }) => (
                      <FormItem className="w-32">
                        <FormControl>
                          <Input placeholder="% Ownership" type="number" min="0" max="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {fields.length === 0 && (
            <p className="text-sm text-muted-foreground">No co-owners added. Click "Add Co-Owner" if applicable.</p>
          )}
        </div>

        {/* Percentage Ownership */}
        <FormField
          control={form.control}
          name="ownershipPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Your Percentage Ownership</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="100" 
                    type="number" 
                    min="0" 
                    max="100" 
                    className="pr-8"
                    {...field}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Important Warning Note */}
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-sm text-yellow-800">
            <span className="font-medium">Important:</span> Providing false ownership information is a serious offense and may result in legal action and permanent ban from the platform.
          </p>
        </div>
      </form>
    </Form>
  );
}
