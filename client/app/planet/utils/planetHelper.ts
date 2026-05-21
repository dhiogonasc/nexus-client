export type MissionTask = {
  id: number | string;
  name?: string;
  title?: string;
  description?: string;
  content?: string;
  status?: string;
  executionStatus?: string;
  bestResult?: number | null;
  best_result?: number | null;
  result?: number | null;
  execution?: {
    status?: string;
    bestResult?: number | null;
    best_result?: number | null;
  };
};

export function getMissionBestResult(missao: MissionTask) {
  const value =
    missao.bestResult ??
    missao.best_result ??
    missao.result ??
    missao.execution?.bestResult ??
    missao.execution?.best_result ??
    null;

  if (value === null || value === undefined) {
    return null;
  }

  return Number(value);
}

export function getMissionStatus(missao: MissionTask) {
  const explicitStatus =
    missao.execution?.status || missao.status || missao.executionStatus;

  if (explicitStatus === 'LOCKED') return 'LOCKED';

  if (
    explicitStatus === 'DONE' ||
    explicitStatus === 'COMPLETED' ||
    explicitStatus === 'FINISHED'
  ) {
    return 'COMPLETED';
  }

  const bestResult = getMissionBestResult(missao);

  if (bestResult !== null && bestResult >= 70) {
    return 'COMPLETED';
  }

  if (bestResult !== null && bestResult > 0) {
    return 'IN_PROGRESS';
  }

  return 'NOT_STARTED';
}

export function getMissionStatusLabel(missao: MissionTask) {
  const status = getMissionStatus(missao);
  const bestResult = getMissionBestResult(missao);

  if (status === 'LOCKED') {
    return 'Bloqueada';
  }

  if (status === 'COMPLETED') {
    return bestResult !== null
      ? `Concluída • Melhor resultado: ${bestResult}%`
      : 'Concluída';
  }

  if (status === 'IN_PROGRESS') {
    return bestResult !== null
      ? `Em andamento • Melhor resultado: ${bestResult}%`
      : 'Em andamento';
  }

  return 'Não iniciada';
}

export function getMissionIcon(missao: MissionTask) {
  const status = getMissionStatus(missao);

  if (status === 'LOCKED') return 'lock-outline';
  if (status === 'COMPLETED') return 'check-circle-outline';
  if (status === 'IN_PROGRESS') return 'progress-clock';

  return 'rocket-launch-outline';
}

export function getMissionColor(missao: MissionTask, accentColor: string) {
  const status = getMissionStatus(missao);

  if (status === 'LOCKED') return '#64748B';
  if (status === 'COMPLETED') return '#22C55E';
  if (status === 'IN_PROGRESS') return '#FACC15';

  return accentColor;
}

export function calculatePlanetProgress(missions: MissionTask[]) {
  const total = missions.length;

  if (total === 0) {
    return {
      total: 0,
      completed: 0,
      percent: 0,
    };
  }

  const completed = missions.filter(
    (missao) => getMissionStatus(missao) === 'COMPLETED',
  ).length;

  return {
    total,
    completed,
    percent: Math.round((completed / total) * 100),
  };
}