import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, UserPlus, Globe, Cpu } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import api from "../api/api";
import "./Login.css"; // Reuse login styles for consistency

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role || "user");
      
      // Regular registration redirects to home for users
      window.location.href = "/";
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError("");
      try {
        const res = await api.post("/auth/google", {
          token: tokenResponse.access_token,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);

        // Google auth handles both login and registration
        if (res.data.user.role === "admin") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/";
        }
      } catch (err) {
        console.error("Google auth failed:", err);
        setError("Google authentication failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google auth error:", error);
      setError("Failed to connect with Google.");
    },
  });

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="login-bg" 
      />
      
      <div className="login-content">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card login-card animate-glow"
        >
          <div className="login-header">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              style={{ display: "inline-flex", padding: "12px", background: "var(--bg-input)", borderRadius: "16px", marginBottom: "16px" }}
            >
              <Cpu className="text-primary" size={32} style={{ color: "var(--primary)" }} />
            </motion.div>
            <h2 className="text-gradient">Join the Future</h2>
            <p>Create your AI automation account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="input-premium input-premium-with-icon"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="input-premium input-premium-with-icon"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="input-premium input-premium-with-icon"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  autoComplete="new-password"
                  minLength="6"
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ color: "#f87171", fontSize: "14px", textAlign: "center", margin: 0 }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="glow-button"
              disabled={isLoading}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              {isLoading ? (
                <div className="spinner" />
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </motion.button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "8px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>OR SIGN UP WITH</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          <div className="social-login">
            <button 
              className="social-button" 
              type="button" 
              onClick={() => handleGoogleLogin()}
              disabled={isLoading}
            >
              <Globe size={18} />
              Google
            </button>
          </div>

          <div className="login-footer">
            Already have an account? <a href="/login">Sign in</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
