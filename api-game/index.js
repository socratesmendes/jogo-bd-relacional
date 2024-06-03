const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("api funcionando!");
});

app.post("/logs", async (req, res) => {
  const { log } = req.body;

  const saved = await prisma.gameLog.create({
    data: { log },
  });
  res.json(saved);
});

app.get("/logs", async (req, res) => {
  try {
    const logs = await prisma.gameLog.findMany();
    res.json(logs);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the logs." + error });
  }
});

// Rota para criar um novo usuário
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  res.json(user);
});

// Rota para fazer login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
});

app.listen(3000, () => console.log("Server ready on port 3000."));
