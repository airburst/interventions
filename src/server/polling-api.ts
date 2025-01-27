import {serve} from "@hono/node-server";
import {Hono} from "hono";
import {cors} from "hono/cors";
import {POLLING_API_PORT} from "../constants";

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

const randomlyLive = (percent: number) => Math.random() < percent / 100;

// GET endpoint that returns the array of strings
app.get("/interventions", (c) => {
  return c.json([
    {
      name: "text-001",
      description: "This intervention displays additional text",
      isLive: randomlyLive(50),
      firstName: "Tony",
    },
    {
      name: "alert-002",
      description: "This intervention displays an alert",
      isLive: randomlyLive(30),
      firstName: "Alice",
    },
    {
      name: "popup-003",
      description: "This intervention displays additional text",
      isLive: randomlyLive(100),
      firstName: "Poppy",
    },
  ]);
});

const port = POLLING_API_PORT;

console.log(`Hono API Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
