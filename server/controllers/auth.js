/* eslint-disable no-undef */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const { JWT_SECRET } = require("../config/config");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.status(http.STATUS_CREATED).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(http.STATUS_INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(http.STATUS_UNAUTHORIZED).json({ message: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(http.STATUS_UNAUTHORIZED).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token });
  } catch (error) {
    res.status(http.STATUS_INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
