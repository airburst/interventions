import { Interventions } from "../types";

const randomlyLive = (percent: number) => Math.random() < percent / 100;

// GET endpoint that returns the array of strings
export const getData = (): Interventions => {
  return {
    "text-001": {
      show: randomlyLive(50),
      firstName: "Tony",
    },
    "alert-002": {
      show: randomlyLive(33),
      firstName: "Alice",
    },
    "popup-003": {
      show: randomlyLive(25),
      firstName: "Poppy",
    },
  };
};
