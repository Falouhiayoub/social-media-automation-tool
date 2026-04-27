import { motion } from "framer-motion";
import { Cpu, Zap, Share2, BarChart3, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: <Cpu size={24} />,
      title: "AI Strategy",
      description: "Our neural networks analyze your audience to generate the perfect content schedule."
    },
    {
      icon: <Zap size={24} />,
      title: "Auto-Publish",
      description: "Deploy content across all major platforms with a single click or automated trigger."
    },
    {
      icon: <Share2 size={24} />,
      title: "Multi-Platform",
      description: "Seamlessly integrate with Twitter, LinkedIn, Instagram, and Facebook."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Real-time Analytics",
      description: "Track your growth with deep insights and predictive performance modeling."
    }
  ];

  return (
    <div className="home-container">
      {/* Animated Background */}
      <div className="home-bg-blobs">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="blob blob-1" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="blob blob-2" 
        />
      </div>

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

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hero-badge"
        >
          v2.0 is now live with GPT-5 integration
        </motion.div>
        
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gradient"
        >
          Automate Your Social <br /> Presence with AI
        </motion.h1>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          The all-in-one platform to create, schedule, and analyze your social media content using advanced artificial intelligence.
        </motion.p>
        
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="hero-ctas"
        >
          <Link to="/register" className="glow-button" style={{ fontSize: '1.125rem', padding: '16px 40px', textDecoration: 'none' }}>
            Start Free Trial
          </Link>
          <button className="btn-secondary">
            View Demo
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Powerful Features
          </motion.h2>
          <p>Everything you need to scale your online presence.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="features-grid"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="glass-card feature-card"
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="steps">
        <div className="section-header">
          <h2>Simple 3-Step Process</h2>
          <p>Go from zero to automated in minutes.</p>
        </div>

        <div className="steps-container">
          {[
            { step: "01", title: "Connect Accounts", desc: "Link your social media profiles securely with our encrypted OAuth system." },
            { step: "02", title: "Configure AI", desc: "Tell the AI about your brand voice, goals, and target audience." },
            { step: "03", title: "Go Live", desc: "Review the generated content calendar and hit activate." }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card step-item"
            >
              <div className="step-number">{item.step}</div>
              <div className="step-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <ChevronRight className="text-dim" style={{ marginLeft: 'auto' }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="nav-logo">
          <Cpu className="text-primary" size={32} />
          <span>SocialAI</span>
        </div>
        <div className="copyright">
          © 2026 SocialAI Automation Systems. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
