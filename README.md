# Interventions Spikes

This repo is designed to quickly spike alternative approaches for subscribing to server APIs or events, and conditionally rendering components _somewhere_ on the page.

## Structure

Inside the `src` folder you will find:

- `server`. This is a simple Restful API, which returns a list of interventions that can be randomly made live. TODO: add a SSE streaming example.
- `contexts`. Contains the `InterventionsProvider`, which is configured to poll the api (above) at a regular interval. The interval can be set in `constants.ts`. This provider should wrap your page at the highest level. Also exports useInterventions() hook, which is used internally by the `InterventionWrapper` component.
- hooks. Contains `useInterval`; a utility to fire a callback periodically
- components:
  - `InterventionWrapper` is a wrapper for any React component, which accepts a name prop (the intervention name) and will render its contents if the intervention should display.

## Installation

Uses pnpm and vite for the client, with Hono for the API server.

Install

```bash
pnpm install
```

Run server and client

```bash
pnpm start
```

Access client on [http://localhost:5173/](http://localhost:5173/)

Open the console to see a log of interventions data received.
