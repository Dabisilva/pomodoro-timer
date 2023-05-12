import { formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";

import { useCycles } from "../../context/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  const { cyclesList } = useCycles();
  return (
    <HistoryContainer>
      <h1>Meu historico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duracao</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cyclesList.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBr,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Status status="green">Concluido</Status>
                  )}
                  {cycle.interruptedDate && (
                    <Status status="red">Interrompido</Status>
                  )}
                  {!cycle.interruptedDate && !cycle.finishedDate && (
                    <Status status="yellow">Andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
