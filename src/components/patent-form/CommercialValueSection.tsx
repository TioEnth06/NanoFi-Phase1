import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commercialValueSchema, type CommercialValueFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CommercialValueSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

const commercializationStages = [
  "Research & Development",
  "Proof of Concept",
  "Prototype Development",
  "Pilot Production",
  "Initial Market Entry",
  "Growth Phase",
  "Mature Product",
  "Licensed to Third Party"
];

const industries = [
  "Healthcare & Pharmaceuticals",
  "Information Technology",
  "Automotive",
  "Energy & Clean Tech",
  "Consumer Electronics",
  "Manufacturing",
  "Aerospace & Defense",
  "Agriculture & Food Tech",
  "Financial Services",
  "Telecommunications"
];

export function CommercialValueSection({ onContinue, onValidationChange }: CommercialValueSectionProps) {
  const form = useForm<CommercialValueFormData>({
    resolver: zodResolver(commercialValueSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      commercializationStage: "",
      targetIndustry: "",
      marketSize: "",
      competitiveAdvantage: "",
    },
  });

  const { isValid } = form.formState;

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

        {/* Commercialization Stage */}
        <FormField
          control={form.control}
          name="commercializationStage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Current Stage of Commercialization</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {commercializationStages.map((stage) => (
                    <SelectItem key={stage} value={stage.toLowerCase().replace(/\s/g, '-')}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Target Industry */}
        <FormField
          control={form.control}
          name="targetIndustry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Target Industry</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry.toLowerCase().replace(/\s/g, '-')}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Market Size */}
        <FormField
          control={form.control}
          name="marketSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Market Size</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., $50M - $100M annually"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Competitive Advantage */}
        <FormField
          control={form.control}
          name="competitiveAdvantage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Competitive Advantage</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your patent's competitive advantage..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      {/* Existing Partners */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="form-label">Existing Partners/Users</label>
          <span className="text-xs text-muted-foreground">Optional</span>
        </div>
        <Input placeholder="List any current partners, licensees, or users" />
      </div>

        {/* Market Insight Note */}
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-green-800">
            <span className="font-medium">Market Insight:</span> Detailed commercial information helps potential investors better understand the value proposition of your patent.
          </p>
        </div>
      </form>
    </Form>
  );
}

