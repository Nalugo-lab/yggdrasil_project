import type { NextPage } from "next";
import { Container } from "../../../../../components/styled/styled-index";

interface Data {
  name: string;
  id: number;
}

export async function getStaticPaths() {
  const res = await fetch(
    "http://localhost:8000/genera"
  );
  const species = (await res.json());

  const paths = species.map((species: any) => ({
    params: {
      group: species.family.group.name,
      family: species.family.name,
      genus: species.name,
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(
    `http://localhost:8000/scientific/${params.group}/${params.family}/${params.genus}`
  );
  const species = (await res.json());
  return {
    props: {
      species,
      group: params.group,
      family: params.family,
      genus: params.genus,
    },
  };
}

const Home: NextPage = ({ species, genus }: any) => {
  return (
    <Container>
      <h1>SPECIES</h1>
      {species.map((e: Data) => (
        <a href={`${genus}/${e.name}`} key={e.id}>
          {e.name}
        </a>
      ))}
    </Container>
  );
};

export default Home;
