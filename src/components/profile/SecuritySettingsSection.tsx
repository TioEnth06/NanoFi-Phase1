import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Eye, Shield, Bell, Globe } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SecuritySettingsSection() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = Array.from(containerRef.current?.querySelectorAll('.bg-card') || []);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // Animate title
      const titleElement = containerRef.current?.querySelector('h1');
      if (titleElement) {
        gsap.fromTo(
          titleElement,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
      }

      // Stagger animate cards
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Security & Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account security and preferences</p>
      </div>

      {/* Security Settings */}
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-b border-border">
            <div>
              <p className="text-sm font-medium text-foreground">Password</p>
              <p className="text-xs text-muted-foreground mt-1">Last changed: 15/11/2024</p>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Change</Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-b border-border">
            <div>
              <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground mt-1">Add an extra layer of security</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">Active Sessions</p>
              <p className="text-xs text-muted-foreground mt-1">View and manage active sessions</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
              <Eye className="w-4 h-4" />
              View
            </Button>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Preferences</h3>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-b border-border">
            <p className="text-sm font-medium text-foreground">Language</p>
            <Select defaultValue="english">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="indonesian">Indonesian</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-b border-border">
            <p className="text-sm font-medium text-foreground">Currency</p>
            <Select defaultValue="usd">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="idr">IDR</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">Notifications</p>
              <p className="text-xs text-muted-foreground mt-1">Receive email and push notifications</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {notificationsEnabled ? "On" : "Off"}
              </span>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Activity Log</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border text-sm">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground w-20">25/12</span>
              <span className="text-foreground">IP-NFT Minted</span>
            </div>
            <span className="text-success">Success</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border text-sm">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground w-20">24/12</span>
              <span className="text-foreground">Wallet Connected</span>
            </div>
            <span className="text-success">Success</span>
          </div>
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground w-20">23/12</span>
              <span className="text-foreground">Loan Created</span>
            </div>
            <span className="text-warning">Pending</span>
          </div>
        </div>
      </div>

      {/* Account Control */}
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Control</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">Logout</Button>
          <Button variant="outline" className="w-full justify-start">Export Account Data</Button>
          <Button variant="outline" className="w-full justify-start">Deactivate Account</Button>
          <Button variant="destructive" className="w-full justify-start">Delete Account</Button>
        </div>
      </div>
    </div>
  );
}

