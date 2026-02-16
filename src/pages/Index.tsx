import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SkillCard from "@/components/SkillCard";
import { mockSkills, CATEGORIES } from "@/lib/mock-data";
import { Search, Zap, Users, Shield, ArrowRight, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = mockSkills.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = !activeCategory || s.category === activeCategory;
    return matchSearch && matchCat;
  });

  const stats = [
    { icon: Zap, value: "156", label: "Skills" },
    { icon: Users, value: "2.4k", label: "Members" },
    { icon: Shield, value: "Referral", label: "Access" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 pattern-grid opacity-30" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px]" />
        
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-mono text-xs text-primary tracking-wide uppercase">
                Open Skill Registry for AI Agents
              </span>
            </div>
            
            <h1 className="mb-6 text-5xl md:text-7xl font-display italic text-foreground leading-tight animate-fade-in" style={{ animationDelay: '100ms' }}>
              Share &amp; Discover{" "}
              <span className="gradient-text not-italic">Agent Skills</span>
            </h1>
            
            <p className="mb-10 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
              Upload, version, and distribute skills that make AI agents smarter. 
              Browse community-built capabilities or publish your own.
            </p>

            {/* Search */}
            <div className="mx-auto mb-12 max-w-lg animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-2 rounded-xl border border-border/60 bg-card/80 backdrop-blur-xl p-1.5">
                  <Search className="ml-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search skills, tags, authors..."
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-foreground"
                  />
                  <div className="flex items-center gap-1 pr-2">
                    <kbd className="hidden md:flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-mono text-muted-foreground border border-border/50">
                      <Command className="h-3 w-3" /> K
                    </kbd>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 md:gap-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3 text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary border border-border/50">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-lg font-semibold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="sticky top-16 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex gap-3 overflow-x-auto">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
              !activeCategory
                ? "bg-primary text-primary-foreground glow-border"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            All Skills
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground glow-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Skill Grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-display italic text-foreground">
              {activeCategory || "All Skills"}
            </h2>
            <p className="mt-1 text-sm font-mono text-muted-foreground">
              {filtered.length} skill{filtered.length !== 1 ? "s" : ""} available
            </p>
          </div>
          <Link to="/explore">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground group">
              View all
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-display text-xl text-foreground italic">No skills found</p>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((skill, i) => (
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
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/20 border border-primary/30">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <span className="font-display text-lg text-foreground italic">MD Hub</span>
              <span className="text-xs font-mono text-muted-foreground ml-2">— Open registry for AI agent skills</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
