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
      await stream.sleep(POLLING_INTERVAL);

      // Only send live interventions
      const data = getData().filter((intervention) => intervention.isLive);

      if (data.length > 0) {
        await stream.writeSSE({
          data: JSON.stringify(data),
          event: "intervention-update", // Create named event types
          id: String(id++),
        });
      }
    }
  });
});

const port = POLLING_API_PORT;

console.log(`Hono SSE Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
