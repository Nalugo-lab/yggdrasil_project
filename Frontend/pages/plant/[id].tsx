import type { NextPage } from "next";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import { Filled_button_button } from "../../components/essential";
import {
  Container,
  ScientificName,
  Genus,
  Species,
  PopularName,
  Name,
  Title,
  Complementary_name,
} from "../../components/styled/styled-plants-plant";

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
  const { isAuthenticated, AccessToken, authFetch } = useContext(AuthContext);

  async function Charon() {
    const response = await fetch(`http://localhost:8000/plants/${plant.id}/`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + String(AccessToken),
      },
      body: JSON.stringify({
        id_dead: true,
      }),
    });

    console.log(response);
  }

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
      <p>{"sun preference name:" + plant.sun_regime.name}</p>
      <p>{"soil  name:" + plant.soil.name}</p>

      <p>{"last watered:" + plant.last_watered}</p>
      <p>{"last fertilized:" + plant.last_fertilized}</p>

      <p>{"owner username:" + plant.owner.username}</p> */}
      <Filled_button_button onClick={Charon}>MORREU!</Filled_button_button>
      <Filled_button_button>Arquivar</Filled_button_button>

      <img src={"http://localhost:8000" + plant.banner}></img>
    </Container>
  );
};

export default Home;
