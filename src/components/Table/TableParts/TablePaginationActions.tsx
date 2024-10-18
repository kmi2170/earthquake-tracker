import IconButton from '@mui/material/IconButton';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles1 = makeStyles(() => ({
  root: {
    flexShrink: 0,
  },
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

const TablePaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) => {
  const classes = useStyles1();
  const theme = useTheme();

  const iconSize = '2rem';

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? (
          <LastPage sx={{ fontSize: iconSize }} />
        ) : (
          <FirstPage sx={{ fontSize: iconSize }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight sx={{ fontSize: iconSize }} />
        ) : (
          <KeyboardArrowLeft sx={{ fontSize: iconSize }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft sx={{ fontSize: iconSize }} />
        ) : (
          <KeyboardArrowRight sx={{ fontSize: iconSize }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? (
          <FirstPage sx={{ fontSize: iconSize }} />
        ) : (
          <LastPage sx={{ fontSize: iconSize }} />
        )}
      </IconButton>
    </div>
  );
};

export default TablePaginationActions;
