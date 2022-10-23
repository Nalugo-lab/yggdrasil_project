import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & form {
    max-width: 340px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    /* background-color: var(--background-secondary); */
  }
`;
