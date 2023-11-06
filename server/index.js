import serve, { json } from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js";

import jwt from "jsonwebtoken";
dotenv.config({ path: "../.env" });
const app = serve();
const port = process.env.APP_PORT; // default port to listen

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DATABASE_PWD,
  database: "react",
});
// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.use(json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
    withCredentials: true,
  })
);
app.use(serve.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 24,
    },
  })
);

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("No token provided");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed to authenticate" });
      } else {
        req.session.user = decoded.id;
        next();
      }
    });
  }
};

app.get("/login", verifyJWT, (req, res) => {
  if (req.session.user) {
    console.log("session");
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    console.log("no session");
    res.send({ loggedIn: false });
  }
});

app.post("/login", async (req, res) => {
  const q = "SELECT * FROM user WHERE email = ?";
  const values = [req.body.email];
  db.query(q, values, async (err, result) => {
    if (err) {
      res.json({ error: err });
    }
    if (result.length > 0) {
      const comparaison = await bcrypt.compareSync(
        req.body.password,
        result[0].password
      );
      if (comparaison) {
        req.session.user = result[0].id;
        req.session.username = result[0].username;
        req.session.email = result[0].email;
        req.session.loggedIn = true;
        const id = result[0].id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: 300,
        });
        res.json({ auth: true, session: req.session, token: token });
        console.log(req.session);
      } else {
        res.send({ message: "Wrong email/password combination!" });
      }
    }
  });
});

app.get("/signout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send({ message: "Error" });
    } else {
      delete req.session;

      res.clearCookie("userId");
      res.session = null;
      res.clearCookie("userId");
      res.send({ message: "Goodbye" });
    }
  });
});
// User model
app.use("/users", userRoute);

// start the Express server
// app.listen(port, () => {
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
export default app;
