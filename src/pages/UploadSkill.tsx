import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/mock-data";
import { Upload, Plus, X, FileText, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadFile {
  id: string;
  name: string;
  content: string;
}

const UploadSkill = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [files, setFiles] = useState<UploadFile[]>([
    { id: "1", name: "skill.md", content: "" },
  ]);
  const [version, setVersion] = useState("1.0.0");

  // Mock: not signed in
  const isAuthenticated = false;
  const isMember = false;

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagsInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagsInput.trim().toLowerCase())) {
        setTags([...tags, tagsInput.trim().toLowerCase()]);
      }
      setTagsInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleAddFile = () => {
    setFiles([...files, { id: Date.now().toString(), name: "", content: "" }]);
  };

  const handleRemoveFile = (id: string) => {
    if (files.length > 1) {
      setFiles(files.filter((f) => f.id !== id));
    }
  };

  const handleFileChange = (id: string, field: "name" | "content", value: string) => {
    setFiles(files.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sign in required",
      description: "You must be a member to publish skills. Sign in or request a referral.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center max-w-lg">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Members Only</h1>
          <p className="text-muted-foreground mb-6">
            You need to be a registered member to publish skills. Members join through referrals from existing members.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono">
              Sign In
            </Button>
            <Button variant="outline" className="border-border font-mono">
              Request Referral
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Publish a Skill</h1>
          <p className="text-muted-foreground">
            Share your agent skill with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name + Slug */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-mono">Skill Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="My Awesome Skill"
                className="bg-card border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm font-mono">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="my-awesome-skill"
                className="bg-card border-border font-mono text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="desc" className="text-sm font-mono">Description</Label>
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what your skill does and how agents should use it..."
              className="bg-card border-border min-h-24"
            />
          </div>

          {/* Category + Version */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-mono">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="version" className="text-sm font-mono">Initial Version</Label>
              <Input
                id="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="1.0.0"
                className="bg-card border-border font-mono text-sm"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-sm font-mono">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-xs font-mono text-foreground"
                >
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)}>
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </span>
              ))}
            </div>
            <Input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type a tag and press Enter"
              className="bg-card border-border text-sm"
            />
          </div>

          {/* Files */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-mono">Skill Files</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAddFile}
                className="text-primary text-xs font-mono"
              >
                <Plus className="mr-1 h-3 w-3" /> Add File
              </Button>
            </div>

            {files.map((file) => (
              <div key={file.id} className="rounded-lg border border-border bg-card p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input
                    value={file.name}
                    onChange={(e) => handleFileChange(file.id, "name", e.target.value)}
                    placeholder="filename.md"
                    className="bg-secondary/50 border-0 h-8 text-sm font-mono flex-1"
                  />
                  {files.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFile(file.id)}
                      className="text-muted-foreground hover:text-destructive shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Textarea
                  value={file.content}
                  onChange={(e) => handleFileChange(file.id, "content", e.target.value)}
                  placeholder="File content..."
                  className="bg-secondary/30 border-0 font-mono text-sm min-h-32"
                />
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
            >
              <Upload className="mr-2 h-4 w-4" /> Publish Skill
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-border font-mono"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadSkill;
