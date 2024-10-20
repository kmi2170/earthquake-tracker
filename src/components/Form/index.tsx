'use client';
import { memo, useEffect } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MenuProps, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

import { mags, timePeriods } from '../../constants';
import { useEqData } from '../../context/useEqData';
// import { timeZones } from '../../constants';
// import { formatDateByTimezoneInDayjs } from '../../utils/formatDateByTImezoneInDayjs';
// import { TimeZone } from '../../context/eqDataContext';

const useStyles = makeStyles((theme: Theme) => ({
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

  const {
    initialPeriod,
    endDate,
    setEndDate,
    period,
    setPeriod,
    initialMinMag,
    minMag,
    setMinMag,
    // timeZone,
    // setTimeZone,
  } = useEqData();

  return (
    <div className={classes.container}>
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
          onChange={(e) => setMinMag(e.target.value as number)}
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
