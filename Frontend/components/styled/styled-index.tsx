import styled from "styled-components";

export const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 3vh 3vw;
  background-color: var(--background-secondary);
  column-gap: 48px;
  & input, select {
    display: block;
  }
  & button {
    border: 3px solid var(--primary);
    margin: 8px 0;
    padding: 3px;
  }
`;
