import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Cycle } from "../@types/interfaces";
import { cyclesReducer } from "../reducers/cycles/reducers";
import {
  addNewCycleAction,
  interruptCycledAction,
  markCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface NewCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cyclesList: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFineshed: () => void;
  markCurrentCycleAsInterrupted: () => void;
  createNewCycle(data: NewCycleData): void;
  interruptCurrentCycle(): void;
  addNewCycle: (value: Cycle) => void;
  amountSecondsPassed: number;
  handleAmountSecondsPassed: (number: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesProviderProps {
  children: ReactNode;
}

export function CyclesProvider({ children }: CyclesProviderProps) {
  const [cyclesState, dispach] = useReducer(
    cyclesReducer,
    {
      cyclesList: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        "@timer-pomodoro:cycles-state1.0.0"
      );
      if (storedStateAsJSON) {
        const storedStateAsObject = JSON.parse(storedStateAsJSON);

        return {
          activeCycleId: storedStateAsObject.activeCycleId,
          cyclesList: storedStateAsObject.cyclesList.map((cycle: Cycle) => {
            return {
              ...cycle,
              startDate: new Date(cycle.startDate),
              interruptedDate:
                cycle.interruptedDate && new Date(cycle.interruptedDate),
              finishedDate: cycle.finishedDate && new Date(cycle.finishedDate),
            };
          }),
        };
      }
      return initialState;
    }
  );

  const { cyclesList, activeCycleId } = cyclesState;
  const activeCycle = cyclesList.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  function markCurrentCycleAsFineshed() {
    dispach(markCycleAsFinishedAction());
  }

  function markCurrentCycleAsInterrupted() {
    dispach(interruptCycledAction());
  }

  function createNewCycle(data: NewCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    addNewCycle(newCycle);
    handleAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    markCurrentCycleAsInterrupted();
    handleAmountSecondsPassed(0);
  }

  function handleAmountSecondsPassed(value: number) {
    setAmountSecondsPassed(value);
  }

  function addNewCycle(newCycle: Cycle) {
    dispach(addNewCycleAction(newCycle));
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem("@timer-pomodoro:cycles-state1.0.0", stateJSON);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider
      value={{
        cyclesList,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFineshed,
        markCurrentCycleAsInterrupted,
        addNewCycle,

        amountSecondsPassed,
        handleAmountSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}

export function useCycles() {
  return useContext(CyclesContext);
}
