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

// Store active connections
// const clients = new Set<StreamingApi>();

// Helper function to broadcast messages to all clients
// export const broadcast = (event: string, data: any) => {
//   const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
//   clients.forEach((client) => {
//     client.write(message);
//   });
// };

// Example endpoint to trigger broadcast
// app.post("/broadcast", async (c) => {
//   const body = await c.req.json();
//   broadcast("message", body);
//   return c.json({success: true});
// });

const port = POLLING_API_PORT;

console.log(`Hono SSE Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
