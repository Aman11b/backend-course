import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const router = express.Router();

// Register a new user endpoint /auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //   encrpty password
  const hashPassword = bcrypt.hashSync(password, 8);

  //   save the new user and hasned password to the db
  try {
    // const insertUser = db.prepare(
    //   `INSERT INTO users (username, password) VALUES(?, ?)`,
    // );
    // const result = insertUser.run(username, hashPassword);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    // now that we have a user,I want to add thei first todos from them
    const defaultTodos = `Hello :) Add yours first Todo`;

    // const insertTodo = db.prepare(
    //   `INSERT INTO todos (user_id, task) VALUES(?, ?)`,
    // );
    // insertTodo.run(result.lastInsertRowid, defaultTodos);

    await prisma.todo.create({
      data: {
        task: defaultTodos,
        userId: user.id,
      },
    });

    // create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

// login user
router.post("/login", async (req, res) => {
  // we get theier email, and we look up the password associated with that email in the database
  // but we get it back and see it's encrypted whcih maens that we cannot compare it to the one the user just trying to login
  // so what we can do is again one way encrypt the password the user just entered

  const { username, password } = req.body;

  try {
    // const getUser = db.prepare("SELECT * FROM users WHERE username = ?");
    // const user = getUser.get(username);

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    // if we cannot find user associated,return from function
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    // if password does not match
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    console.log(user);
    // then we have a success authetication
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

export default router;
