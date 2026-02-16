import { Link } from "react-router-dom";
import { Eye, Download, Star, ArrowUpRight } from "lucide-react";
import type { Skill } from "@/lib/mock-data";

const formatNumber = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};

const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <Link to={`/skill/${skill.slug}`} className="block group">
      <div className="relative rounded-xl border border-border/60 bg-card/80 p-6 card-hover overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary border border-border/50 font-display text-lg font-semibold text-primary">
                {skill.author[0].toUpperCase()}
              </div>
              <div>
                <span className="block text-sm font-medium text-foreground">
                  {skill.author}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {skill.category}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-badge px-2.5 py-1 text-xs font-mono text-badge-foreground border border-border/30">
                v{skill.currentVersion}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
            </div>
          </div>

          <h3 className="mb-2 font-display text-xl text-foreground group-hover:text-primary transition-colors duration-300 italic">
            {skill.name}
          </h3>
          <p className="mb-5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {skill.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {skill.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary/50 px-2.5 py-1 text-xs font-mono text-muted-foreground border border-border/30 hover:border-primary/30 hover:text-foreground transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <div className="flex items-center gap-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                <span className="font-mono">{formatNumber(skill.views)}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Download className="h-3.5 w-3.5" />
                <span className="font-mono">{formatNumber(skill.downloads)}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5" />
                <span className="font-mono">{formatNumber(skill.stars)}</span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">
              Updated {new Date(skill.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SkillCard;
