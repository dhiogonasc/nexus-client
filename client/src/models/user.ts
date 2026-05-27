export interface NextLevel {
  id: number;
  name: string;
  xpBonus: number;
  xpRequired: number;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  next: NextLevel;
}

export interface Planet {
  id: number;
  name: string;
  description: string;
}

export interface Mission {
  id: number;
  name: string;
  description: string;
}

export interface Progression {
  level: Level;
  planet: Planet;
  mission: Mission;
}

export interface User {
  id: number;
  username: string;
  email: string;
  xp: number;
  oxygen: number;
  progression: Progression;
}