import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inventorSchema, type InventorFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface InventorSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
  initialData?: Partial<InventorFormData>;
  onDataChange?: (data: InventorFormData) => void;
}

const countries = [
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "China", flag: "🇨🇳" },
  { name: "India", flag: "🇮🇳" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "Israel", flag: "🇮🇱" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Belgium", flag: "🇧🇪" },
  { name: "Austria", flag: "🇦🇹" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Denmark", flag: "🇩🇰" },
  { name: "Finland", flag: "🇫🇮" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "Czech Republic", flag: "🇨🇿" },
  { name: "Hungary", flag: "🇭🇺" },
  { name: "Romania", flag: "🇷🇴" },
  { name: "Chile", flag: "🇨🇱" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Peru", flag: "🇵🇪" },
  { name: "Venezuela", flag: "🇻🇪" },
  { name: "Pakistan", flag: "🇵🇰" },
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "Sri Lanka", flag: "🇱🇰" },
  { name: "Myanmar", flag: "🇲🇲" },
  { name: "Cambodia", flag: "🇰🇭" },
  { name: "Laos", flag: "🇱🇦" },
  { name: "Mongolia", flag: "🇲🇳" },
  { name: "Kazakhstan", flag: "🇰🇿" },
  { name: "Ukraine", flag: "🇺🇦" },
  { name: "Belarus", flag: "🇧🇾" },
  { name: "Croatia", flag: "🇭🇷" },
  { name: "Serbia", flag: "🇷🇸" },
  { name: "Bulgaria", flag: "🇧🇬" },
  { name: "Slovakia", flag: "🇸🇰" },
  { name: "Slovenia", flag: "🇸🇮" },
  { name: "Estonia", flag: "🇪🇪" },
  { name: "Latvia", flag: "🇱🇻" },
  { name: "Lithuania", flag: "🇱🇹" },
  { name: "Luxembourg", flag: "🇱🇺" },
  { name: "Iceland", flag: "🇮🇸" },
  { name: "Malta", flag: "🇲🇹" },
  { name: "Cyprus", flag: "🇨🇾" },
];

const roles = [
  "Inventor",
  "Founder",
  "Research Institution",
  "Company"
];

export function InventorSection({ onContinue, onValidationChange, initialData, onDataChange }: InventorSectionProps) {
  const form = useForm<InventorFormData>({
    resolver: zodResolver(inventorSchema),
    mode: "onChange", // Validate in real-time as user types
    reValidateMode: "onChange", // Re-validate on change after first validation
    defaultValues: {
      fullName: initialData?.fullName || "",
      role: initialData?.role || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      country: initialData?.country || "",
      website: initialData?.website || "",
    },
  });

  const { isValid } = form.formState;

  // Update form when initialData changes
  React.useEffect(() => {
    if (initialData) {
      form.reset({
        fullName: initialData.fullName || "",
        role: initialData.role || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        country: initialData.country || "",
        website: initialData.website || "",
      });
    }
  }, [initialData, form]);

  // Report validation state to parent
  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  // Save form data on change
  React.useEffect(() => {
    const subscription = form.watch((data) => {
      onDataChange?.(data as InventorFormData);
    });
    return () => subscription.unsubscribe();
  }, [form, onDataChange]);

  const onSubmit = (data: InventorFormData) => {
    console.log("Form data:", data);
    onContinue();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Auto-saved Badge */}
        <div className="flex items-center gap-2">
          <span className="auto-saved-badge">
            <Check className="w-3 h-3" />
            Auto-saved
          </span>
        </div>

        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1.5">
                <FormLabel className="form-label form-label-required">Full name / Organization Name</FormLabel>
                <span className="text-xs text-muted-foreground">As it appears on legal documents</span>
              </div>
              <FormControl>
                <Input placeholder="Full name/Organization Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role.toLowerCase().replace(/\s/g, '-')}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-1.5">
                  <FormLabel className="form-label form-label-required">Email Address</FormLabel>
                  <span className="text-xs text-muted-foreground">We'll send verification here</span>
                </div>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-1.5">
                  <FormLabel className="form-label">Phone Number</FormLabel>
                  <span className="text-xs text-muted-foreground">We'll send verification here</span>
                </div>
                <FormControl>
                  <Input type="tel" placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Country */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Country of Origin</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.name} value={country.name.toLowerCase().replace(/\s/g, '-')}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{country.flag}</span>
                          <span>{country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
        />

        {/* Website */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1.5">
                <FormLabel className="form-label">Website / Linkedin / Institution Page</FormLabel>
                <span className="text-xs text-muted-foreground">Optional</span>
              </div>
              <FormControl>
                <Input placeholder="https://" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Privacy Note */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 flex items-center gap-3 min-h-[80px]">
          <div className="flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-sm text-blue-800">
            <span className="font-medium">Privacy Note:</span> Your contact information will be kept confidential and only used for verification purposes.
          </p>
        </div>

      </form>
    </Form>
  );
}

