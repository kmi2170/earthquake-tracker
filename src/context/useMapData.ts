import { useContext } from 'react';
import { EqMapContextType, EqMapContext } from './eqMapContext ';

export const useMapData = () => {
  return useContext<EqMapContextType>(EqMapContext);
};
