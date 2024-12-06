import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';

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
    property: keyof DisplayEqData,
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
        {tableHeadItems.map(({ id, label }, index) => (
          <TableCell
            key={id}
            align="center"
            sortDirection={orderBy === id ? order : false}
          >
            {id === 'place' ? (
              <Typography variant="subtitle1" component="h3">
                {label}
              </Typography>
            ) : (
              <TableSortLabel
                active={orderBy === id}
                direction={orderBy === id ? order : 'asc'}
                onClick={createSortHandler(id as OrderBy)}
                sx={{ pl: id === 'mag' ? '1.0rem' : null }}
              >
                <Typography variant="subtitle1" component="h3">
                  {label}
                </Typography>
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
