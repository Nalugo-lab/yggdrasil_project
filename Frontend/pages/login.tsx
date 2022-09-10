import type { NextPage } from "next";
import { SyntheticEvent, useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { Container } from "../components/styled/styled-index";

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
        <label>username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>ENVIAR</button>
      </form>
    </Container>
  );
};

export default Home;
