import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';

import { tableHeadItems } from '../../../constants';
import { DisplayEqData } from '../../../api/types';
import { Order } from '../../../api/types';

type OrderBy = keyof DisplayEqData;

interface TableHeadProps {
  classes: {
    paper: string;
    root: string;
    visuallyHidden: string;
  };
  order: Order;
  orderBy: OrderBy;
  onRequestSort: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    property: keyof DisplayEqData
  ) => void;
}

const TableHeadComponent = ({
  classes,
  order,
  orderBy,
  onRequestSort,
}: TableHeadProps) => {
  const createSortHandler =
    (property: OrderBy) =>
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {tableHeadItems.map(({ id, label }) => (
          <TableCell
            key={id}
            align="center"
            padding="normal"
            sortDirection={orderBy === id ? order : false}
            colSpan={1}
            size="small"
          >
            {id === 'place' ? (
              <Typography variant="subtitle1">{label}</Typography>
            ) : (
              <TableSortLabel
                active={orderBy === id}
                direction={orderBy === id ? order : 'asc'}
                onClick={createSortHandler(id as OrderBy)}
              >
                <Typography variant="subtitle1">{label}</Typography>
                {orderBy === id ? (
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

export default TableHeadComponent;
