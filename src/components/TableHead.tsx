import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@material-ui/core';

import { Orders, OrderBy } from './Table';

const headCells = [
  { id: 'mag', numeric: true, disablePadding: false, label: 'Mag.' },
  { id: 'place', numeric: false, disablePadding: false, label: 'Place' },
  // { id: 'depth', numeric: false, disablePadding: false, label: 'Depth (km)' },
  { id: 'time', numeric: false, disablePadding: false, label: 'Time' },
];

interface EnhancedTableHeadProps {
  classes: {
    paper: string;
    root: string;
    visuallyHidden: string;
  };
  order: Orders;
  orderBy: OrderBy;
  onRequestSort: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    property: OrderBy
  ) => void;
}

const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = (props) => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: OrderBy) => (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            align="center"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
            colSpan={1}
            size="small"
          >
            {headCell.id === 'place' ? (
              <Typography variant="subtitle1">{headCell.label}</Typography>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id as OrderBy)}
              >
                <Typography variant="subtitle1">{headCell.label}</Typography>
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
