import { Task, TaskExecution, TaskPayload } from "./task";

export interface PlanetDetail {
  id: number;
  name: string;
  description: string;
  order: number;
  execution: TaskExecution;
  content: string;
  xpBonus: number;
  missions: TaskPayload;
}

interface UIResource {
  image: string;
  accentColor: string;
}

export const PLANETS: Record<number, UIResource> = {
  1: {
    image: require("../../assets/Planet1.png"),
    accentColor: "#49d730",
  },
  2: {
    image: require("../../assets/Planet2.png"),
    accentColor: "#c40edc",
  },
  3: {
    image: require("../../assets/Planet3.png"),
    accentColor: "#3b8a95",
  },
  4: {
    image: require("../../assets/Planet4.png"),
    accentColor: "#406fd4",
  },
};

export function formatPlanets(planets: Task[]) {
  return planets.map((planet) => {
    const resource = PLANETS[planet.order];
    return {
      ...planet,
      imagem: resource?.image,
      accentColor: resource?.accentColor || "#3B82F6",
    };
  });
}
