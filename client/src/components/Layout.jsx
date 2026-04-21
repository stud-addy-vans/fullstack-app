import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaHome, FaMoon, FaSun } from "react-icons/fa";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const [dark, setDark] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDark(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: "220px",
          background: dark ? "#020617" : "#0f172a",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
          🚀 DevPanel
        </h2>

        <MenuItem
          text="Dashboard"
          icon={<FaHome />}
          onClick={() => navigate("/dashboard")}
        />
        <MenuItem
          text="Profile"
          icon={<FaUser />}
          onClick={() => navigate("/profile")}
        />

        <MenuItem
          text={dark ? "Light Mode" : "Dark Mode"}
          icon={dark ? <FaSun /> : <FaMoon />}
          onClick={toggleTheme}
        />

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          background: dark ? "#020617" : "#f1f5f9",
          color: dark ? "white" : "black",
          padding: "30px",
          transition: "0.3s",
        }}
      >
        {children(dark)}
      </div>
    </div>
  );
}

// Sidebar Items
function MenuItem({ text, icon, onClick }) {
  return (
    <div
      style={styles.menu}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#1e293b")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {icon} {text}
    </div>
  );
}

const styles = {
  menu: {
    margin: "15px 0",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    transition: "0.3s",
  },
  logout: {
    marginTop: "20px",
    padding: "10px",
    width: "100%",
    background: "#ef4444",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
