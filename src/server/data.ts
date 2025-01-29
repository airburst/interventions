import {Intervention} from "../types";

const randomlyLive = (percent: number) => Math.random() < percent / 100;

export const getData = (): Intervention[] => [
  {
    name: "text-001",
    description: "This intervention displays additional text",
    isLive: randomlyLive(50),
    firstName: "Tony",
  },
  {
    name: "alert-002",
    description: "This intervention displays an alert",
    isLive: randomlyLive(33),
    firstName: "Alice",
  },
  {
    name: "popup-003",
    description: "This intervention displays additional text",
    isLive: randomlyLive(25),
    firstName: "Poppy",
  },
];
