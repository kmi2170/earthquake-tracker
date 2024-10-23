import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '../components/Map/MapParts/LoadingSpinner';

export const useDynamicMap = () => {
  return useMemo(
    () =>
      dynamic(() => import('../components/Map/MapMain'), {
        loading: () => (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '66vh',
              background: 'lightgray',
            }}
          >
            <LoadingSpinner />
          </div>
        ),
        ssr: false,
      }),
    [],
  );
};
