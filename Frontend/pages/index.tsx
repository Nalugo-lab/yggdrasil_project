import type { NextPage } from "next";
import {
  Container,
  Features,
  Feature,
  Hero_wrapper,
  Hero,
  Hero_main,
  Hero_buttons,
  Introduction,
  Description,
  Hero_images,
  Hero_images_wrapper
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
            <Introduction>The all-in-one solution for your gardening needs</Introduction>
            <Description>
              Yggdrasil Project is a website aimed to help you catalog,
              register and keep track of your plants 
            </Description>
            <Hero_buttons>
              <Filled_a_button href="/register">Get Started!</Filled_a_button>
              <Outlined_a_button href="/login">
                Already an user
              </Outlined_a_button>
            </Hero_buttons>
          </Hero_main>
          <Hero_images>
            <Hero_images_wrapper>
          <img src="20230219_114652.jpg" alt="flower pot with a succulent on top" />
          <img src="20230219_114620.jpg" alt="flower pot with a succulent on top" />
          <img src="20230219_120349.jpg" alt="flower pot with a succulent on top" />
          </Hero_images_wrapper>
          </Hero_images>
        </Hero_wrapper>
      </Hero>

      <Features>
        <Feature>
          <img src="/icons/alive_plant.png" alt="Type Safe Icon (helmet)" />
          <h3>Catalog your plants</h3>
          <p>
            We can help you catalog your plants, upload images and keep track of its growth!
          </p>

        </Feature>

        <Feature>
          <img src="/icons/dead_plant.png" alt="Type Safe Icon (helmet)" />
          <h3>Rest in peace...</h3>
          <p>
            Register everything that happens in your plant's life cycle
            </p>

        </Feature>

        <Feature>
          <img src="/icons/meu_filho.png" alt="Type Safe Icon (helmet)" />
          <h3>Make it your own</h3>
          <p>
            Bring personality to your plants by adding custom names, titles and plaques
          </p>

        </Feature>

      </Features>

    </Container>
  );
};

export default Home;
