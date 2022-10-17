import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px;
  font-size: var(--font-size-xl);
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
