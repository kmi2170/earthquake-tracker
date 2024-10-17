// 'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';

export const useDynamicMap = () => {
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
    [],
  );
};
