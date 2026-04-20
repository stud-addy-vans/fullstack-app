import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://fullstack-app-ulu3.onrender.com/api/auth/signup",
        { name, email, password }
      );
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT SIDE */}
      <div style={styles.left}>
        <h1 style={styles.logo}>MyApp</h1>
        <p style={styles.tagline}>
          Build. Connect. Grow.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Account</h2>

          <form onSubmit={handleSignup}>
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />

            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Sign Up
            </button>
          </form>

          <p style={styles.linkText}>
            Already have an account?{" "}
            <span style={styles.link} onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
  },
  left: {
    flex: 1,
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px",
  },
  logo: {
    fontSize: "40px",
    fontWeight: "bold",
  },
  tagline: {
    marginTop: "20px",
    fontSize: "18px",
    opacity: 0.8,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "320px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
    color: "black",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  linkText: {
    marginTop: "20px",
    textAlign: "center",
  },
  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "bold",
  },
};