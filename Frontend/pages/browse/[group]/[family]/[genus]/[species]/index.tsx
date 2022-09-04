import type { NextPage } from "next";
import { Container } from "../../../../../../components/styled/styled-index";
import { useRouter } from "next/router";

interface Data {
  name: string;
  id: number;
}

export async function getStaticPaths() {
  //   const res = await fetch(
  //     "http://localhost:3000/django/herbarium/species/getAll"
  //   );

  //   const speciments = (await res.json()).context;
  //   const paths = speciments.map((speciment: any) => ({
  //     params: {
  //       group: speciment.genus__family__group__name,
  //       family: speciment.genus__family__name,
  //       genus: speciment.genus__name,
  //       species: speciment.name,
  //     },
  //   }));

  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }: any) {
  console.log(params);
  const res = await fetch(
    `http://localhost:3000/django/herbarium/${params.group}/${params.family}/${params.genus}/${params.species}`
  );
  const speciment = (await res.json()).context;
  return {
    props: {
      speciment,
      group: params.group,
      family: params.family,
      genus: params.genus,
      species: params.species,
    },
  };
}

const Home: NextPage = ({ speciment }: any) => {
  const router = useRouter();
  let daUmaAjudinhaAe = [];
  for (const key in speciment) {
    daUmaAjudinhaAe.push({ key, value: speciment[key] });
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
