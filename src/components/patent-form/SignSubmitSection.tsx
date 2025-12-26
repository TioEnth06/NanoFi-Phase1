import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PenTool, Shield, FileCheck, Info } from "lucide-react";

interface SignSubmitSectionProps {
  onSubmit: () => void;
}

export function SignSubmitSection({ onSubmit }: SignSubmitSectionProps) {
  return (
    <div className="space-y-6">
      {/* Digital Signature */}
      <div className="rounded-lg border border-border p-6 bg-muted/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <PenTool className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium mb-1">Digital Signature Required</h4>
            <p className="text-sm text-muted-foreground mb-4">
              By signing this form, you confirm that all information provided is accurate and you have the authority to submit this patent for tokenization.
            </p>
            <Button variant="outline" className="gap-2">
              <PenTool className="w-4 h-4" />
              Sign with Wallet
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmations */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox id="confirm-ownership" />
          <Label htmlFor="confirm-ownership" className="text-sm leading-relaxed cursor-pointer">
            I confirm that I am the rightful owner or authorized representative of this patent and have the legal authority to submit it for IP-NFT tokenization.
          </Label>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="confirm-accuracy" />
          <Label htmlFor="confirm-accuracy" className="text-sm leading-relaxed cursor-pointer">
            I certify that all information, documents, and valuations provided in this form are accurate, complete, and not misleading.
          </Label>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="confirm-terms" />
          <Label htmlFor="confirm-terms" className="text-sm leading-relaxed cursor-pointer">
            I have read and agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a>, <a href="#" className="text-primary hover:underline">Privacy Policy</a>, and <a href="#" className="text-primary hover:underline">IP-NFT Minting Agreement</a>.
          </Label>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-success/5 border border-success/20">
        <Shield className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-success">Secure Submission</p>
          <p className="text-xs text-muted-foreground mt-1">
            Your data is encrypted and securely stored. Only authorized personnel will have access to your sensitive documents.
          </p>
        </div>
      </div>

      {/* Submission Info */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
        <FileCheck className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">What happens next?</p>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
            <li>• Our team will review your submission within 3-5 business days</li>
            <li>• You'll receive email updates on your application status</li>
            <li>• Upon approval, your IP-NFT will be minted and added to your portfolio</li>
          </ul>
        </div>
      </div>

      {/* Review Period Note */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Info className="w-5 h-5 text-yellow-600" />
        </div>
        <p className="text-sm text-yellow-800">
          <span className="font-medium">Review Period:</span> Your application will be reviewed within 5-7 business days. You will be notified via email once the review is complete.
        </p>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onSubmit} className="gap-2 bg-primary hover:bg-primary/90 px-8">
          Submit Application
        </Button>
      </div>
    </div>
  );
}

