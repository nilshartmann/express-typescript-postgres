import * as express from "express";
import * as bodyParser from "body-parser";
const debug = require("debug")("greeting-app:server");
import * as morgan from "morgan";
import greetings from "./greetings";

// create the app
const app = express();

// Configure Request Logging
app.use(morgan("dev", { stream: { write: msg => debug(msg) } }));

// Configure body Parser
app.use(bodyParser.json());

// Add "Hello-World"-root route
app.get("/", (req, res) => {
  res.send({ msg: "Greetings App running!" });
});

// Add greetings routes
app.use("/greetings", greetings);

// Add error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.code || 500).json({
    error: err
  });
});

export default app;
