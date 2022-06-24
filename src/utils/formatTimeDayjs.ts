import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
// import 'daysjs/locale/en'
// dayjs.locale('en');

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatTimeDayjs = (
  epochTime: number,
  timeZone: string
): string => {
  const t0 = dayjs.unix(epochTime / 1000);

  const t_utc = t0.local();
  const t_local = t0.utc();
  const tz_offset = t0.utcOffset() / 60;

  const t_sign = tz_offset < 0 ? '-' : '+';
  const tz_offset_str =
    timeZone === 'local' ? t_sign + `0${Math.abs(tz_offset)}`.slice(-2) : '+00';

  const time = timeZone === 'local' ? t_local : t_utc;

  return time.format('ddd, DD MMM YYYY HH:mm') + ' GMT' + tz_offset_str;
};
