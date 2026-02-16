import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";

const Navbar = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/explore", label: "Explore" },
    { href: "/upload", label: "Publish" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-2xl">
        <div className="container mx-auto flex h-18 items-center justify-between px-4 md:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 glow-border">
                <Sparkles className="h-5 w-5 text-primary-foreground animate-float" />
              </div>
              <div className="absolute -inset-1 rounded-lg bg-primary/20 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl text-foreground leading-none">
                MD Hub
              </span>
              <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
                Skill Registry
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link key={link.href} to={link.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`relative text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-primary rounded-full" />
                    )}
                  </Button>
                </Link>
              );
            })}
            <div className="ml-2 pl-2 border-l border-border/50">
              <Button
                size="sm"
                className="btn-glow text-primary-foreground font-medium text-sm rounded-lg px-5"
                onClick={() => setAuthOpen(true)}
              >
                Sign In
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};

export default Navbar;
