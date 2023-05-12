import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { useCycles } from "../../../../context/CyclesContext";

import { CountDownContainer, Separator } from "./styles";

export function CountDown() {
  const {
    activeCycle,
    markCurrentCycleAsFineshed,
    activeCycleId,
    amountSecondsPassed,
    handleAmountSecondsPassed,
  } = useCycles();

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFineshed();
          handleAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          handleAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFineshed,
    handleAmountSecondsPassed,
  ]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    } else {
      document.title = "Timer Pomodoro";
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
