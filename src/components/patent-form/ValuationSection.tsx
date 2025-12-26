import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Info, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { valuationSchema, type ValuationFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ValuationSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

const valuationBases = [
  "Cost-Based Valuation",
  "Market-Based Valuation",
  "Income-Based Valuation",
  "Relief from Royalty Method",
  "Comparable Transaction Analysis",
  "Expert Appraisal",
  "Self-Assessment"
];

export function ValuationSection({ onContinue, onValidationChange }: ValuationSectionProps) {
  const form = useForm<ValuationFormData>({
    resolver: zodResolver(valuationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      proposedValuation: "",
      valuationBasis: "",
      valuationMethodology: "",
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

        {/* Proposed Valuation */}
        <FormField
          control={form.control}
          name="proposedValuation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Proposed Valuation (USD)</FormLabel>
              <FormControl>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="0.00" 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    className="pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <p className="form-hint">Enter the total valuation amount in US Dollars</p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Valuation Basis */}
        <FormField
          control={form.control}
          name="valuationBasis"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Valuation Basis</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Valuation Method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {valuationBases.map((basis) => (
                    <SelectItem key={basis} value={basis.toLowerCase().replace(/\s/g, '-')}>
                      {basis}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Valuation Justification */}
        <FormField
          control={form.control}
          name="valuationMethodology"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Valuation Justification</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Provide detailed justification for your proposed valuation, including methodology, comparable transactions, market analysis, or expert opinions..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      {/* Licensing/Royalty Structure */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="form-label">Expected Licensing Price/Royalty Structure</label>
          <span className="text-xs text-muted-foreground">Optional</span>
        </div>
        <Textarea 
          placeholder="Describe your expected licensing terms, royalty rates, or revenue-sharing structure..."
          className="min-h-[100px]"
        />
      </div>

        {/* Professional Review Note */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-sm text-blue-800">
            <span className="font-medium">Professional Review:</span> All valuations will be reviewed by our expert team. The final valuation may differ based on market analysis and technical assessment.
          </p>
        </div>
      </form>
    </Form>
  );
}

