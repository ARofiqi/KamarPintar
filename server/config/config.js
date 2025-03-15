/* eslint-disable no-undef */
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || "your_secret_key",
};