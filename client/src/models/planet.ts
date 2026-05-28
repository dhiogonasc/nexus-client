import { ImageSourcePropType } from "react-native";
import { Task, TaskExecution, TaskPayload, TaskProgress } from "./task";

export interface Planet {
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
  image: ImageSourcePropType;
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

export interface FormatedPlanetTask extends Task, UIResource {}

export interface FormatedTaskPayload {
  tasks: FormatedPlanetTask[];
  progress: TaskProgress;
}

export function formatPlanets(planets: TaskPayload): FormatedTaskPayload {
  const planetsTasks = planets.tasks;
  const planetsProgress = planets.progress;
  const formatedPlanets: FormatedPlanetTask[] = planetsTasks.map((task) => {
    const resource = PLANETS[task.order];

    return {
      ...task,
      image: resource?.image,
      accentColor: resource?.accentColor || "#3B82F6",
    };
  });

  return {
    tasks: formatedPlanets,
    progress: planetsProgress,
  };
}
