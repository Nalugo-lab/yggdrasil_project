import { CallTracker } from "assert";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Container } from "../components/styled/styled-index";

// export async function getStaticProps() {
//   //   const res = await fetch(`http://localhost:3000/django/login/`);
//   //   const base = await res.text();

//   return { props: { base: "hi" } };
// }

const Home: NextPage = () => {
  return (
    <Container>
      <form method="POST" action="http://localhost:3000/django/auth/register">
        <label htmlFor="name">name</label>
        <input type="text" name="name" />
        <label>email</label>
        <input type="text" name="email" />
        <label>username</label>
        <input type="text" name="username" />
        <label>password</label>
        <input type="text" name="password" />
        <button>ENVIAR</button>
      </form>
    </Container>
  );
};

export default Home;
