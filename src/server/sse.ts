import {serve} from "@hono/node-server";
import {Hono} from "hono";
import {cors} from "hono/cors";
import {streamSSE} from "hono/streaming";
import {POLLING_API_PORT, POLLING_INTERVAL} from "../constants";
import {getData} from "./data";

const app = new Hono();
let id = 0;

app.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["POST", "GET", "OPTIONS"],
    maxAge: 600,
    credentials: true,
  }),
);

// SSE endpoint
app.get("/sse", async (c) => {
  return streamSSE(c, async (stream) => {
    // Push data periodically
    while (true) {
      const data = JSON.stringify(getData());

      await stream.writeSSE({
        data,
        event: "intervention-update", // Create named event types
        id: String(id++),
      });
      await stream.sleep(POLLING_INTERVAL);
    }
  });
});

const port = POLLING_API_PORT;

console.log(`Hono SSE Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
