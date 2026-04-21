import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Layout>
      {(dark) => (
        <>
          <h1 style={{ color: dark ? "white" : "black" }}>
            Welcome, {user?.name || "User"} 👋
          </h1>

          <div style={styles.grid}>
            <Card text="Welcome 🎉" dark={dark} />
            <Card text="Account Active" dark={dark} />
            <Card text="JWT Secured" dark={dark} />
          </div>
        </>
      )}
    </Layout>
  );
}

function Card({ text, dark }) {
  return (
    <div
      style={{
        background: dark ? "#1e293b" : "white",
        color: dark ? "white" : "black",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        textAlign: "center",
        fontWeight: "bold",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {text}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
};
