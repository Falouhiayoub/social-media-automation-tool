import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, LogOut, Layout, Settings, Activity, Plus } from "lucide-react";
import api from "../api/api";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user");
        setUser(res.data);
        
        // Role-based access control
        if (res.data.role !== "admin") {
          window.location.href = "/";
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        window.location.href = "/login";
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-dark)" }}>
      {/* Sidebar */}
      <Sidebar handleLogout={handleLogout} />

      {/* Main Content */}
      <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}
        >
          <div>
            <h1 style={{ fontSize: "32px", marginBottom: "4px" }}>Welcome, {user?.name || 'Explorer'}!</h1>
            <p style={{ color: "var(--text-muted)" }}>Here's what's happening with your social automations today.</p>
          </div>
          <div className="glass-card" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: "12px", borderRadius: "12px" }}>
            <div style={{ width: "32px", height: "32px", background: "var(--bg-input)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={18} color="var(--primary)" />
            </div>
            <span style={{ fontSize: "14px", fontWeight: "500" }}>{user?.email}</span>
          </div>
        </motion.header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {[
            { label: "Active Automations", value: "12", trend: "+2" },
            { label: "Total Reach", value: "48.5k", trend: "+12%" },
            { label: "AI Suggestions", value: "5", trend: "New" }
          ].map((stat, i) => (
            <StatCard key={i} index={i} label={stat.label} value={stat.value} trend={stat.trend} />
          ))}
        </div>

        {/* Placeholder for content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card" 
          style={{ marginTop: "40px", padding: "80px", textAlign: "center", borderStyle: "dashed" }}
        >
          <p style={{ color: "var(--text-dim)" }}>No active automations found. Create your first one to get started!</p>
          <button className="glow-button" style={{ marginTop: "24px" }}>
            <Plus size={18} /> Create Automation
          </button>
        </motion.div>
      </main>

      <style>{`
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
          font-size: 15px;
        }
        .nav-item:hover {
          background: var(--bg-input);
          color: white;
        }
        .nav-item.active {
          background: var(--primary-glow);
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}