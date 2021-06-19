import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const listPeriod = [
  { period: '1 day', value: 1 },
  { period: '3 days', value: 3 },
  { period: '7 days', value: 7 },
  { period: '14 days', value: 14 },
  { period: '30 days', value: 30 },
];

const listMag = [
  { mag: '3.0', value: 3 },
  { mag: '3.5', value: 3.5 },
  { mag: '4.0', value: 4 },
  { mag: '4.5', value: 4.5 },
  { mag: '5.0', value: 5 },
  { mag: '6.0', value: 6 },
  { mag: '7.0', value: 7 },
];

const listTZone = [
  { tz: 'Local', value: 'local' },
  { tz: 'UTC', value: 'utc' },
];

interface SelectFormProps {
  period: number;
  setPeriod: (period: number) => void;
  initialPeriod: number;
  minMag: number;
  setMinMag: (minMag: number) => void;
  initialMinMag: number;
  timeZone: string;
  setTimeZone: (timeZone: string) => void;
}

const SelectForm: React.FC<SelectFormProps> = ({
  period,
  setPeriod,
  initialPeriod,
  minMag,
  setMinMag,
  initialMinMag,
  timeZone,
  setTimeZone,
}) => {
  const classes = useStyles();

  const handleChange = (event, func) => {
    func(event.target.value);
  };

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel id="period-label" shrink>
          <Typography variant="subtitle2" align="center">
            Last
          </Typography>
        </InputLabel>
        <Select
          labelId="period-label"
          id="priod-select"
          value={period}
          onChange={(e) => handleChange(e, setPeriod)}
          defaultValue={initialPeriod}
        >
          {listPeriod.map((el) => (
            <MenuItem key={el.period} value={el.value}>
              <Typography variant="body2" align="center">
                {el.period}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="minmag-label" shrink>
          <Typography variant="subtitle2" align="center">
            Min. Mag.
          </Typography>
        </InputLabel>
        <Select
          labelId="minmag-label"
          id="minmag-select"
          value={minMag}
          onChange={(e) => handleChange(e, setMinMag)}
          defaultValue={initialMinMag}
        >
          {listMag.map((el) => (
            <MenuItem key={el.mag} value={el.value}>
              <Typography variant="body2" align="center">
                {el.mag}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="timezone-label" shrink>
          <Typography variant="subtitle2" align="center">
            Time
          </Typography>
        </InputLabel>
        <Select
          labelId="timezone-label"
          id="timezone-select"
          value={timeZone}
          onChange={(e) => handleChange(e, setTimeZone)}
          defaultValue={'local'}
        >
          {listTZone.map((el) => (
            <MenuItem key={el.tz} value={el.value}>
              <Typography variant="body2" align="center">
                {el.tz}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectForm;
