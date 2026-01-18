import { Github, Heart } from "lucide-react";
import bobobloxLogo from "@/assets/boboblox-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <img 
              src={bobobloxLogo} 
              alt="Boboblox" 
              className="h-8 w-auto"
            />
            <span className="font-display font-bold text-lg text-foreground">
              Boboblox
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/Boboblox-Team"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>by Boboblox Team</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Boboblox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
