export function getLabel(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function formatDuration(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate - startDate;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 60) {
    return `${diffMins}M`;
  }

  const hours = Math.floor(diffMins / 60);
  const minutes = diffMins % 60;

  if (minutes === 0) {
    return `${hours}H`;
  }

  return `${hours}H ${minutes}M`;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
}

export function formatTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}
