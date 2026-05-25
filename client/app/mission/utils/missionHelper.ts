export function getPlanetAccentColor(planetId?: string) {
  if (String(planetId) === '1') return '#49d730';
  if (String(planetId) === '2') return '#c40edc';
  if (String(planetId) === '3') return '#3b8a95';
  if (String(planetId) === '4') return '#406fd4';

  return '#406fd4';
}

export function getBackendMessage(error: any) {
  const data = error?.response?.data;

  return data?.message || data?.error || data?.detail || data;
}

export function getMissionErrorMessage(error: any, fallbackMessage: string) {
  const backendMessage = getBackendMessage(error);

  if (typeof backendMessage === 'string') {
    return backendMessage;
  }

  return fallbackMessage;
}