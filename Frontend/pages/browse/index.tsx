import type { NextPage } from "next";
import { Container } from "../../components/styled/styled-index";
import { Group } from "../../components/types/classification";

interface Data {
  name: string;
  id: number;
}

export async function getStaticProps() {
  const res = await fetch(
    `http://localhost:8000/groups/`
  );
  const groups = (await res.json());
  return { props: { groups } };
}

const Home = ({ groups }: {groups: Array<Group>}) => {
  return (
    <Container>
      <h1>GRUPOS</h1>
      {groups.map((e: Data, index: number) => (
        <a href={`browse/${e.name}`} key={index}>
          {e.name}
        </a>
      ))}
    </Container>
  );
};

export default Home;
