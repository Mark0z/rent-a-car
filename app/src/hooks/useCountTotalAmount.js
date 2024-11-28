import { useCountDaysOfReservation } from 'hooks/useCountDaysOfReservation';
import { useStateMachine } from 'little-state-machine';

export const useCountTotalAmount = (pricePerDay) => {
  const { state } = useStateMachine();
  return Math.round(pricePerDay * useCountDaysOfReservation(state.data));
};
