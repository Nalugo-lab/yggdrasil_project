import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 16px;
  gap: 16px;
  background-color: var(--background-secondary);
  /* grid-template-columns: repeat(2, 1fr); */
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 32px;
`;

interface ImageCardProps {
  src: string;
}

export const ImageCard = styled.div<ImageCardProps>`
  aspect-ratio: 1 / 1;
  background-image: url(${(props: any) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-basis: calc(100% * 0.35);

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ScientificName = styled.p``;

export const PopularName = styled.p``;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconPlusName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    filter: var(--inverse);
  }
`;

export const Icons_wrapper = styled.div`
  display: grid;
  margin-top: auto;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 16px;
  grid-template-rows: repeat(2, 1fr);
`;

export const PlantCard = styled.div`
  & a {
    border: 5px solid var(--primary);
    display: flex;
    font-size: 1rem;
    border-radius: 5px;
    min-width: 550px;
  }
  &:hover ${Title} p{
    color: var(--primary) !important;
  }
`;
