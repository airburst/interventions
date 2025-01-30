import {serve} from "@hono/node-server";
import {Hono} from "hono";
import {cors} from "hono/cors";
import {POLLING_API_PORT} from "../constants";
import {getData} from "./data";

const app = new Hono();

app.use("/api/*", cors());
app.use(
  "/interventions/*",
  cors({
    origin: "*",
    allowMethods: ["POST", "GET", "OPTIONS"],
    maxAge: 600,
    credentials: true,
  }),
);

// GET endpoint that returns the array of strings
app.get("/interventions", (c) => {
  return c.json(getData());
});

const port = POLLING_API_PORT;

console.log(`Hono API Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
