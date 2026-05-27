interface NextLevel {
  id: number;
  name: string;
  xpBonus: number;
  xpRequired: number;
}

interface Level {
  id: number;
  name: string;
  description: string;
  next: NextLevel;
}

interface Planet {
  id: number;
  name: string;
  description: string;
}

interface Mission {
  id: number;
  name: string;
  description: string;
}

interface Progression {
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
