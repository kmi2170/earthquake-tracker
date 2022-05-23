import dayjs from 'dayjs';

export const getStartEndTimeDayjs = (period: number) => {
  const startTime = dayjs().subtract(period, 'day').format('YYYY-M-D');
  const endTime = dayjs().format('YYYY-M-D');

  return { startTime, endTime };
};
