import styled from "styled-components";

export const Container = styled.main`
  background-color: var(--background-secondary);
  padding: 48px 32px;

  & form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr .1fr;
    grid-template-areas:
      none
      "group family genus species"
      "soil sun"
      "popular custom complementary"
      "photo"
      "button";
    column-gap: 32px;
    row-gap: 32px;
  }
`;

export const Card = styled.div`
  max-width: 720px;
  margin: 100px auto;
  border: 7px solid var(--primary);
`;

export const ScientificName = styled.div`
  font-size: var(--font-size-3xl);
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Genus_display = styled.b`
  font-style: italic;
`;
export const Species_display = styled.span`
  font-style: italic;
`;

export const PopularName = styled.span`
  font-size: var(--font-size-2xl);
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Complementary_name = styled.span`
  font-size: var(--font-size-2xl);
  color: var(--gray);
`;

export const Errors = styled.div`
  p {
    color: red;
  }
`;
