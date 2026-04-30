import { Link } from "react-router-dom";
import { Cpu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <Cpu className="text-primary" size={32} />
        <span>SocialAI</span>
      </Link>
      <div className="nav-links">
        <a href="#features" className="nav-link">Features</a>
        <a href="#how-it-works" className="nav-link">How it works</a>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="glow-button" style={{ textDecoration: 'none' }}>
          Get Started
        </Link>
      </div>
    </nav>
  );
}
