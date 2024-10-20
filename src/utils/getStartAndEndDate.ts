import dayjs, { Dayjs } from 'dayjs';

export const getStartDate = (period: number, endDate: Dayjs) => {
  const startTime = dayjs(endDate).subtract(period, 'day').format('YYYY-M-D');
  return startTime;
};

export const getEndDate = (endDate: Dayjs) => {
  const endTime = dayjs(endDate).format('YYYY-M-D');
  return endTime;
};
