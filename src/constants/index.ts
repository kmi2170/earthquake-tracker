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

export const magColor = (m: number): string => {
  const colors = {
    s: '#666666',
    m: '#ffff00',
    l: '#ffc0cb',
    x: '#ff0000',
  };

  if (m < 5) return colors['s'];
  if (m < 6) return colors['m'];
  if (m < 7) return colors['l'];
  return colors['x'];
};

// export const legends = [
//   { scale: '7 ≤ M', className: 'magX' },
//   { scale: '6 ≤ M < 7', className: 'magL' },
//   { scale: '5 ≤ M < 6', className: 'magM' },
//   { scale: 'M < 5', className: 'magS' },
// ];

export const legends = [
  { mag: 4, color: magColor(4) },
  { mag: 5, color: magColor(5) },
  { mag: 6, color: magColor(6) },
  { mag: 7, color: magColor(7) },
];

export type LegendClass = 'magX' | 'magL' | 'magM' | 'magS';

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
