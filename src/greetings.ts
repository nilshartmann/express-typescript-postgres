import * as express from "express";
const debug = require("debug")("greeting-app:greetings");

interface Greeting {
  id: number;
  name: string;
  msg: string;
}

// "Fake database"
const greetings: Greeting[] = [
  { id: 1, name: "Klaus", msg: "Moin" },
  { id: 2, name: "Susi", msg: "Hello!" },
  { id: 3, name: "Max", msg: "Bonjour" },
  { id: 4, name: "Susi", msg: "How are you?" },
  { id: 5, name: "Max", msg: "Bon soir" },
  { id: 6, name: "Felipe", msg: "Hola, ¿qué tal?" },
  { id: 7, name: "Alex", msg: "Happy Birthday" },
  { id: 8, name: "Felipe", msg: "¡buenos días" },
  { id: 9, name: "Paul", msg: "Wie gehts?" },
  { id: 10, name: "Susi", msg: "Have a nice day" }
];

const router = express.Router();

router.get("/", (req, res) => {
  res.send(greetings);
});

router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const greeting = greetings.find(g => g.id === id);
  if (greeting) {
    res.send(greeting);
  } else {
    next({
      msg: `No Greeting found with id '${id}'`,
      code: 404
    });
  }
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
    const newGreeting = {
      id: greetings.length + 1,
      name: body.name,
      msg: body.msg
    };
    greetings.push(newGreeting);
    return res.send(newGreeting).status(201);
  }
);

export default router;
