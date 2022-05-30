import { useContext } from "react";
import { EqDataContext, IEqDataContext } from ".";

export const useEqData = () => {
  return useContext<IEqDataContext>(EqDataContext)
}
