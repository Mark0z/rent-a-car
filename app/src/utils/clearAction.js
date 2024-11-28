import { littleStateMachineDefaultState } from 'data/little-state-machine-default-state';

export const clearAction = () => {
  return {
    data: littleStateMachineDefaultState
  };
};
