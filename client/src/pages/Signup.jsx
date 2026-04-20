import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://fullstack-app-ulu3.onrender.com/api/auth/signup",
        {
          name,
          email,
          password,
        },
      );
      alert("Signup successful");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 20px", marginTop: "10px" }}
        >
          Signup
        </button>
      </form>
    </div>
  );
}
