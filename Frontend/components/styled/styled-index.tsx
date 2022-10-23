import styled from "styled-components";

export const Container = styled.main`
  display: grid;
  grid-template-rows: repeat(3);
  padding: 16px;
  background-color: var(--background-secondary);
  column-gap: 48px;
`;

export const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 250px;
`;

export const Feature = styled.div`
  &:nth-child(1),&:nth-child(2), &:nth-child(3){
    border-right: 2px solid var(--text);
  }
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & a{
    margin-top: auto;
  }
`;

export const Title_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`