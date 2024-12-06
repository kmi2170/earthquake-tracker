'use client';

import { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material';

import { Order } from '../../api/types';
import { formatDateByTimezone } from '../../utils/formatDateByTimeZone';
import { DisplayEqData } from '../../api/types';
import EnhancedTableHead from './TableParts/TableHead';
import EnhancedTableToolbar from './TableParts/TableToolbar';
import TablePaginationActions from './TableParts/TablePaginationActions';
import { useCustomQuery } from '../../hooks/useCustomQuery';
import { useMapData } from '../../context/useMapData';
import { useEqDate } from '../../context/useEqDate';
import { useEqMag } from '../../context/useEqMag';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<T, Key extends keyof T>(
  order: Order,
  orderBy: Key,
): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b): number => descendingComparator(a, b, orderBy)
    : (a, b): number => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directl
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  container: {
    [theme.breakpoints.down('md')]: {
      height: '60vh',
    },
    [theme.breakpoints.up('md')]: {
      height: '60vh',
    },
    [theme.breakpoints.up('lg')]: {
      height: '900px',
    },
    [theme.breakpoints.up('xl')]: {
      height: '1000px',
    },
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const TableComponent = () => {
  const classes = useStyles();

  const { minMag, maxMag } = useEqMag();
  const { endDate, period, timeZone } = useEqDate();
  const { setSelectedId } = useMapData();

  const { eqData, isFetching } = useCustomQuery(period, endDate);
  const filteredRows = eqData
    .filter((data) => data.mag >= minMag)
    .filter((data) => data.mag < (maxMag === 8 ? 100 : maxMag));

  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof DisplayEqData>('time');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DisplayEqData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const selectIdHandler = (id: string) => {
    setSelectedId(id);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={6}>
        <EnhancedTableToolbar rowCount={filteredRows.length} />
        <TableContainer className={classes.container}>
          <Table
            aria-labelledby="tableTitle"
            size="small"
            aria-label="data table"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {filteredRows?.length > 0 &&
                stableSort(filteredRows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(({ id, mag: magRaw, time: timeRaw, place }) => {
                    const time = formatDateByTimezone(timeRaw, timeZone);
                    const mag = Number(magRaw).toFixed(1);

                    return (
                      <Tooltip key={id} title="Click to View the place on Map">
                        <TableRow hover onClick={() => selectIdHandler(id)}>
                          <TableCell align="center">
                            <Typography variant="h6" component="p">
                              {mag}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography
                              variant="h6"
                              component="p"
                              noWrap={false}
                            >
                              {place}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="subtitle1" component="p">
                              {time}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </Tooltip>
                    );
                  })}

              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          sx={{
            marginTop: '0.5rem',
          }}
        />
      </Paper>
    </div>
  );
};

export default TableComponent;
