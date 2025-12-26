import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Camera, Eye, EyeOff, Save, X } from "lucide-react";

// Validation schema
const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  location: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "George Farm",
      email: "george.farm@nano.fi",
      phone: "",
      bio: "",
      location: "",
      website: "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setProfileImagePreview("");
  };

  const onProfileSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Here you would typically upload the image and update the profile
      if (profileImage) {
        // Upload image logic would go here
        console.log("Uploading image:", profileImage);
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      // Optionally navigate back to profile
      // navigate("/profile");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Password changed",
        description: "Your password has been successfully changed.",
      });
      
      resetPassword();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please check your current password and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage="overview" />
      <main className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
              <p className="text-muted-foreground text-sm">Update your profile information and settings</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Profile Picture Section */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Upload a new profile picture. Recommended size: 400x400px</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 md:w-32 md:h-32">
                      <AvatarImage src={profileImagePreview} alt="Profile" />
                      <AvatarFallback className="bg-gradient-to-br from-rose-400 to-rose-600 text-primary-foreground text-2xl font-semibold">
                        {profileImagePreview ? "" : "GF"}
                      </AvatarFallback>
                    </Avatar>
                    {profileImagePreview && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                        onClick={handleRemoveImage}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label htmlFor="profile-image" className="cursor-pointer">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full sm:w-auto gap-2"
                          asChild
                        >
                          <span>
                            <Camera className="w-4 h-4" />
                            {profileImage ? "Change Picture" : "Upload Picture"}
                          </span>
                        </Button>
                      </Label>
                      <Input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                    {profileImage && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {profileImage.name} ({(profileImage.size / 1024).toFixed(2)} KB)
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information Section */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitProfile(onProfileSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...registerProfile("fullName")}
                      placeholder="Enter your full name"
                    />
                    {profileErrors.fullName && (
                      <p className="text-sm text-destructive">{profileErrors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...registerProfile("email")}
                      placeholder="Enter your email"
                    />
                    {profileErrors.email && (
                      <p className="text-sm text-destructive">{profileErrors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...registerProfile("phone")}
                      placeholder="+1 (555) 123-4567"
                    />
                    {profileErrors.phone && (
                      <p className="text-sm text-destructive">{profileErrors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      {...registerProfile("location")}
                      placeholder="City, Country"
                    />
                    {profileErrors.location && (
                      <p className="text-sm text-destructive">{profileErrors.location.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      {...registerProfile("website")}
                      placeholder="https://example.com"
                    />
                    {profileErrors.website && (
                      <p className="text-sm text-destructive">{profileErrors.website.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      {...registerProfile("bio")}
                      placeholder="Tell us about yourself..."
                      className="min-h-[100px]"
                      maxLength={500}
                    />
                    {profileErrors.bio && (
                      <p className="text-sm text-destructive">{profileErrors.bio.message}</p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => resetProfile()}
                      className="flex-1 sm:flex-none"
                    >
                      Reset
                    </Button>
                    <Button type="submit" disabled={isSaving} className="flex-1 sm:flex-none gap-2">
                      <Save className="w-4 h-4" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Separator />

            {/* Change Password Section */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password *</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        {...registerPassword("currentPassword")}
                        placeholder="Enter your current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    {passwordErrors.currentPassword && (
                      <p className="text-sm text-destructive">{passwordErrors.currentPassword.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password *</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        {...registerPassword("newPassword")}
                        placeholder="Enter your new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="text-sm text-destructive">{passwordErrors.newPassword.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters and contain uppercase, lowercase, number, and special character
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        {...registerPassword("confirmPassword")}
                        placeholder="Confirm your new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    {passwordErrors.confirmPassword && (
                      <p className="text-sm text-destructive">{passwordErrors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => resetPassword()}
                      className="flex-1 sm:flex-none"
                    >
                      Reset
                    </Button>
                    <Button type="submit" disabled={isSaving} className="flex-1 sm:flex-none gap-2">
                      <Save className="w-4 h-4" />
                      {isSaving ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfile;

