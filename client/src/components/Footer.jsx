import { Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="nav-logo">
        <Cpu className="text-primary" size={32} />
        <span>SocialAI</span>
      </div>
      <div className="copyright">
        © 2026 SocialAI Automation Systems. All rights reserved.
      </div>
    </footer>
  );
}
