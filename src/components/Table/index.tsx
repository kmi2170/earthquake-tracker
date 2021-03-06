import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  Tooltip,
  // Checkbox,
} from '@material-ui/core';

import { Order } from '../../api/types';
import { formatTimeDayjs } from '../../utils/formatTimeDayjs';
import { DisplayEqData } from '../../api/types';
import EnhancedTableHead from './TableParts/TableHead';
import EnhancedTableToolbar from './TableParts/TableToolbar';
import TablePaginationActions from './TableParts/TablePaginationActions';
import { useEqData } from '../../context/hook';
import { useCustomQuery } from '../../hooks/useCustomQuery';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<T, Key extends keyof T>(
  order: Order,
  orderBy: Key
): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b): number => descendingComparator(a, b, orderBy)
    : (a, b): number => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directl
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  container: {
    minHeight: '60vh',
    maxHeight: '60vh',
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

  const { period, minMag, timeZone, setSelectedId } = useEqData();
  const { eqData: rows } = useCustomQuery(period, minMag);

  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof DisplayEqData>('time');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DisplayEqData
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
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
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={6}>
        <EnhancedTableToolbar rowCount={rows.length} />
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
              {rows?.length > 0 &&
                stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(({ id, mag: magRaw, time: timeRaw, place }) => {
                    const time = formatTimeDayjs(timeRaw, timeZone);
                    const mag = Number(magRaw).toLocaleString('en-US', {
                      maximumFractionDigits: 1,
                      minimumFractionDigits: 1,
                    });

                    return (
                      <Tooltip key={id} title="Click to View the place on Map">
                        <TableRow hover onClick={() => selectIdHandler(id)}>
                          <TableCell align="center" size="small" padding="none">
                            <Typography variant="h6">{mag}</Typography>
                          </TableCell>
                          <TableCell align="right" size="small" padding="none">
                            <Typography variant="h6">{place}</Typography>
                          </TableCell>
                          <TableCell
                            align="right"
                            size="small"
                            padding="normal"
                          >
                            <Typography variant="h6">{time}</Typography>
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </div>
  );
};

export default TableComponent;
