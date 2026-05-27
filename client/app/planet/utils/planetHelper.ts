import { Mission } from "@/models/mission";

export function getMissionBestResult(missao: Mission) {
  const value = missao.bestResult ?? null;

  if (value === null || value === undefined) {
    return null;
  }

  return Number(value);
}

export function getMissionStatus(missao: Mission) {
  const status = missao.execution?.status;

  if (status === "LOCKED") return "LOCKED";
  if (status === "COMPLETED") return "COMPLETED";

  const bestResult = getMissionBestResult(missao);

  if (bestResult !== null && bestResult >= 70) return "COMPLETED";
  if (bestResult !== null && bestResult > 0) return "IN_PROGRESS";

  return "NOT_STARTED";
}

export function getMissionStatusLabel(missao: Mission) {
  const status = getMissionStatus(missao);
  const bestResult = getMissionBestResult(missao);

  if (status === "LOCKED") return "Bloqueada";

  if (status === "COMPLETED") {
    return bestResult !== null
      ? `Concluída • Melhor resultado: ${bestResult}%`
      : "Concluída";
  }

  if (status === "IN_PROGRESS") {
    return bestResult !== null
      ? `Em andamento • Melhor resultado: ${bestResult}%`
      : "Em andamento";
  }

  return "Não iniciada";
}

export function getMissionIcon(missao: Mission) {
  const status = getMissionStatus(missao);

  if (status === "LOCKED") return "lock-outline";
  if (status === "COMPLETED") return "check-circle-outline";
  if (status === "IN_PROGRESS") return "progress-clock";

  return "rocket-launch-outline";
}

export function getMissionColor(missao: Mission, accentColor: string) {
  const status = getMissionStatus(missao);

  if (status === "LOCKED") return "#64748B";
  if (status === "COMPLETED") return "#22C55E";
  if (status === "IN_PROGRESS") return "#FACC15";

  return accentColor;
}

export function calculatePlanetProgress(missions: Mission[]) {
  const total = missions.length;

  if (total === 0) {
    return {
      total: 0,
      completed: 0,
      percent: 0,
    };
  }

  const completed = missions.filter(
    (missao) => getMissionStatus(missao) === "COMPLETED",
  ).length;

  return {
    total,
    completed,
    percent: Math.round((completed / total) * 100),
  };
}
