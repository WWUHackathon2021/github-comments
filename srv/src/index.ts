import cors from "cors";
import express from "express";
import morgan from "morgan";
import { exit } from "process";
import comments from "./api/comments";

const { PORT: CONFIG_PORT } = process.env;
const parsedPort = +(CONFIG_PORT ?? 8080);
if (parsedPort === undefined || isNaN(parsedPort)) {
  console.error("Invalid port", CONFIG_PORT);
  exit(1);
}

const LISTEN_PORT = parsedPort;

const app = express();

app.use(morgan("common"));
app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(checkJWT);

app.use("/comments", comments());

app.listen(LISTEN_PORT, () => {
  console.log(`Listening on port ${LISTEN_PORT}`);
});
