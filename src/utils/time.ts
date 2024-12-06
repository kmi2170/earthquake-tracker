import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getUtcDateFromLocalDayjsObj = (dt: Dayjs) => {
  return dayjs(dt).utc().format('YYYY-MM-DD');
};

export const getTargetUtcDateFromLocalDayjsObjAndPeriod = (
  period: number,
  dt: Dayjs,
) => {
  return dayjs(dt)
    .utc()
    .subtract(period - 1, 'day')
    .format('YYYY-M-D');
};

export const getLocalDtFromUnixTime = (ut: number) => {
  const currentDt = dayjs.unix(ut);
  const tzOffsetInHours = currentDt.utcOffset() / 60;
  return (
    dayjs.unix(ut).format('ddd DD, MMM YYYY HH:mm') +
    ' GMT' +
    formatTzOffset(tzOffsetInHours)
  );
};

const formatTzOffset = (t: number) => {
  const t_string = Math.abs(t).toString().padStart(2, '0');
  return `${t >= 0 ? '+' : '-'}${t_string}`;
};
