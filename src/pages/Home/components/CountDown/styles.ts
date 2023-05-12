import styled from "styled-components";

export const CountDownContainer = styled.div`
  font-family: "Robot Mono", monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme["gray-100"]};

  display: flex;
  gap: 1rem;

  span {
    background-color: ${({ theme }) => theme["gray-600"]};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2rem 0;
  width: 4rem;

  color: ${({ theme }) => theme["green-500"]};

  overflow: hidden;
`;
