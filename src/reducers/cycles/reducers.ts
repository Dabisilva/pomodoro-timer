import { produce } from "immer";
import { Cycle } from "../../@types/interfaces";
import { ActionTypes } from "./actions";

interface CyclesState {
  cyclesList: Cycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cyclesList.push(action.payload.newCycle),
          (draft.activeCycleId = action.payload.newCycle.id);
      });

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cyclesList.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cyclesList[currentCycleIndex].interruptedDate = new Date();
      });
    }

    case ActionTypes.MARK_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cyclesList.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cyclesList[currentCycleIndex].finishedDate = new Date();
      });
    }
    default:
      return state;
  }
}
