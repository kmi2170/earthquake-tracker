import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const TableToolbar = ({ rowCount }: { rowCount: number }) => {
  return (
    <Toolbar>
      <Typography variant="h6" id="tableTitle" component="div" align="left">
        {rowCount} Earthquakes
      </Typography>
    </Toolbar>
  );
};

export default TableToolbar;
