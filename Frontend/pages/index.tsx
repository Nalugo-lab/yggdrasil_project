import type { NextPage } from "next";
import {
  Container,
  Features,
  Feature,
  Hero_wrapper,
  Hero,
  Hero_main,
  Hero_buttons,
} from "../components/styled/styled-index";
import {
  Filled_a_button,
  Outlined_a_button,
} from "../components/essential";

const Home: NextPage = () => {
  return (
    <Container>
      <Hero>
        <Hero_wrapper>
          <Hero_main>
            <h1>The all-in-one solution for your gardening needs</h1>
            <h2>
              Yggdrasil Project is a website aimed to help you catalog,
              register and keep track of your plants anywhere, 24/7. 
            </h2>
            <Hero_buttons>
              <Filled_a_button href="/register">Get Started!</Filled_a_button>
              <Outlined_a_button href="/login">
                Already an user
              </Outlined_a_button>
            </Hero_buttons>
          </Hero_main>
          <img src="suculentates.jpeg" alt="flower pot with a succulent on top" />
        </Hero_wrapper>
      </Hero>
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
