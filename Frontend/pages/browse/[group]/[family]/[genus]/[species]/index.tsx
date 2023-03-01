import { Container } from "../../../../../../components/styled/styled-index";
import { useRouter } from "next/router";
import { Species } from "../../../../../../components/types/classification";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

interface Params {
  params: {
    group: string;
    family: string;
    genus: string;
    species: string;
  };
}

export async function getStaticProps({ params }: Params) {
  const res = await fetch(
    `http://localhost:3000/django/herbarium/${params.group}/${params.family}/${params.genus}/${params.species}`
  );
  const specimen = await res.json();
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

const Home = ({ specimen }: {specimen: any}) => {
  console.log(specimen)
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
