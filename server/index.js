const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTE
app.use("/api/auth", require("./routes/auth"));

// TEST
app.get("/", (req, res) => {
  res.send("API is running...");
});

// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});