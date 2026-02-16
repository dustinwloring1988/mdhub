import { useState } from "react";
import Navbar from "@/components/Navbar";
import SkillCard from "@/components/SkillCard";
import { mockSkills, CATEGORIES } from "@/lib/mock-data";
import { Search, ArrowUpDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "popular" | "newest" | "most-downloaded" | "most-starred";

const Explore = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("popular");

  const filtered = mockSkills
    .filter((s) => {
      const matchSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.author.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchCat = !activeCategory || s.category === activeCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case "most-downloaded":
          return b.downloads - a.downloads;
        case "most-starred":
          return b.stars - a.stars;
        case "popular":
        default:
          return b.views - a.views;
      }
    });

  const hasFilters = search || activeCategory;

  const clearFilters = () => {
    setSearch("");
    setActiveCategory(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-display italic text-foreground mb-3">
            Explore Skills
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover community-built agent skills across all categories
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-border/60 bg-card/80 backdrop-blur-xl px-4 py-2">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills, tags, authors..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground h-8 text-foreground"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-44 bg-card/80 border-border/60 backdrop-blur-xl rounded-lg">
                <ArrowUpDown className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="most-downloaded">Most Downloaded</SelectItem>
                <SelectItem value="most-starred">Most Starred</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
              !activeCategory
                ? "bg-primary text-primary-foreground glow-border"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            All
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

        {/* Results header */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-mono text-muted-foreground">
            {filtered.length} skill{filtered.length !== 1 ? "s" : ""} found
          </p>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={clearFilters}
            >
              <X className="h-4 w-4 mr-1" />
              Clear filters
            </Button>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-display text-xl text-foreground italic">No skills match your search</p>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filters</p>
            <Button
              variant="outline"
              className="mt-6 border-border/60"
              onClick={clearFilters}
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((skill, i) => (
              <div
                key={skill.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <SkillCard skill={skill} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
