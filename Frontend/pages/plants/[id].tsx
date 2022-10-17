import type { NextPage } from "next";
import { Container } from "../../components/styled/styled-plants";

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
  console.log(params);
  console.log(req);

  const res = await fetch(`http://localhost:8000/plants/${params.id}`, {
    headers: {
      Authorization: "Bearer " + String(req.cookies.AccessToken),
    },
  });
  const plant = await res.json();

  return { props: { plant: plant } };
}

const Home: NextPage = ({ plant }: any) => {
  console.log(plant);
  return (
    <Container>
        <div>
      <p>{`Genus and species: ${plant.species.genus.name} ${plant.species.name}`}</p>
      <p>{"complementary name:" + plant.complementary_name}</p>
      <p>{"family name:" + plant.species.genus.family.name}</p>
      <p>{"group name:" + plant.species.genus.family.group.name}</p>

      <p>{"custom name:" + plant.custom_name}</p>
      <p>{"popular name:" + plant.popular_name}</p>
      <p>{"complementary name:" + plant.complementary_name}</p>

      <p>{"soil name:" + plant.soil.name}</p>
      <p>{"sun preference name:" + plant.sun_preference.name}</p>
      <p>{"soil  name:" + plant.soil.name}</p>

      <p>{"last watered:" + plant.last_watered}</p>
      <p>{"last fertilized:" + plant.last_fertilized}</p>

      <p>{"owner username:" + plant.owner.username}</p>
      </div>
      <img src={"http://localhost:8000" + plant.banner}></img>
    </Container>
  );
};

export default Home;
