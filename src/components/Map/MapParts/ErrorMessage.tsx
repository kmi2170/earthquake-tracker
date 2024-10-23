import Typography from '@mui/material/Typography';
import { AxiosError } from 'axios';

type ErrorMessageProps = {
  error: AxiosError;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  let message;

  if (
    error.response?.data &&
    (error.response.data as string).includes(
      'matching events exceeds search limit of',
    )
  ) {
    const str = error.response.data as string;
    const lines = str.split(/\n\s*\n/);
    message = lines[1];
  } else {
    message = error.message;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '66vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ fontSize: '1.5rem' }}>Error: {message}</Typography>
    </div>
  );
};

export default ErrorMessage;
