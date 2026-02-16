import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import type { Skill } from "@/lib/mock-data";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: Skill;
}

const ShareModal = ({ open, onOpenChange, skill }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const url = `https://mdhub.lovable.app/skill/${skill.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=Check out "${skill.name}" on MD Hub&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">
            Share Skill
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <p className="text-sm text-muted-foreground">
            Share <span className="text-foreground font-mono">{skill.name}</span> with others
          </p>

          {/* URL */}
          <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 p-2">
            <LinkIcon className="h-4 w-4 text-muted-foreground shrink-0" />
            <Input
              value={url}
              readOnly
              className="border-0 bg-transparent p-0 h-7 text-sm font-mono focus-visible:ring-0 focus-visible:ring-offset-0 text-muted-foreground"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="shrink-0 h-7 px-2"
            >
              {copied ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>

          {/* Install command */}
          <div className="rounded-lg border border-border bg-secondary/30 p-3">
            <p className="text-xs text-muted-foreground mb-1 font-mono">Install command</p>
            <code className="text-sm font-mono text-foreground">
              <span className="text-primary">$</span> mdhub install {skill.author}/{skill.slug}
            </code>
          </div>

          {/* Social buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-border font-mono text-xs"
              onClick={shareTwitter}
            >
              <Twitter className="mr-2 h-4 w-4" /> Twitter
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-border font-mono text-xs"
              onClick={shareLinkedIn}
            >
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
