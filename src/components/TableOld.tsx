import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { DataProps } from '../api/interface';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

interface Props {
  eqData: DataProps[];
}

const EnhancedTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Mag.</TableCell>
        <TableCell align="right">Place</TableCell>
        <TableCell align="right">Depth[km]</TableCell>
        <TableCell align="right">Time(local)</TableCell>
      </TableRow>
    </TableHead>
  );
};

const TableComponent: React.FC<Props> = ({ eqData }) => {
  const classes = useStyles();
  console.log(eqData);

  return (
    <TableContainer component={Paper} elevation={6}>
      <Table size="small" className={classes.table} aria-label="table">
        <EnhancedTableHead />
        <TableBody>
          {eqData?.map((row: DataProps) => {
            const dt = new Date(row.time);
            const tLocal = dt.toLocaleString('en-US', {
              timeZoneName: 'short',
            });

            if (+row.mag >= 3.0) {
              return (
                <TableRow key={row.id}>
                  <TableCell align="right">{row.mag}</TableCell>
                  <TableCell align="right">{row.place}</TableCell>
                  <TableCell align="right">{row.coordinates[2]}</TableCell>
                  <TableCell align="right">{tLocal}</TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
