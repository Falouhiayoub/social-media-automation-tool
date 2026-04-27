import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, LogOut, Layout, Settings, Activity, Plus } from "lucide-react";
import api from "../api/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
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
      {/* Sidebar (Visual only for now) */}
      <aside style={{ width: "260px", borderRight: "1px solid var(--border)", padding: "24px", display: "flex", flexDirection: "column", gap: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px", background: "var(--primary)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Activity color="white" size={20} />
          </div>
          <h2 style={{ fontSize: "20px" }}>SocialAI</h2>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button className="nav-item active">
            <Layout size={18} /> Dashboard
          </button>
          <button className="nav-item">
            <Plus size={18} /> New Automation
          </button>
          <button className="nav-item">
            <Settings size={18} /> Settings
          </button>
        </nav>

        <div style={{ marginTop: "auto" }}>
          <button onClick={handleLogout} className="nav-item" style={{ color: "#f87171", width: "100%", textAlign: "left" }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
              style={{ padding: "24px" }}
            >
              <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "8px" }}>{stat.label}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                <span style={{ fontSize: "28px", fontWeight: "700" }}>{stat.value}</span>
                <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: "600" }}>{stat.trend}</span>
              </div>
            </motion.div>
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