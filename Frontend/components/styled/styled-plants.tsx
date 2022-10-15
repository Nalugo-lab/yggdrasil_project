import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-wrap: wrap;
  padding: 3vh 3vw;
  background-color: var(--background-secondary);
  /* grid-template-columns: repeat(2, 1fr); */
`;

export const PlantCard = styled.div`
  border: 5px solid var(--primary);
  background-color: var(--secondary);
  max-width: 620px;
  min-width: 580px;
  max-height: 220px;
  margin: 8px;
  padding: 8px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 3fr 1.5fr;
  font-size: 11px;
`;

export const Info = styled.div`
  /* background-color: var(--alert); */
`;

interface ImageCardProps {
  src: string;
}

export const ImageCard = styled.div<ImageCardProps>`
  background-color: var(--info);
  aspect-ratio: 1 / 1;
  background-image: url(${(props: any) => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  /* & img {
  display: block;
  width: 100%;
  height: 100%; 
  object-fit: contain;
} */
`;

export const ScientificName = styled.span``;

export const PopularName = styled.span``;

export const ExtraInfo = styled.span``;

export const Title = styled.div``;

export const IconPlusName = styled.div``;

export const Owner = styled.div``;
