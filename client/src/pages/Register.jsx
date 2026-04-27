import { useState } from "react";
import api from "../api/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/register", form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Registration error:", err.response?.data);
      if (err.response?.data?.errors) {
        const messages = Object.values(err.response.data.errors).flat().join("\n");
        alert("Registration failed:\n" + messages);
      } else {
        alert("Registration failed: " + (err.response?.data?.message || "Unknown error"));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="name"
        value={form.name}
        placeholder="Name" 
        autocomplete="name" 
        onChange={e => setForm({...form, name: e.target.value})} 
        required 
      />
      <input 
        name="email"
        type="email"
        value={form.email}
        placeholder="Email" 
        autocomplete="email" 
        onChange={e => setForm({...form, email: e.target.value})} 
        required 
      />
      <input 
        name="password"
        type="password"
        value={form.password}
        placeholder="Password" 
        autocomplete="new-password" 
        onChange={e => setForm({...form, password: e.target.value})} 
        required 
        minLength="6"
      />
      <button type="submit">Register</button>
    </form>
  );
}