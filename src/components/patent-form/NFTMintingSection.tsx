import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nftMintingSchema, type NFTMintingFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface NFTMintingSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

export function NFTMintingSection({ onContinue, onValidationChange }: NFTMintingSectionProps) {
  const [isFractionalizationEnabled, setIsFractionalizationEnabled] = useState(false);

  const form = useForm<NFTMintingFormData>({
    resolver: zodResolver(nftMintingSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      tokenName: "",
      tokenSymbol: "",
      metadataVisibility: "",
      fractionalizationEnabled: false,
      totalSupply: "",
      initialPrice: "",
    },
  });

  const { isValid } = form.formState;
  const tokenSymbol = form.watch("tokenSymbol");

  // Auto-uppercase token symbol
  React.useEffect(() => {
    if (tokenSymbol && tokenSymbol !== tokenSymbol.toUpperCase()) {
      form.setValue("tokenSymbol", tokenSymbol.toUpperCase(), { shouldValidate: true });
    }
  }, [tokenSymbol, form]);

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

        {/* NFT Name */}
        <FormField
          control={form.control}
          name="tokenName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">IP-NFT Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter a unique name for your IP-NFT"
                  {...field}
                />
              </FormControl>
              <p className="form-hint">This name will be displayed on marketplaces and wallets</p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* NFT Symbol */}
        <FormField
          control={form.control}
          name="tokenSymbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">IP-NFT Symbol</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., IPNFT" 
                  maxLength={10}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value.toUpperCase());
                  }}
                />
              </FormControl>
              <p className="form-hint">Short ticker symbol (max 10 characters, uppercase recommended)</p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Metadata Visibility */}
        <FormField
          control={form.control}
          name="metadataVisibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">NFT Metadata Visibility</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public - Visible to everyone</SelectItem>
                  <SelectItem value="private">Private - Only visible to owner and approved parties</SelectItem>
                </SelectContent>
              </Select>
              <p className="form-hint">Control who can view your patent metadata on-chain</p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fractionalization */}
        <FormField
          control={form.control}
          name="fractionalizationEnabled"
          render={({ field }) => (
            <FormItem>
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="fractionalization" className="text-sm font-medium">
                      Enable Fractionalization
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Allow your IP-NFT to be divided into fractional ownership tokens
                    </p>
                  </div>
                  <Switch 
                    id="fractionalization" 
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      setIsFractionalizationEnabled(checked);
                    }}
                  />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Fractionalization Options (conditionally shown) */}
        {isFractionalizationEnabled && (
          <div className="space-y-4 pl-4 border-l-2 border-muted">
            <FormField
              control={form.control}
              name="totalSupply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Total Fraction Supply</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1,000,000" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="initialPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Initial Price per Fraction (USD)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 0.01" type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* NFT Configuration Note */}
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-sm text-purple-800">
            <span className="font-medium">NFT Configuration:</span> These parameters define how your patent will appear and function on the blockchain. Choose carefully as some settings cannot be changed after minting.
          </p>
        </div>
      </form>
    </Form>
  );
}

