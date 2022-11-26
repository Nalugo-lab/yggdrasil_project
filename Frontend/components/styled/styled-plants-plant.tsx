import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  padding: 16px;
  gap: 16px;
  background-color: var(--background-secondary);
`;

export const ScientificName = styled.div`
  font-size: var(--font-size-3xl);
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Genus = styled.b`
  font-style: italic;
`;
export const Species = styled.span`
  font-style: italic;
`;

export const PopularName = styled.span`
  font-size: var(--font-size-2xl);
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
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

export const ImageCard = styled.div`
  max-width: 520px;
  margin: auto;
`