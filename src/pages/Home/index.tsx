import { useForm, FormProvider } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { useCycles } from "../../context/CyclesContext";

import { CountDown } from "./components/CountDown";
import { NewCycleForm } from "./components/NewCycleForm";

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(5).max(60),
});

// interface NewCycleFormData {
//   task: string;
//   minutesAmount: number;
// } A simple path to set de typescript on useForm

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>; // using zod to infer the values of TS on useForm

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useCycles();

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch("task");

  const isSubmitDisabled = !task;

  function handleCreateNewCycle(value: NewCycleFormData) {
    createNewCycle(value);
    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <StopCountDownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
