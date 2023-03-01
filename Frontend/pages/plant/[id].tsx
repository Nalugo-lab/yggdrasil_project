import type { NextApiRequest, NextPage } from "next";
import Router from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";
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
  Other_images_wrapper
} from "../../components/styled/styled-plants-plant";
import { Plant } from "../../components/types/plants";

export async function getServerSideProps({ req, params }: {req: NextApiRequest, params:{id: number}}) {
  const res = await fetch(`http://localhost:8000/plants/${params.id}`, {
    headers: {
      Authorization: "Bearer " + String(req.cookies.AccessToken),
    },
  });
  const plant = await res.json();

  return { props: { plant: plant } };
}

const Home = ({ plant }: {plant: Plant}) => {
  const { isAuthenticated, AccessToken, authFetch } =
    useContext(AuthContext);
  const [last_fertilized, set_last_fertilized] = useState("");
  const [last_watered, set_last_watered] = useState("");
  const [photoFile, setPhotoFile] = useState<Blob>();

  // provavelmente vou ter que criar uma rota própria para proteger a alteração dos dados
  async function patch(data: unknown) {
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
      // Router.push("/");
    } else {
    }
  }

  async function add_image(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData();
    data.append("image", photoFile ? photoFile : "");
    data.append("pk", plant.id.toString());

    const response = await authFetch(
      `http://localhost:8000/add_image`,
      "POST",
      data
    );

    if (response.ok) {
      alert("tudo certo!");
      const data = await response.json();
      
    } else {
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
          <p>Last watered at: {plant.last_watered}</p>
          <label htmlFor="last_watered">Last watered</label>
          <input
            type="date"
            id="last_watered"
            name="last_watered"
            onChange={(e) => {
              set_last_watered(e.target.value);
              patch({ last_watered: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Last fertilized at: {plant.last_fertilized}</p>
          <label htmlFor="last_fertilized">Last fertilized</label>
          <input
            type="date"
            id="last_fertilized"
            name="last_fertilized"
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
      
      <Other_images_wrapper>
        {plant.images &&
          plant.images.map((image) => {
            return (
              <ImageCard>
                <img src={"http://localhost:8000/media/" + image.image} />{" "}
              </ImageCard>
            );
          })}
      </Other_images_wrapper>

        <form onSubmit={add_image}>
          <label htmlFor="new_image">Add image</label>
          <input
            type="file"
            accept="image/*"
            id="photo"
            name="photo"
            onChange={(e) => {
              const [file]: any = e.target.files;
              if (file) setPhotoFile(file);
            }}
          ></input>
          <Filled_button_button>Add!</Filled_button_button>
        </form>
    </Container>
  );
};

export default Home;
