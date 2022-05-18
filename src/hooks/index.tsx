import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { DisplayEqData } from '../api/types';

import CircularProgress from '@material-ui/core/CircularProgress';

export const useMap = (eqData: DisplayEqData[]) => {
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
    [eqData],
  );
};
