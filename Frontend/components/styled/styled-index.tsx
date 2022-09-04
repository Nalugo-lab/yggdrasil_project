import styled from "styled-components";

export const Container = styled.main`
display: grid;
grid-template-columns: repeat(3, 1fr);
padding: 3vh 3vw;
background-color: var(--background-secondary);
column-gap: 48px;
`;