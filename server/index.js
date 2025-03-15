/* eslint-disable no-undef */
const express = require("express");
const authRoutes = require("./routes/auth");
const { PORT } = require("./config/config");

const app = express();

app.use(express.json());

// Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
