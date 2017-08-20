import * as express from "express";
const debug = require("debug")("greeting-app:index");
import app from "./app";

// Read configuration from env variables
const port = parseInt(process.env.PORT || "3000");
const host = process.env.HOST || "0.0.0.0";

// start the server
const server = app.listen(port, host, () => {
  debug(`

	🏖  🏖  🏖  🏖  🏖

	Express server listening on ${server.address().address}:${server.address().port}

	🏖  🏖  🏖  🏖  🏖
	`);
});
