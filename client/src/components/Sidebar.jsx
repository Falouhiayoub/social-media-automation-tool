import { Activity, Layout, Plus, Settings, LogOut } from "lucide-react";

export default function Sidebar({ handleLogout }) {
  return (
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
  );
}
