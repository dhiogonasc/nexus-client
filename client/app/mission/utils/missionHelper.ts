export function getPlanetAccentColor(planetId?: string) {
  if (String(planetId) === '1') return '#406fd4';
  if (String(planetId) === '2') return '#a855f7';
  if (String(planetId) === '3') return '#22c55e';
  if (String(planetId) === '4') return '#f97316';

  return '#406fd4';
}

export function getBackendMessage(error: any) {
  const data = error?.response?.data;

  return (
    data?.message ||
    data?.error ||
    data?.detail ||
    data
  );
}

export function getMissionErrorMessage(error: any, fallbackMessage: string) {
  const backendMessage = getBackendMessage(error);

  if (typeof backendMessage === 'string') {
    return backendMessage;
  }

  return fallbackMessage;
}