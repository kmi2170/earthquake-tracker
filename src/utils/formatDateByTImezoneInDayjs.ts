import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { TimeZone } from '../context/eqDataContext';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateByTimezoneInDayjs = (
  date: Dayjs,
  currentTimezone: TimeZone,
) => {
  if (currentTimezone == 'local') {
    const localTime = dayjs(date);
    const utcTime = localTime.utc();

    // console.log(utcTime.format());
    return utcTime;
  } else {
    const utcTime = dayjs.utc();
    const localTime = utcTime.local();

    // console.log(localTime.format());
    return localTime;
  }
};
