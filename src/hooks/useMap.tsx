import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import CircularProgress from '@material-ui/core/CircularProgress';

export const useMap = () => {
  return useMemo(
    () =>
      dynamic(() => import('../components/Map'), {
        loading: () => (
          <div>
            <CircularProgress />
            Map is Loading...
          </div>
        ),
        ssr: false,
      }),
    []
  );
};
