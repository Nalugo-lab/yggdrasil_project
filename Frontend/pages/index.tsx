import type { NextPage } from "next";
import { Container } from "../components/styled/styled-index";

const Home: NextPage = () => {
  return (
    <Container>
      <a href="/browse">browse</a>
      <a href="/plants/add">add</a>
      <a href="/browse/plants">all plants</a>
      <a href="/plants/append">Test image</a>
    </Container>
  );
};

export default Home;
