'use client';
import { memo } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MenuProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

import { mags, timePeriods } from '../../constants';
import { useEqMag } from '../../context/useEqMag';
import { useEqDate } from '../../context/useEqDate';
// import { timeZones } from '../../constants';
// import { formatDateByTimezoneInDayjs } from '../../utils/formatDateByTImezoneInDayjs';
// import { TimeZone } from '../../context/eqDataContext';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 80,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  select: {
    // height: '3rem',
  },
  datePicker: {
    width: '110px',
  },
}));

const menuProps: Partial<MenuProps> = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
};

const SelectForm = () => {
  const classes = useStyles();

  const { initialPeriod, endDate, setEndDate, period, setPeriod } = useEqDate();

  const { initialMinMag, initialMaxMag, minMag, setMinMag, maxMag, setMaxMag } =
    useEqMag();

  const handleChangeMinMag = (e: SelectChangeEvent<number>) => {
    const newMinMag = e.target.value as number;
    if (maxMag - newMinMag >= 1) {
      setMinMag(newMinMag);
    }
  };

  const handleChangeMaxMag = (e: SelectChangeEvent<number>) => {
    const newMaxMag = e.target.value as number;
    if (newMaxMag - minMag >= 1) {
      setMaxMag(newMaxMag);
    }
  };

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel id="period-label" shrink>
          Last
        </InputLabel>
        <Select
          className={classes.select}
          labelId="period-label"
          id="period-select"
          value={period}
          label="Last"
          onChange={(e) => setPeriod(e.target.value as number)}
          defaultValue={initialPeriod}
          MenuProps={menuProps}
        >
          {timePeriods.map(
            ({ period, value }: { period: string; value: number }) => (
              <MenuItem key={period} value={value}>
                {period}
              </MenuItem>
            ),
          )}
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          className={classes.datePicker}
          label="From"
          value={endDate}
          maxDate={dayjs()}
          onAccept={(newValue) => setEndDate(newValue as Dayjs)}
        />
      </LocalizationProvider>

      <FormControl className={classes.formControl}>
        <InputLabel id="minmag-label" shrink>
          Min. Mag.
        </InputLabel>
        <Select
          className={classes.select}
          labelId="minmag-label"
          id="minmag-select"
          value={minMag}
          label="Min Mag."
          onChange={handleChangeMinMag}
          defaultValue={initialMinMag}
          MenuProps={menuProps}
        >
          {mags.map(({ mag, value }: { mag: string; value: number }) => (
            <MenuItem key={mag} value={value}>
              {mag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="maxmag-label" shrink>
          Max. Mag.
        </InputLabel>
        <Select
          className={classes.select}
          labelId="maxmag-label"
          id="maxmag-select"
          value={maxMag}
          label="Max Mag."
          onChange={handleChangeMaxMag}
          defaultValue={initialMaxMag}
          MenuProps={menuProps}
        >
          {mags.map(({ mag, value }: { mag: string; value: number }) => (
            <MenuItem key={mag} value={value}>
              {mag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* <FormControl className={classes.formControl}>
        <InputLabel id="timezone-label" shrink>
          Time Zone
        </InputLabel>
        <Select
          className={classes.select}
          labelId="timezone-label"
          id="timezone-select"
          value={timeZone}
          label="Time Zone"
          onChange={(e) => {
            setTimeZone(e.target.value as TimeZone);
            setEndDate(formatDateByTimezoneInDayjs(endDate, timeZone));
          }}
          defaultValue={'local'}
          MenuProps={menuProps}
        >
          {timeZones.map(({ tz, value }: { tz: string; value: string }) => (
            <MenuItem key={tz} value={value}>
              {tz}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </div>
  );
};

export default memo(SelectForm);
