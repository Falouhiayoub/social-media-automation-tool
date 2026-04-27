import { useEffect, useState } from "react";
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
        // If unauthorized, the interceptor in api.js already redirects to /login
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
      console.error("Logout failed:", err);
      // Fallback: clear token and redirect anyway
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>

      {user ? (
        <>
          <p>Welcome, <strong>{user.name}</strong>!</p>
          <p>Email: {user.email}</p>
          <button 
            onClick={handleLogout}
            style={{ padding: "0.5rem 1rem", backgroundColor: "#ff4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}