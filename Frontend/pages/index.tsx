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
            <h3>
              Yggdrasil Project is a website aimed to help you catalog,
              register and keep track of your plants 
            </h3>
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
          <img src="/icons/alive_plant.png" alt="Type Safe Icon (helmet)" />
          <h3>Catalog your plants</h3>
          <p>
            You can catalog your plants, upload images and keep track of its growth, register soil information, luminosity regime, last watering and fertilization dates, and much more! 
          </p>

        </Feature>

        <Feature>
          <img src="/icons/dead_plant.png" alt="Type Safe Icon (helmet)" />
          <h3>Rest in peace...</h3>
          <p>
            If something bad happens to your plant (we hope this never happens) you can mark it as dead. We can provide some info to help you on your gardening journey 
          </p>

        </Feature>

        <Feature>
          <img src="/v0.5-rc/images/helmet.svg" alt="Type Safe Icon (helmet)" />
          <h3>Type Safe</h3>
          <p>
            From request to response Rocket ensures that your types mean
            something.
          </p>

        </Feature>

        <Feature>
          <img src="/v0.5-rc/images/helmet.svg" alt="Type Safe Icon (helmet)" />
          <h3>Type Safe</h3>
          <p>
            From request to response Rocket ensures that your types mean
            something.
          </p>

        </Feature>
      </Features>

    </Container>
  );
};

export default Home;
