import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SkillCard from "@/components/SkillCard";
import { mockSkills } from "@/lib/mock-data";
import { User, Calendar, Link as LinkIcon, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const mockUsers: Record<string, { displayName: string; bio: string; joined: string; referrals: number }> = {
  "vercel-labs": {
    displayName: "Vercel Labs",
    bio: "Building the future of web development. Focused on developer experience and performance.",
    joined: "2025-08-01",
    referrals: 24,
  },
  "mlesnews": {
    displayName: "MlesNews",
    bio: "Homelab enthusiast and Kubernetes evangelist.",
    joined: "2025-10-15",
    referrals: 8,
  },
  "grkmguney": {
    displayName: "Görkem Güney",
    bio: "Automation specialist. Monitoring everything.",
    joined: "2025-11-20",
    referrals: 5,
  },
};

const Profile = () => {
  const { username } = useParams();
  const [copiedReferral, setCopiedReferral] = useState(false);

  const user = username ? mockUsers[username] : null;
  const userSkills = mockSkills.filter((s) => s.author === username);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://mdhub.lovable.app/join?ref=${username}`);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground font-mono">User not found</p>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const totalDownloads = userSkills.reduce((acc, s) => acc + s.downloads, 0);
  const totalViews = userSkills.reduce((acc, s) => acc + s.views, 0);
  const totalStars = userSkills.reduce((acc, s) => acc + s.stars, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile sidebar */}
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary text-primary font-mono text-2xl font-bold">
                {username![0].toUpperCase()}
              </div>
              <h1 className="text-xl font-bold text-foreground">{user.displayName}</h1>
              <p className="text-sm text-muted-foreground font-mono">@{username}</p>
              <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Joined {user.joined}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  {user.referrals} referrals
                </div>
              </div>
            </div>

            {/* Referral link */}
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                Referral Link
              </h3>
              <div className="flex items-center gap-2 rounded-md bg-secondary/50 p-2">
                <LinkIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <code className="flex-1 text-xs font-mono text-muted-foreground truncate">
                  mdhub.lovable.app/join?ref={username}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyReferral}
                  className="shrink-0 h-6 w-6 p-0"
                >
                  {copiedReferral ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="rounded-lg border border-border bg-card p-4 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                Stats
              </h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="font-mono text-lg font-semibold text-foreground">{userSkills.length}</p>
                  <p className="text-xs text-muted-foreground">Skills</p>
                </div>
                <div>
                  <p className="font-mono text-lg font-semibold text-foreground">
                    {totalDownloads >= 1000 ? `${(totalDownloads / 1000).toFixed(1)}k` : totalDownloads}
                  </p>
                  <p className="text-xs text-muted-foreground">Downloads</p>
                </div>
                <div>
                  <p className="font-mono text-lg font-semibold text-foreground">
                    {totalStars >= 1000 ? `${(totalStars / 1000).toFixed(1)}k` : totalStars}
                  </p>
                  <p className="text-xs text-muted-foreground">Stars</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Published Skills
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({userSkills.length})
                </span>
              </h2>
            </div>

            {userSkills.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground rounded-lg border border-border bg-card">
                <p className="font-mono">No skills published yet</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {userSkills.map((skill, i) => (
                  <div
                    key={skill.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <SkillCard skill={skill} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
