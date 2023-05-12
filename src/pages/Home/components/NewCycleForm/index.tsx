import { useFormContext } from "react-hook-form";
import { useCycles } from "../../../../context/CyclesContext";

import { MinutesAmountInput, NewCycleFormContainer, TaskInput } from "./styles";

export function NewCycleForm() {
  const { activeCycle } = useCycles();
  const { register } = useFormContext();

  return (
    <NewCycleFormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="De um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register("task")}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
        <option value="Projeto 5" />
      </datalist>

      <label htmlFor="minutesAmount">Durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>Minutos</span>
    </NewCycleFormContainer>
  );
}
