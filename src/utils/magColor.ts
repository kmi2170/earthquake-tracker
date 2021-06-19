export const magColor = (m: number): string => {
  const colors = {
    // s: '#0000ff',
    s: '#666666',
    m: '#ffff00',
    // m: '#00bb00',
    l: '#f7347a',
    x: '#ff0000',
  };

  let color: string;
  if (m < 5) {
    color = colors['s'];
  } else if (m < 6) {
    color = colors['m'];
  } else if (m < 7) {
    color = colors['l'];
  } else {
    color = colors['x'];
  }

  return color;
};
