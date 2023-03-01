import type { NextPage } from "next";
import { ChangeEvent, SyntheticEvent, useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { Basic_input, Filled_button_button } from "../components/essential";
import { Container } from "../components/styled/styled-login";

const Home: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  async function submitForm(e: SyntheticEvent) {
    e.preventDefault();
    login({
      username,
      password,
    });
  }

  return (
    <Container>
      <form method="POST" onSubmit={submitForm}>
        <Basic_input
          type="text"
          id="id"
          label="username"
          name="username"
          value={username}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          tabIndex={0}
        />

        <Basic_input
          type="password"
          id="id"
          label="password"
          name="password"
          value={password}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          tabIndex={0}
        />

        <Filled_button_button>Log in</Filled_button_button>
      </form>
    </Container>
  );
};

export default Home;
