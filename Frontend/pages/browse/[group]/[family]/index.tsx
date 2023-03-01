import type { NextPage } from "next";
import { Container } from "../../../../components/styled/styled-index";
import { Family, Genus } from "../../../../components/types/classification";

interface Data {
  name: string;
  id: number;
}

export async function getStaticPaths() {
  const res = await fetch(
    "http://localhost:8000/families/"
  );
  const families = (await res.json());
  const paths = families.map((family: Family) => ({
    params: { group: family.group.name, family: family.name },
  }));

  return { paths, fallback: false };
}

interface Params {
  params: {
    group: string;
    family: string;
  }
}

export async function getStaticProps({ params }: Params) {
  const res = await fetch(
    `http://localhost:8000/scientific/${params.group}/${params.family}`
  );
  const genera = (await res.json());
  return { props: { genera, group: params.group, family: params.family } };
}

interface Props {
  genera: Array<Genus>;
  family: Family
}

const Home = ({ genera, family }: Props) => {
  return (
    <Container>
      <h1>GENUS</h1>
      {genera.map((e: Data) => (
        <a href={`${family}/${e.name}`} key={e.id}>
          {e.name}
        </a>
      ))}
    </Container>
  );
};

export default Home;
