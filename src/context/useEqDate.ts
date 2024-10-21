import { useContext } from 'react';
import { EqDateContext, EqDateContextType } from './eqDateContext';

export const useEqDate = () => {
  return useContext<EqDateContextType>(EqDateContext);
};
