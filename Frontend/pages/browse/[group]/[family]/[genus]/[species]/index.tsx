import type { NextPage } from "next";
import { Container } from "../../../../../../components/styled/styled-index";
import { useRouter } from "next/router";

interface Data {
  name: string;
  id: number;
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(
    `http://localhost:3000/django/herbarium/${params.group}/${params.family}/${params.genus}/${params.species}`
  );
  const specimen = (await res.json());
  return {
    props: {
      specimen,
      group: params.group,
      family: params.family,
      genus: params.genus,
      species: params.species,
    },
  };
}

const Home: NextPage = ({ specimens: specimen }: any) => {
  const router = useRouter();
  let daUmaAjudinhaAe = [];
  for (const key in specimen) {
    daUmaAjudinhaAe.push({ key, value: specimen[key] });
  }

  if (router.isFallback) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <Container>
      {daUmaAjudinhaAe.map((e) => (
        <p>{`${e.key}: ${e.value}`}</p>
      ))}
    </Container>
  );
};

export default Home;
