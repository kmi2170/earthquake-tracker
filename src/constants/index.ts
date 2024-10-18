export const timePeriods = [
  { period: '3 days', value: 3 },
  { period: '7 days', value: 7 },
  { period: '14 days', value: 14 },
  { period: '30 days', value: 30 },
];

export const timeZones = [
  { tz: 'Local', value: 'local' },
  { tz: 'UTC', value: 'utc' },
];

export const mags = [
  { mag: '3.0', value: 3 },
  { mag: '3.5', value: 3.5 },
  { mag: '4.0', value: 4 },
  { mag: '4.5', value: 4.5 },
  { mag: '5.0', value: 5 },
  { mag: '6.0', value: 6 },
  { mag: '7.0', value: 7 },
];

export const magnitudeColor = (m: number): string => {
  const colors = {
    s: '#666666',
    m: '#ffff00',
    l: '#ffa500',
    x: '#ff6fff',
    xl: '#ff0000',
  };

  if (m < 5) return colors['s'];
  if (m < 6) return colors['m'];
  if (m < 7) return colors['l'];
  if (m < 8) return colors['x'];
  return colors['xl'];
};

export const legends = [
  { mag: 4, color: magnitudeColor(4) },
  { mag: 5, color: magnitudeColor(5) },
  { mag: 6, color: magnitudeColor(6) },
  { mag: 7, color: magnitudeColor(7) },
  { mag: 8, color: magnitudeColor(8) },
];

export const tableHeadItems = [
  { id: 'mag', label: 'Mag.' },
  { id: 'place', label: 'Place' },
  { id: 'time', label: 'Time' },
];

export const breakpoints = {
  xs: 0, // Extra small devices (phones)
  sm: 600, // Small devices (tablets)
  md: 960, // Medium devices (small laptops)
  lg: 1280, // Large devices (desktops)
  xl: 1920, // Extra large devices (large screens)
} as const;
