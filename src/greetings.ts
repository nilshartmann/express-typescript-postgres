import * as express from "express";
import { Pool } from "pg";

interface Greeting {
  id: number;
  name: string;
  msg: string;
}

const debug = require("debug")("greeting-app:greetings");
const pool = new Pool({
  user: process.env.POSTGRES_USER || "greeter",
  database: process.env.POSTGRES_DB || "greeting_db",
  password: process.env.POSTGRES_PASSWORD || "secretpw",
  host: process.env.PGHOST || "localhost",
  port: parseInt(process.env.PGPORT || "7788")
});
const router = express.Router();

router.get("/", (req, res, next) => {
  pool
    .query("select id, name, msg from greeting ORDER BY id ASC")
    .then(({ rows }) => res.send(rows))
    .catch(err => next({ msg: "query failed", err }));
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  pool
    .query("select id, name, msg from greeting where id = $1", [id])
    .then(({ rowCount, rows }) => {
      if (rowCount === 0) {
        return next({
          msg: `No Greeting found with id '${id}'`,
          code: 404
        });
      }
      const greeting: Greeting = {
        id: rows[0].id,
        name: rows[0].name,
        msg: rows[0].msg
      };
      res.send(greeting);
    })
    .catch(err => next({ msg: "Query failed", err }));
});

router.post(
  "/",
  (req, res, next) => {
    const { name, msg } = req.body;
    if (!name || !msg) {
      return next({
        msg: "Invalid body: missing field(s)",
        code: 400
      });
    }
    next();
  },
  (req, res, next) => {
    const body = req.body;
    pool
      .query("insert into greeting (name, msg) values ($1, $2) returning *", [
        body.name,
        body.msg
      ])
      .then(({ rows }) => {
        const greeting: Greeting = {
          id: rows[0].id,
          name: rows[0].name,
          msg: rows[0].msg
        };
        res.send(greeting).status(201);
      })
      .catch(err => next({ msg: "Query failed", err }));
  }
);

export default router;
