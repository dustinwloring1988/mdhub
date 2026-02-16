import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Eye, Star, Clock, GitBranch, Copy, Check, Share2 } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import FileViewer from "@/components/FileViewer";
import ShareModal from "@/components/ShareModal";
import { Button } from "@/components/ui/button";
import { mockSkills } from "@/lib/mock-data";

const formatNumber = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};

const SkillDetail = () => {
  const { slug } = useParams();
  const skill = mockSkills.find((s) => s.slug === slug);
  const [copied, setCopied] = useState(false);

  const [shareOpen, setShareOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  if (!skill) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground font-mono">Skill not found</p>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline text-sm">
            ← Back to browse
          </Link>
        </div>
      </div>
    );
  }

  const getInstallCommand = () => {
    let command = `mdhub install ${skill.author}/${skill.slug}`;
    if (selectedVersion && selectedVersion !== skill.currentVersion) {
      command += `:${selectedVersion}`;
    }
    return command;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getInstallCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to skills
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary font-mono text-sm font-bold text-primary">
                  {skill.author[0].toUpperCase()}
                </div>
                <div>
                  <Link to={`/profile/${skill.author}`} className="text-sm text-muted-foreground font-mono hover:text-primary transition-colors">{skill.author}</Link>
                  <span className="mx-1.5 text-muted-foreground/40">/</span>
                  <span className="text-sm font-mono text-foreground">{skill.slug}</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{skill.name}</h1>
              <p className="text-muted-foreground">{skill.description}</p>
            </div>

            {/* Install command */}
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
              <code className="flex-1 text-sm font-mono text-muted-foreground">
                <span className="text-primary">$</span> {getInstallCommand()}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="shrink-0 text-muted-foreground hover:text-foreground"
              >
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary px-2.5 py-1 text-xs font-mono text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground font-mono uppercase tracking-wider">
                  Files
                </h2>
                {selectedVersion && selectedVersion !== skill.currentVersion && (
                  <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                    Viewing v{selectedVersion}
                  </span>
                )}
              </div>
              <FileViewer files={
                (selectedVersion && skill.versions.find(v => v.version === selectedVersion)?.files) ||
                skill.files
              } />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono">
              <Download className="mr-2 h-4 w-4" /> Download Skill
            </Button>
            <Button
              variant="outline"
              className="w-full border-border font-mono"
              onClick={() => setShareOpen(true)}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>

            <div className="rounded-lg border border-border bg-card p-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Eye className="h-4 w-4" /> Views
                </span>
                <span className="font-mono font-semibold text-foreground">{formatNumber(skill.views)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Download className="h-4 w-4" /> Downloads
                </span>
                <span className="font-mono font-semibold text-foreground">{formatNumber(skill.downloads)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Star className="h-4 w-4" /> Stars
                </span>
                <span className="font-mono font-semibold text-foreground">{formatNumber(skill.stars)}</span>
              </div>
              <div className="border-t border-border pt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <GitBranch className="h-4 w-4" /> Version
                </span>
                <span className="font-mono font-semibold text-foreground">v{skill.currentVersion}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Updated
                </span>
                <span className="font-mono text-foreground text-xs">{skill.updatedAt}</span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                Category
              </h3>
              <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-mono text-foreground">
                {skill.category}
              </span>
            </div>

            <div>
              <h2 className="mb-3 text-sm font-semibold text-foreground font-mono uppercase tracking-wider">
                Version History
              </h2>
              <div className="space-y-3">
                {skill.versions.map((v, i) => (
                  <div
                    key={v.version}
                    onClick={() => setSelectedVersion(v.version)}
                    className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-all hover:border-primary/50 ${(selectedVersion === v.version) || (!selectedVersion && i === 0)
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:bg-accent/50"
                      }`}
                  >
                    <GitBranch className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold text-foreground">
                          v{v.version}
                        </span>
                        {i === 0 && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-mono text-primary">
                            latest
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{v.changes}</p>
                      <p className="mt-1 text-xs text-stat">{v.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {skill && <ShareModal open={shareOpen} onOpenChange={setShareOpen} skill={skill} />}
    </div>
  );
};

export default SkillDetail;
