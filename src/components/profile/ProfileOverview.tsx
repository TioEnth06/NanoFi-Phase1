import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Mail, Calendar, Clock } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "@/contexts/AuthContext";

gsap.registerPlugin(ScrollTrigger);

export function ProfileOverview() {
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  
  // Get user email and derive display name
  const userEmail = user?.email || "";
  const displayName = userEmail ? userEmail.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "User";
  const avatarInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "U";

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
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile Overview</h1>
        <p className="text-muted-foreground mt-1">Manage your account information and verification status</p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
          <Avatar className="w-20 h-20 md:w-24 md:h-24">
            <AvatarImage src="" alt={displayName} />
            <AvatarFallback className="bg-gradient-to-br from-rose-400 to-rose-600 text-primary-foreground text-2xl font-semibold">
              {avatarInitial}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-1">{displayName}</h2>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Mail className="w-4 h-4" />
              <span>{userEmail || "No email"}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="gap-2">
                <CheckCircle2 className="w-3 h-3 text-success" />
                Verified
              </Badge>
              <Badge variant="secondary">IP Owner</Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex-1">Verify Identity</Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link to="/profile/edit">Edit Profile</Link>
          </Button>
        </div>
      </div>

      {/* Authentication Info */}
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Information</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <span className="text-sm text-muted-foreground">Login Method</span>
            <span className="text-sm font-medium text-foreground">Email</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Account Created
            </span>
            <span className="text-sm font-medium text-foreground">15/01/2024</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Last Login
            </span>
            <span className="text-sm font-medium text-foreground">25/12/2024 14:30</span>
          </div>
        </div>
      </div>

      {/* Verification & Identity */}
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Identity & Verification</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Verification Level</p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-success border-2 border-success"></div>
                <span className="text-sm text-foreground">Basic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-success border-2 border-success"></div>
                <span className="text-sm text-foreground">Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground"></div>
                <span className="text-sm text-muted-foreground">Professional</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge className="bg-success/10 text-success border-success/20">Approved</Badge>
            </div>
          </div>
          <Button className="w-full">Submit Verification</Button>
        </div>
      </div>
    </div>
  );
}

