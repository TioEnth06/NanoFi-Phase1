import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patentDetailsSchema, type PatentDetailsFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PatentDetailsSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
  initialData?: Partial<PatentDetailsFormData>;
  onDataChange?: (data: PatentDetailsFormData) => void;
}

const categories = [
  "Biotechnology", "Software & IT", "Medical Devices", "Clean Energy",
  "Pharmaceuticals", "Nanotechnology", "Artificial Intelligence", "Materials Science",
  "Automotive", "Aerospace", "Telecommunications", "Consumer Electronics"
];

const jurisdictions = [
  "USPTO (United States)", "EPO (Europe)", "JPO (Japan)", "CNIPA (China)",
  "KIPO (South Korea)", "UKIPO (United Kingdom)", "CIPO (Canada)", "IP Australia",
  "WIPO (International)"
];

export function PatentDetailsSection({ onContinue, onValidationChange, initialData, onDataChange }: PatentDetailsSectionProps) {
  const form = useForm<PatentDetailsFormData>({
    resolver: zodResolver(patentDetailsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      patentTitle: initialData?.patentTitle || "",
      category: initialData?.category || "",
      registrationNumber: initialData?.registrationNumber || "",
      filingDate: initialData?.filingDate || "",
      jurisdiction: initialData?.jurisdiction || "",
      abstract: initialData?.abstract || "",
      keywords: initialData?.keywords || "",
    },
  });

  const { isValid } = form.formState;

  React.useEffect(() => {
    if (initialData) {
      form.reset({
        patentTitle: initialData.patentTitle || "",
        category: initialData.category || "",
        registrationNumber: initialData.registrationNumber || "",
        filingDate: initialData.filingDate || "",
        jurisdiction: initialData.jurisdiction || "",
        abstract: initialData.abstract || "",
        keywords: initialData.keywords || "",
      });
    }
  }, [initialData, form]);

  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  React.useEffect(() => {
    const subscription = form.watch((data) => {
      onDataChange?.(data as PatentDetailsFormData);
    });
    return () => subscription.unsubscribe();
  }, [form, onDataChange]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="auto-saved-badge">
            <Check className="w-3 h-3" />
            Auto-saved
          </span>
        </div>

        {/* Patent Title */}
        <FormField
          control={form.control}
          name="patentTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Patent Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter the official patent title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category & Registration Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label form-label-required">Patent Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase().replace(/\s/g, '-')}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label form-label-required">Patent Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., US10,123,456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Filing Date & Jurisdiction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="filingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label form-label-required">Filing Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jurisdiction"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label form-label-required">Jurisdiction</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Jurisdiction" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {jurisdictions.map((j) => (
                      <SelectItem key={j} value={j.toLowerCase().replace(/\s/g, '-')}>
                        {j}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Patent Abstract */}
        <FormField
          control={form.control}
          name="abstract"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1.5">
                <FormLabel className="form-label form-label-required">Patent Abstract</FormLabel>
                <span className="text-xs text-muted-foreground">Max 1000 characters</span>
              </div>
              <FormControl>
                <Textarea 
                  placeholder="Provide a brief summary of your patent invention..."
                  className="min-h-[120px]"
                  maxLength={1000}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Keywords */}
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Keywords</FormLabel>
              <FormControl>
                <Input placeholder="Enter keywords separated by commas" {...field} />
              </FormControl>
              <p className="form-hint">Add relevant keywords to improve discoverability</p>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

