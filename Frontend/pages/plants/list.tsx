import type { NextApiRequest, NextPage } from "next";
import Link from "next/link";
import { NextRequest } from "next/server";
import {
  Container,
  IconPlusName,
  ImageCard,
  Info,
  PlantCard,
  PopularName,
  ScientificName,
  Title,
  Icons_wrapper,
} from "../../components/styled/styled-plants-list";
import { Plant } from "../../components/types/plants";

export async function getServerSideProps({ req }: {req: NextApiRequest}) {
  const res = await fetch(`http://localhost:8000/plants`, {
    headers: {
      Authorization: "Bearer " + String(req.cookies.AccessToken),
    },
  });

  const plants = await res.json();

  return { props: { plants } };
}

const Home = ({ plants }: {plants: Array<Plant>}) => {
  return (
    <Container>
      {plants.map((e, index: number) => (
        <PlantCard key={index}>
          <Link href={`/plant/${e.id}`}>
            <a>
              <Info>
                <Title>
                  <ScientificName>{`${e.species.genus.name} ${e.species.name} ${
                    e.complementary_name ? e.complementary_name : ""
                  }`}</ScientificName>
                  <PopularName>{e.popular_name}</PopularName>
                </Title>

                <Icons_wrapper>
                  <IconPlusName>
                    <img src="/icons/tree.svg" />
                    <p>{e.soil.name}</p>
                  </IconPlusName>
                  <IconPlusName>
                    <img src="/icons/sun.svg" />
                    <p>{e.sun_regime.name}</p>
                  </IconPlusName>
                  <IconPlusName>
                    <img src="/icons/drop.svg" />
                    <p>{e.last_watered ? e.last_watered : "N/A date"}</p>
                  </IconPlusName>
                  <IconPlusName>
                    <img src="/icons/leaf.svg" />
                    <p>{e.last_fertilized ? e.last_fertilized : "N/A date"}</p>
                  </IconPlusName>
                </Icons_wrapper>
              </Info>
              <ImageCard src={"http://localhost:8000" + e.banner}></ImageCard>
            </a>
          </Link>
        </PlantCard>
      ))}
    </Container>
  );
};

export default Home;
