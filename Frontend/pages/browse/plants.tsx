import type { NextPage } from "next";
import {
  Container,
  ExtraInfo,
  IconPlusName,
  ImageCard,
  Info,
  Owner,
  PlantCard,
  PopularName,
  ScientificName,
  Title,
} from "../../components/styled/styled-plants";

interface Data {
  owner: {
    name: string;
    username: string;
    email: string;
  };
  soil: {
    name: string;
    description: string;
  };
  sun_preference: {
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
}

export async function getServerSideProps(request) {
  console.log(request.req.headers)
  const res = await fetch(`http://localhost:8000/plants`, {
    // headers: { "X-CSRFToken": request.req.cookies.csrftoken },
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
          <Info>
            <Title>
              <ScientificName>{`Genus and species: ${e.species.genus.name} ${e.species.name}`}</ScientificName>{" "}
              <ExtraInfo>
                {"complementary name:" + e.complementary_name}
              </ExtraInfo>
            </Title>
            <PopularName>{"popular name:" + e.popular_name}</PopularName>
            <IconPlusName>
              <p>{"soil name:" + e.soil.name}</p>
              <img />
            </IconPlusName>
            <IconPlusName>
              <p>{"sun_preference name:" + e.sun_preference.name}</p>
              <img />
            </IconPlusName>
            <IconPlusName>
              <p>{"last watered:" + e.last_watered}</p>
              <img />
            </IconPlusName>
            <p>{"family name:" + e.species.genus.family.name}</p>
            <p>{"group name:" + e.species.genus.family.group.name}</p>
            <Owner>
              <p>{"owner username:" + e.owner.username}</p>
              <img />
            </Owner>
          </Info>
          <ImageCard src={"http://localhost:8000" + e.banner}></ImageCard>
        </PlantCard>
      ))}
    </Container>
  );
};

export default Home;
