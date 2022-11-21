import type { NextPage } from "next";
import {
  SyntheticEvent,
  useEffect,
  useState,
  useContext,
  ChangeEvent,
} from "react";
import {
  Card,
  Container,
  Complementary_name,
  Genus,
  Name,
  PopularName,
  ScientificName,
  Species,
  Title,
  Errors,
} from "../../components/styled/styled-plants-add";
import { AuthContext } from "../../components/AuthContext";
import Router from "next/router";
import { Select, Basic_input, Filled_button_button } from "../../components/essential";

export async function getStaticProps() {
  const groupsRes = await fetch(`http://localhost:8000/groups/`);

  const sun_regimesRes = await fetch(
    `http://localhost:8000/sun_regimes/`
  );

  const soilsRes = await fetch(`http://localhost:8000/soils/`);

  const groups = await groupsRes.json();
  const sun_regimes = await sun_regimesRes.json();
  const soils = await soilsRes.json();

  return { props: { groups, sun_regimes, soils } };
}

const Add: NextPage = ({ groups, sun_regimes, soils }: any) => {
  const { isAuthenticated, AccessToken, authFetch } = useContext(AuthContext);

  const [errors, set_errors] = useState<any>(undefined);

  const [popular_name, setPopular_name] = useState("");
  const [custom_name, setCustom_name] = useState("");
  const [complementary_name, setComplementary_name] = useState("");

  const [soil, setSoil] = useState<any>(undefined);
  const [sun_regime, setSun_regime] = useState<any>(undefined);

  const [species, setSpecies] = useState<any>(undefined);
  const [genus, setGenus] = useState<any>(undefined);
  const [family, setFamily] = useState<any>(undefined);
  const [group, setGroup] = useState<any>(undefined);

  const [speciesData, setSpeciesData] = useState();
  const [genusData, setGenusData] = useState();
  const [familyData, setFamilyData] = useState();

  const [photoFile, setPhotoFile] = useState<Blob>();

  async function submitForm(e: SyntheticEvent) {
    e.preventDefault();

    if (!isAuthenticated) {
      console.log("tá querendo me enganar fdp?");
      return;
    }

    if (!photoFile || !species || !soil || !sun_regime) return;

    const data = new FormData();
    data.append("image", photoFile ? photoFile : "");

    data.append("popular_name", popular_name ? popular_name : "");
    data.append("custom_name", custom_name ? photoFile : "");
    data.append("complementary_name", complementary_name ? complementary_name : "");
    data.append("soil", soil.key ? soil.key : "");
    data.append("sun_regime", sun_regime.key ? sun_regime.key : "");
    data.append("species", species.key ? species.key : "");

    const response = await authFetch(
      "http://localhost:8000/plants/",
      "POST",
      data
    );

    if (response.ok) {
      Router.push("/");
      return;
    }

    try {
      const data = await response.json();
      set_errors(JSON.parse(data));
    } catch {}
  }

  async function getFetch(url: string) {
    if (!isAuthenticated) return;

    const headers = new Headers({
      Authorization: "Bearer " + String(AccessToken),
    });

    const response = await fetch(url, { headers });
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    if (group) {
      (async () => {
        setFamilyData(
          await getFetch(`http://localhost:8000/scientific/${group.key}`)
        );
        setFamily(undefined);
      })();
    }
  }, [group]);

  useEffect(() => {
    if (family && group) {
      (async () => {
        setGenusData(
          await getFetch(
            `http://localhost:8000/scientific/${group.key}/${family.key}`
          )
        );
        setGenus(undefined);
      })();
    }
  }, [family, group]);

  useEffect(() => {
    if (genus && family && group) {
      (async () => {
        const data = await getFetch(
          `http://localhost:8000/scientific/${group.key}/${family.key}/${genus.key}`
        );
        setSpeciesData(data);
        setSpecies(undefined);
      })();
    }
  }, [genus, family, group]);

  return (
    <Container>
      <Errors>
        {errors &&
          Object.keys(errors).map((e) => {
            return (
              <p>
                {e} - {errors[e][0].message}
              </p>
            );
          })}
      </Errors>

      <form method="POST" onSubmit={submitForm}>
        <section>
          <div>
            <label htmlFor="group">Group</label>
            <Select
              name="group"
              id="group"
              data={groups}
              value={group}
              keyIndex="id"
              valueIndex="name"
              handleChange={setGroup}
              tabIndex={0}
            ></Select>
          </div>
          <div>
            <label htmlFor="group">Family</label>
            <Select
              name="family"
              id="family"
              data={familyData}
              value={family}
              keyIndex="id"
              valueIndex="name"
              handleChange={setFamily}
              tabIndex={0}
            ></Select>
          </div>
          <div>
            <label htmlFor="genus">Genus</label>
            <Select
              name="genus"
              id="genus"
              data={genusData}
              value={genus}
              keyIndex="id"
              valueIndex="name"
              handleChange={setGenus}
              tabIndex={0}
            ></Select>
          </div>
          <div>
            <label htmlFor="genus">Species</label>
            <Select
              name="species"
              id="species"
              data={speciesData}
              value={species}
              keyIndex="id"
              valueIndex="name"
              handleChange={setSpecies}
              tabIndex={0}
            ></Select>
          </div>
        </section>

        <section>
          <div>
            <label htmlFor="soil">Soil preference</label>
            <Select
              name="soil"
              id="soil"
              data={soils}
              value={soil}
              keyIndex="id"
              valueIndex="name"
              handleChange={setSoil}
              tabIndex={0}
            ></Select>
          </div>
          <div>
            <label htmlFor="sun_regime">Sun preference</label>
            <Select
              name="sun_regime"
              id="sun_regime"
              data={sun_regimes}
              value={sun_regime}
              keyIndex="id"
              valueIndex="name"
              handleChange={setSun_regime}
              tabIndex={0}
            ></Select>
          </div>
        </section>

        <section>
          <Basic_input
            type="text"
            id="popular_name"
            name="popular_name"
            value={popular_name}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPopular_name(e.target.value)
            }
            label="Popular name"
            tabIndex={0}
          />

          <Basic_input
            type="text"
            id="custom_name"
            name="custom_name"
            value={custom_name}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCustom_name(e.target.value)
            }
            label="Custom name"
            tabIndex={0}
          />

          <Basic_input
            type="text"
            id="complementary_name"
            name="complementary_name"
            value={complementary_name}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setComplementary_name(e.target.value)
            }
            label="Complementary name"
            tabIndex={0}
          />
        </section>

        <div>
          <label htmlFor="photo">Plant photo</label>
          <input
            type="file"
            accept="image/*"
            id="photo"
            name="photo"
            onChange={(e) => {
              const [file]: any = e.target.files;
              if (file) setPhotoFile(file);
            }}
            tabIndex={0}
          />
        </div>

        <Filled_button_button tabIndex={0}>Confirm</Filled_button_button>
      </form>

      <Card>
        <Name>
          <Title>
            <ScientificName>
              <Genus>{genus && genus.value}</Genus>
              <Species>{species && species.value}</Species>
            </ScientificName>
            <Complementary_name>{complementary_name}</Complementary_name>
          </Title>
          <PopularName>{popular_name}</PopularName>
        </Name>

        <img
          id="blah"
          src={photoFile ? URL.createObjectURL(photoFile) : ""}
          alt="your image"
        />
      </Card>
    </Container>
  );
};

export default Add;
