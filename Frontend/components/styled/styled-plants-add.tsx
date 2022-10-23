import styled from "styled-components";

export const Container = styled.main`
  background-color: var(--background-secondary);
  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`;
