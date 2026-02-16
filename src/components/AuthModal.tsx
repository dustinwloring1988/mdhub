import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Coming soon",
      description: "Authentication will be available once the backend is connected.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {mode === "signin" ? "Welcome back" : "Join MD Hub"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {mode === "signup" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="auth-name" className="text-sm font-mono">
                  Display Name
                </Label>
                <Input
                  id="auth-name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your Name"
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-referral" className="text-sm font-mono">
                  Referral Code <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="auth-referral"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Enter your referral code"
                  className="bg-secondary/50 border-border font-mono"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  You need a referral from an existing member to join.
                </p>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="auth-email" className="text-sm font-mono">
              Email
            </Label>
            <Input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="bg-secondary/50 border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="auth-password" className="text-sm font-mono">
              Password
            </Label>
            <Input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-secondary/50 border-border"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
          >
            {mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <Separator />

        <div className="text-center text-sm text-muted-foreground">
          {mode === "signin" ? (
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-primary hover:underline font-mono"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already a member?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-primary hover:underline font-mono"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
