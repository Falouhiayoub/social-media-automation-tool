import { motion } from "framer-motion";

export default function StatCard({ label, value, trend, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card"
      style={{ padding: "24px" }}
    >
      <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "8px" }}>{label}</p>
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
        <span style={{ fontSize: "28px", fontWeight: "700" }}>{value}</span>
        <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: "600" }}>{trend}</span>
      </div>
    </motion.div>
  );
}
