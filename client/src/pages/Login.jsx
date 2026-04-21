import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!email.includes("@")) newErrors.email = "Enter valid email";

    if (!password) newErrors.password = "Password is required";

    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await axios.post(
        "https://fullstack-app-ulu3.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {/* LEFT */}
      <div style={styles.left}>
        <h1 style={styles.logo}>MyApp</h1>
        <p style={styles.tagline}>Welcome back. Continue your journey.</p>
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.title}>Login</h2>

          <form onSubmit={handleLogin}>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            {errors.email && <p style={styles.error}>{errors.email}</p>}

            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            {errors.password && <p style={styles.error}>{errors.password}</p>}

            <button type="submit" style={styles.button}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p style={styles.linkText}>
            Don't have an account?{" "}
            <span style={styles.link} onClick={() => navigate("/")}>
              Signup
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
  error: {
    color: "red",
    fontSize: "12px",
    margin: "0 0 10px 0",
  },
};