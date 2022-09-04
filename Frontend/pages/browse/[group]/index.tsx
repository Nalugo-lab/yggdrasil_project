import type { NextPage } from "next";
import { Container } from "../../../components/styled/styled-index";

interface Data {
  name: string;
  id: number;
}

export async function getStaticPaths() {
  const res = await fetch(
    "http://localhost:3000/django/herbarium/groups/getAll"
  );
  const groups = (await res.json()).context;
  const paths = groups.map((group: any) => ({
    params: { group: group.name },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(
    `http://localhost:3000/django/herbarium/${params.group}`
  );
  const families = (await res.json()).context;

  return { props: { families, group: params.group } };
}

const Home: NextPage = ({ families, group }: any) => {
  return (
    <Container>
      <h1>FAMILIES</h1>
      {families.map((e: Data) => (
        <a href={`${group}/${e.name}`} key={e.id}>
          {e.name}
        </a>
      ))}
    </Container>
  );
};

export default Home;
