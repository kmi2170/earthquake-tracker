import { useMemo, useState } from 'react';
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

import { formatTime } from '../../utils/formatTime';
import { DisplayEqData } from '../../api/types';
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';
import TablePaginationActions from './TablePaginationActions';

export type Orders = 'asc' | 'desc';
export type OrderBy = 'mag' | 'place' | 'time';

function descendingComparator(
  a: DisplayEqData,
  b: DisplayEqData,
  orderBy: OrderBy,
): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: Orders, orderBy: OrderBy) {
  return order === 'desc'
    ? (a: DisplayEqData, b: DisplayEqData): number =>
        descendingComparator(a, b, orderBy)
    : (a: DisplayEqData, b: DisplayEqData): number =>
        -descendingComparator(a, b, orderBy);
}

type comparatorProps = (a: DisplayEqData, b: DisplayEqData) => number;

const stableSort = (
  array: DisplayEqData[],
  comparator: comparatorProps,
): DisplayEqData[] => {
  const stabilizedThis = array.map(
    (el: DisplayEqData, index: number): [DisplayEqData, number] => [el, index],
  );

  stabilizedThis.sort(
    (a: [DisplayEqData, number], b: [DisplayEqData, number]): number => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    },
  );

  return stabilizedThis.map((el) => el[0]);
};

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

interface EnhancedTablePops {
  eqData: DisplayEqData[];
  timeZone: string;
  selectedId: string;
  setSelectedId: (selectedId: string) => void;
}

const EnhancedTable = ({
  eqData,
  timeZone,
  selectedId,
  setSelectedId,
}: EnhancedTablePops) => {
  const classes = useStyles();
  const rows = eqData;

  const [order, setOrder] = useState<Orders>('desc');
  const [orderBy, setOrderBy] = useState<OrderBy>('time');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleRequestSort = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    property: OrderBy,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number,
  ) => {
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
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const time = formatTime(row.time, timeZone);

                  const mag = Number(row.mag).toLocaleString('en-US', {
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1,
                  });

                  return (
                    <Tooltip
                      key={row.id}
                      title="Click to View the place on Map"
                    >
                      <TableRow hover onClick={() => selectIdHandler(row.id)}>
                        {/* 
                        <Link
                          activeClass="active"
                          to="top"
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={500}
                        >
                        </Link>
                      */}
                        <TableCell align="center" size="small" padding="none">
                          <Typography variant="h6">{mag}</Typography>
                        </TableCell>
                        <TableCell align="right" size="small" padding="none">
                          <Typography variant="h6">{row.place}</Typography>
                        </TableCell>
                        <TableCell align="right" size="small" padding="normal">
                          <Typography variant="h6">{time}</Typography>
                        </TableCell>
                        {/* <TableCell align="right">{row.coordinates[2]}</TableCell> */}
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

export default EnhancedTable;
