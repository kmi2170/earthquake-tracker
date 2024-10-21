import { useContext } from 'react';
import { EqMagContext, EqMagContextType } from './eqMagContext';

export const useEqMag = () => {
  return useContext<EqMagContextType>(EqMagContext);
};
