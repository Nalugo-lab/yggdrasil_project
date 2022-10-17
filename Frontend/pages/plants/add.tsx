import type { NextPage } from "next";
import { SyntheticEvent, useEffect, useState, useContext } from "react";
import { Container } from "../../components/styled/styled-index";
import { AuthContext } from "../../components/AuthContext";
import Router from "next/router";

export async function getStaticProps() {
  const groupsRes = await fetch(`http://localhost:8000/groups/`);

  const sun_preferencesRes = await fetch(
    `http://localhost:8000/sun_preferences/`
  );

  const soilsRes = await fetch(`http://localhost:8000/soils/`);

  const groups = await groupsRes.json();
  const sun_preferences = await sun_preferencesRes.json();
  const soils = await soilsRes.json();

  return { props: { groups, sun_preferences, soils } };
}

type SelectType = {
  name: string;
  id: string;
  data: any;
  value: string | undefined;
  keyIndex: string | number;
  valueIndex: string | number;
  handleChange: any;
};

function Select({
  name,
  id,
  data,
  value,
  keyIndex,
  valueIndex,
  handleChange,
}: SelectType) {
  return (
    <select
      name={name}
      id={id}
      value={String(value)}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option disabled value={"undefined"}>
        -- select an option --
      </option>
      {data &&
        data.map((option: any) => (
          <option
            key={`${option[valueIndex]}-${option[keyIndex]}`}
            value={option[keyIndex]}
          >
            {option[valueIndex]}
          </option>
        ))}
    </select>
  );
}

const Add: NextPage = ({ groups, sun_preferences, soils }: any) => {
  const { isAuthenticated, AccessToken, authFetch } =
    useContext(AuthContext);

  const [popular_name, setPopular_name] = useState("");
  const [custom_name, setCustom_name] = useState("");
  const [complementary_name, setComplementary_name] = useState("");

  const [soil, setSoil] = useState(undefined);
  const [sun_preference, setSun_preference] = useState(undefined);

  const [species, setSpecies] = useState(undefined);
  const [genus, setGenus] = useState(undefined);
  const [family, setFamily] = useState(undefined);
  const [group, setGroup] = useState(undefined);

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
    if (!photoFile || !species || !soil || !sun_preference) return;

    const data = new FormData();
    data.append("image", photoFile);

    data.append("popular_name", popular_name);
    data.append("custom_name", custom_name);
    data.append("complementary_name", complementary_name);
    data.append("soil", soil);
    data.append("sun_preference", sun_preference);
    data.append("species", species);

    const response = await authFetch("http://localhost:8000/plants/", "POST", data);

    if (response.ok) {
      Router.push("/");
      return;
    }

    console.log(response);
    try {
      const data = await response.json();
      console.log(data);
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
          await getFetch(`http://localhost:8000/scientific/${group}`)
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
            `http://localhost:8000/scientific/${group}/${family}`
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
          `http://localhost:8000/scientific/${group}/${family}/${genus}`
        );
        setSpeciesData(data);
        setSpecies(undefined);
      })();
    }
  }, [genus, family, group]);

  return (
    <Container>
      <form method="POST" onSubmit={submitForm}>
        <label htmlFor="group">Group</label>
        <Select
          name="group"
          id="group"
          data={groups}
          value={group}
          keyIndex="id"
          valueIndex="name"
          handleChange={setGroup}
        ></Select>

        <label htmlFor="group">Family</label>
        <Select
          name="family"
          id="family"
          data={familyData}
          value={family}
          keyIndex="id"
          valueIndex="name"
          handleChange={setFamily}
        ></Select>

        <label htmlFor="genus">Genus</label>
        <Select
          name="genus"
          id="genus"
          data={genusData}
          value={genus}
          keyIndex="id"
          valueIndex="name"
          handleChange={setGenus}
        ></Select>

        <label htmlFor="genus">Species</label>
        <Select
          name="species"
          id="species"
          data={speciesData}
          value={species}
          keyIndex="id"
          valueIndex="name"
          handleChange={setSpecies}
        ></Select>

        <label htmlFor="soil">Soil preference</label>
        <Select
          name="soil"
          id="soil"
          data={soils}
          value={soil}
          keyIndex="id"
          valueIndex="name"
          handleChange={setSoil}
        ></Select>

        <label htmlFor="sun_preference">Sun preference</label>
        <Select
          name="sun_preference"
          id="sun_preference"
          data={sun_preferences}
          value={sun_preference}
          keyIndex="id"
          valueIndex="name"
          handleChange={setSun_preference}
        ></Select>

        <label htmlFor="popular_name">Popular name</label>
        <input
          type="text"
          id="popular_name"
          name="popular_name"
          value={popular_name}
          onChange={(e) => setPopular_name(e.target.value)}
        />

        <label htmlFor="custom_name">Custom name</label>
        <input
          type="text"
          id="custom_name"
          name="custom_name"
          value={custom_name}
          onChange={(e) => setCustom_name(e.target.value)}
        />

        <label htmlFor="complementary_name">Complementary name</label>
        <input
          type="text"
          id="custom_name"
          name="custom_name"
          value={complementary_name}
          onChange={(e) => setComplementary_name(e.target.value)}
        />

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
        />
        <img
          id="blah"
          src={photoFile ? URL.createObjectURL(photoFile) : ""}
          alt="your image"
        />

        <button>ENVIAR</button>
      </form>
    </Container>
  );
};

export default Add;
