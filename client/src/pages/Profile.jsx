import Layout from "../components/Layout";

export default function Profile() {
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.error("Invalid user data in localStorage");
  }

  return (
    <Layout>
      {(dark) => (
        <>
          <h1 style={{ color: dark ? "white" : "black" }}>Profile</h1>

          <div
            style={{
              background: dark ? "#1e293b" : "white",
              color: dark ? "white" : "black",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              marginTop: "20px",
            }}
          >
            <h3>👤 User Profile</h3>

            <p>
              <strong>Name:</strong> {user?.name || "Not Available"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || "Not Available"}
            </p>
            <p>
              <strong>Status:</strong> Active
            </p>
          </div>
        </>
      )}
    </Layout>
  );
}
