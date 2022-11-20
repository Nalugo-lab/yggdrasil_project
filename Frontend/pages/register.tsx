import type { NextPage } from "next";
import Router from "next/router";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Basic_input, Filled_button_button, Input_wrapper } from "../components/essential";
import { Container } from "../components/styled/styled-register";

// export async function getStaticProps() {
//   //   const res = await fetch(`http://localhost:3000/django/login/`);
//   //   const base = await res.text();

//   return { props: { base: "hi" } };
// }

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, set_confirm_password] = useState("");

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (password != confirm_password) return;

    const response = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, username, password }),
    });
    if (response.ok) {
      Router.push("/login");
    } else {
      console.log(response);
    }
  }
  return (
    <Container>
      <form method="POST" onSubmit={handleSubmit}>
        <Basic_input
          label="name"
          id="name"
          value={name}
          type="text"
          name="name"
          handleChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />

        <Basic_input
          label="email"
          id="email"
          value={email}
          type="text"
          name="email"
          handleChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />

        <Basic_input
          label="username"
          id="username"
          value={username}
          type="text"
          name="username"
          handleChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        />

        <Basic_input
          label="password"
          id="password"
          value={password}
          type="password"
          name="password"
          handleChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />

        <Basic_input
          label="Confirm password"
          id="confirm_password"
          value={confirm_password}
          type="password"
          name="confirm_password"
          handleChange={(e: ChangeEvent<HTMLInputElement>) => set_confirm_password(e.target.value)}
        />

        <Filled_button_button>ENVIAR</Filled_button_button>
      </form>
    </Container>
  );
};

export default Home;
