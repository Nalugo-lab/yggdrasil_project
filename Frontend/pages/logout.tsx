import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { Container } from "../components/styled/styled-index";

const Home: NextPage = () => {
    const { logout } = useContext(AuthContext);

    useEffect(()=> {
        logout();
    }, [])

  return (
    <Container>

    </Container>
  );
};

export default Home;
