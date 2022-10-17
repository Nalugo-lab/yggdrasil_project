import { CallTracker } from "assert";
import type { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Container } from "../components/styled/styled-index";

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
  const [ConfirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (password != ConfirmPassword) return;

    const response = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json'
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
        <label htmlFor="name">name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label>email</label>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>username</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>password</label>
        <input
          type="text"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm password</label>
        <input
          type="text"
          name="confirm_password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button>ENVIAR</button>
      </form>
    </Container>
  );
};

export default Home;
