import type { NextPage } from "next";
import { Container } from "../components/styled/styled-index";

// export async function getStaticProps() {
//   const res = await fetch(`http://localhost:3000/django/auth/authenticate`);
//   const groups = await res.json();
//   console.log(groups);

//   return { props: { groups: "1" } };
// }

const Home: NextPage = () => {
  return (
    <Container>
      <a href="/browse">browse</a>
      <a href="/plants/add">add</a>
      <a href="/browse/plants">all plants</a>

    </Container>
  );
};

export default Home;
