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
  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    border-right: 2px solid var(--text);
  }
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & a {
    margin-top: auto;
  }
`;

export const Hero_wrapper = styled.div`
  max-width: 1300px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 96px;
  align-items: center;
`;

export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 52px;
`;

export const Hero_main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  h1 {
    font-size: var(--font-size-4xl);
  }
`;

export const Hero_buttons = styled.div``;
