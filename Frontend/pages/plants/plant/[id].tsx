import type { NextPage } from "next";
import {
  Container,
  ScientificName,
  Genus,
  Species,
  PopularName,
  Name,
  Title,
  Complementary_name,
} from "../../../components/styled/styled-plants-plant";

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

export async function getServerSideProps({ req, params }: any) {
  const res = await fetch(`http://localhost:8000/plants/${params.id}`, {
    headers: {
      Authorization: "Bearer " + String(req.cookies.AccessToken),
    },
  });
  const plant = await res.json();

  return { props: { plant: plant } };
}

const Home: NextPage = ({ plant }: any) => {
  return (
    <Container>
      <Name>
        <Title>
          <ScientificName>
            <Genus>{plant.species.genus.name}</Genus>
            <Species>{plant.species.name}</Species>
          </ScientificName>
          <Complementary_name>{plant.complementary_name}</Complementary_name>
        </Title>
        <PopularName>{plant.popular_name}</PopularName>
      </Name>

      {/* <p>{"custom name:" + plant.custom_name}</p>
      <p>{"complementary name:" + plant.complementary_name}</p>

      <p>{"soil name:" + plant.soil.name}</p>
      <p>{"sun preference name:" + plant.sun_preference.name}</p>
      <p>{"soil  name:" + plant.soil.name}</p>

      <p>{"last watered:" + plant.last_watered}</p>
      <p>{"last fertilized:" + plant.last_fertilized}</p>

      <p>{"owner username:" + plant.owner.username}</p> */}
      <img src={"http://localhost:8000" + plant.banner}></img>
    </Container>
  );
};

export default Home;
