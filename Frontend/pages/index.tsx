import type { NextPage } from "next";
import {
  Container,
  Features,
  Feature,
  Title_wrapper,
} from "../components/styled/styled-index";
import {
  Filled_a_button,
  Outlined_a_button,
} from "../components/styled/essential";

const Home: NextPage = () => {
  return (
    <Container>
      <Title_wrapper>
        <h1>Yggdrasil Project</h1>
        <h2>
          The Yggdrasil Project is a website aimed to help you catalog, register
          and keep track of your plants
        </h2>
        <div>
          <Filled_a_button href="/register">Get Started!</Filled_a_button>
          <Outlined_a_button href="/login">Already an user</Outlined_a_button>
        </div>
      </Title_wrapper>
      <Features>
        <Feature>
          <img src="/v0.5-rc/images/helmet.svg" alt="Type Safe Icon (helmet)" />
          <h3>Type Safe</h3>
          <p>
            From request to response Rocket ensures that your types mean
            something.
          </p>
          <Outlined_a_button href="/v0.5-rc/overview/#how-rocket-works">
            Learn More
          </Outlined_a_button>
        </Feature>

        <Feature>
          <img src="/v0.5-rc/images/helmet.svg" alt="Type Safe Icon (helmet)" />
          <h3>Type Safe</h3>
          <p>
            From request to response Rocket ensures that your types mean
            something.
          </p>
          <Outlined_a_button href="/v0.5-rc/overview/#how-rocket-works">
            Learn More
          </Outlined_a_button>
        </Feature>

        <Feature>
          <img src="/v0.5-rc/images/helmet.svg" alt="Type Safe Icon (helmet)" />
          <h3>Type Safe</h3>
          <p>
            From request to response Rocket ensures that your types mean
            something.
          </p>
          <Outlined_a_button href="/v0.5-rc/overview/#how-rocket-works">
            Learn More
          </Outlined_a_button>
        </Feature>

        <Feature>
          <img src="/v0.5-rc/images/helmet.svg" alt="Type Safe Icon (helmet)" />
          <h3>Type Safe</h3>
          <p>
            From request to response Rocket ensures that your types mean
            something.
          </p>
          <Outlined_a_button href="/v0.5-rc/overview/#how-rocket-works">
            Learn More
          </Outlined_a_button>
        </Feature>
      </Features>
    </Container>
  );
};

export default Home;
