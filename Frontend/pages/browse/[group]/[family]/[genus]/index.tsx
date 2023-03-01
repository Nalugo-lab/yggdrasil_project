import type { NextPage } from "next";
import { Container } from "../../../../../components/styled/styled-index";
import { Genus, Species } from "../../../../../components/types/classification";

interface Data {
  name: string;
  id: number;
}

export async function getStaticPaths() {
  const res = await fetch(
    "http://localhost:8000/genera"
  );
  const species = (await res.json());

  const paths = species.map((species: Species) => ({
    params: {
      group: species.genus.family.group.name,
      family: species.genus.family.name,
      genus: species.name,
    },
  }));

  return { paths, fallback: false };
}

interface Params {
  params: {
    group: string;
    family: string;
    genus: string;

  }
}
export async function getStaticProps({ params }: Params) {
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

interface Props {
  species: Array<Species>;
  genus: Genus;
}

const Home = ({ species, genus }: Props) => {
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
