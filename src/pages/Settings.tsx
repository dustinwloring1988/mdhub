import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Shield, Bell, Link as LinkIcon, Copy, Check, Lock } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [copiedReferral, setCopiedReferral] = useState(false);

  // Mock: not signed in
  const isAuthenticated = false;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText("https://mdhub.lovable.app/join?ref=username");
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center max-w-lg">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Sign In Required</h1>
          <p className="text-muted-foreground mb-6">
            Sign in to access your account settings.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">Manage your account and preferences</p>

        {/* Profile Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Profile</h2>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-mono">Display Name</Label>
                <Input defaultValue="" placeholder="Your Name" className="bg-secondary/50 border-border" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-mono">Username</Label>
                <Input defaultValue="" placeholder="username" className="bg-secondary/50 border-border font-mono" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-mono">Bio</Label>
              <Textarea
                defaultValue=""
                placeholder="Tell the community about yourself..."
                className="bg-secondary/50 border-border min-h-20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-mono">Email</Label>
              <Input defaultValue="" placeholder="you@example.com" className="bg-secondary/50 border-border" />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm">
              Save Changes
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Referrals */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <LinkIcon className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Referrals</h2>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Share your referral link to invite new members. Only referred users can join MD Hub.
            </p>
            <div className="flex items-center gap-2 rounded-md bg-secondary/50 p-3">
              <code className="flex-1 text-sm font-mono text-muted-foreground truncate">
                https://mdhub.lovable.app/join?ref=username
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyReferral}
                className="shrink-0"
              >
                {copiedReferral ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="rounded-md bg-secondary/30 p-3">
                <p className="font-mono text-xl font-semibold text-foreground">0</p>
                <p className="text-xs text-muted-foreground">Total Referrals</p>
              </div>
              <div className="rounded-md bg-secondary/30 p-3">
                <p className="font-mono text-xl font-semibold text-foreground">0</p>
                <p className="text-xs text-muted-foreground">Pending Invites</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Notifications */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Notification preferences will be available once the backend is connected.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Danger Zone */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-destructive" />
            <h2 className="text-lg font-semibold text-foreground">Danger Zone</h2>
          </div>

          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated skills.
            </p>
            <Button variant="destructive" size="sm" className="font-mono text-xs">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
