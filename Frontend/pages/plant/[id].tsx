import type { NextPage } from "next";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
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
  ImageCard,
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
  const [last_fertilized, set_last_fertilized] = useState("");
  const [last_watered, set_last_watered] = useState("");

  // provavelmente vou ter que criar uma rota própria para proteger a alteração dos dados
  async function patch(data: any) {
    console.log(data);
    const response = await fetch(`http://localhost:8000/plants/${plant.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(AccessToken),
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("tudo certo!");
      const data = await response.json();
      Router.push("/");
    } else {
      console.log(response);
    }
  }

  return (
    <Container>
      <Name>
        {plant.is_dead && <b>TÁ MORTINHA</b>}
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

      {!plant.is_dead && (
        <Filled_button_button onClick={() => patch({ is_dead: true })}>
          MORREU!
        </Filled_button_button>
      )}
      <Filled_button_button onClick={() => patch({ is_archived: true })}>
        Arquivar
      </Filled_button_button>
      <form>
        <div>
          <label htmlFor="last_watered">Last watered</label>
          <input
            type="date"
            id="last_watered"
            name="last_watered"
            value={last_watered}
            onChange={(e) => {
              set_last_watered(e.target.value);
              patch({ last_watered: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="last_fertilized">Last fertilized</label>
          <input
            type="date"
            id="last_fertilized"
            name="last_fertilized"
            value={last_fertilized}
            onChange={(e) => {
              set_last_fertilized(e.target.value);
              patch({ last_fertilized: e.target.value });
            }}
          />
        </div>
      </form>
      <ImageCard>
        <img src={"http://localhost:8000" + plant.banner} />
      </ImageCard>
    </Container>
  );
};

export default Home;
