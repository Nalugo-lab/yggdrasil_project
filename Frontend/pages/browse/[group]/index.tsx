import type { NextPage } from "next";
import { Container } from "../../../components/styled/styled-index";
import { Family, Group } from "../../../components/types/classification";

interface Data {
  name: string;
  id: number;
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:8000/groups/`);
  const groups = await res.json();
  const paths = groups.map((group: Group) => ({
    params: { group: group.name },
  }));

  return { paths, fallback: false };
}

interface Params {
  params: { group: string };
}
export async function getStaticProps({ params }: Params) {
  const res = await fetch(`http://localhost:8000/scientific/${params.group}`);
  const families = await res.json();

  return { props: { families, group: params.group } };
}

interface Props {
  families: Array<Family>
  group: Group
}

const Home = ({ families, group }: Props) => {
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
