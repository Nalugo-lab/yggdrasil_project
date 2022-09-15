import type { NextPage } from "next";
import styled from "styled-components";

interface Data {
  owner__username: string;
  popular_name: string;
  custom_name: string;
  complementary_name: string;
  soil_preference__name: string;
  sun_preference__name: string;
  last_watered: any;
  species__name: string;
  species__genus__name: string;
  species__genus__family__name: string;
  species__genus__family__group__name: string;
}

export const Container = styled.main`
  display: flex;
  flex-wrap: wrap;
  padding: 3vh 3vw;
  background-color: var(--background-secondary);
  /* grid-template-columns: repeat(2, 1fr); */
`;

const PlantCard = styled.div`
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
`;

const Info = styled.div`
  /* background-color: var(--alert); */
`;

const ImageCard = styled.div`
  background-color: var(--info);
  aspect-ratio: 1 / 1;
  background-image: url("/queimada.jpeg");
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

const ScientificName = styled.span``;

const PopularName = styled.span``;

const ExtraInfo = styled.span``;

const Title = styled.div``;

const IconPlusName = styled.div``;

const Owner = styled.div``;

export async function getStaticProps() {
  const res = await fetch(
    `http://localhost:3000/django/herbarium/plants/getAll`
  );
  const plants = (await res.json()).context;

  return { props: { plants } };
}

const Home: NextPage = ({ plants }: any) => {
  console.table(plants);

  return (
    <Container>
      {plants.map((e: Data, index: number) => (
        <PlantCard key={index}>
          <Info>
            <Title>
              <ScientificName>{`${e.species__genus__name} ${e.species__name}`}</ScientificName>{" "}
              <ExtraInfo>{e.complementary_name}</ExtraInfo>
            </Title>
            <PopularName>{e.popular_name}</PopularName>
            <IconPlusName>
              <p>{e.soil_preference__name}</p>
              <img />
            </IconPlusName>
            <IconPlusName>
              <p>{e.sun_preference__name}</p>
              <img />
            </IconPlusName>
            <IconPlusName>
              <p>{e.last_watered}</p>
              <img />
            </IconPlusName>
            <p>{e.species__genus__family__name}</p>
            <p>{e.species__genus__family__group__name}</p>
            <Owner>
              <p>{e.owner__username}</p>
              <img />
            </Owner>
          </Info>
          <ImageCard></ImageCard>
        </PlantCard>
      ))}
    </Container>
  );
};

export default Home;
