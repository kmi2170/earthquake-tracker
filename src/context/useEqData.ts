import { useContext } from 'react';
import { EqDataContextType, EqDataContext } from './eqDataContext';

export const useEqData = () => {
  return useContext<EqDataContextType>(EqDataContext);
};
