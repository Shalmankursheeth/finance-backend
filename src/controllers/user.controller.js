const prisma = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

const allowedRoles = ["VIEWER", "ANALYST", "ADMIN"];

if (!allowedRoles.includes(role)) {
  return res.status(400).json({
    success: false,
    message: "Invalid role",
  });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    role,
  },
});

    res.json(user);
  } catch (err) {
  if (err.code === "P2002") {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }

  res.status(500).json({
    success: false,
    message: err.message,
  });
}
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USERS (ADMIN ONLY)
exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};