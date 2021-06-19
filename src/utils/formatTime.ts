const months = [
  'Jan',
  'Feb',
  'March',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

export const formatTime = (epochTime: number, timeZone: string): string => {
  const dt = new Date(epochTime);

  let year: number, month: number, day: number, date: string;
  let h: string, m: string;
  let time: string;
  let tz: number;

  if (timeZone === 'local') {
    tz = -dt.getTimezoneOffset() / 60;

    [year, month, day, date] = [
      dt.getFullYear(),
      dt.getMonth(),
      dt.getDay(),
      dt.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 }),
    ];

    [h, m] = [
      dt.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 }),
      dt.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 }),
    ];
  } else {
    tz = 0;

    [year, month, day, date] = [
      dt.getUTCFullYear(),
      dt.getUTCMonth(),
      dt.getUTCDay(),
      dt.getUTCDate().toLocaleString('en-US', { minimumIntegerDigits: 2 }),
    ];

    [h, m] = [
      dt.getUTCHours().toLocaleString('en-US', { minimumIntegerDigits: 2 }),
      dt.getUTCMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 }),
    ];
  }

  time = `${days[day]}, ${date} ${months[month]} ${year} ${h}:${m} GMT${
    tz >= 0 ? '+' : '-'
  }${tz.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;

  // time = time = dt.toLocaleString('en-US', { timeZoneName: 'short', });
  //  time = dt.toUTCString();

  return time;
};
