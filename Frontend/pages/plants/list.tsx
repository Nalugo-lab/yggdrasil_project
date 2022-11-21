import type { NextPage } from "next";
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

interface Data {
  id: number;
  owner: {
    name: string;
    username: string;
    email: string;
  };
  soil: {
    name: string;
    description: string;
  };
  sun_regime: {
    name: string;
    description: string;
  };
  species: {
    id: number;
    name: string;
    genus: {
      id: number;
      name: string;
      family: {
        id: number;
        name: string;
        group: {
          id: number;
          name: string;
        };
      };
    };
  };

  banner: string;
  popular_name: string | null;
  custom_name: string | null;
  complementary_name: string | null;
  last_watered: string | null;
  last_fertilized: string | null;
}

export async function getServerSideProps({ req }: any) {
  const res = await fetch(`http://localhost:8000/plants`, {
    headers: {
      Authorization: "Bearer " + String(req.cookies.AccessToken),
    },
  });

  // if (res.redirected) {
  //   console.log("url: " + res.url);

  //   return { props: { plants: [] } };
  // }

  const plants = await res.json();

  return { props: { plants } };
}

const Home: NextPage = ({ plants }: any) => {
  return (
    <Container>
      {plants.map((e: Data, index: number) => (
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
