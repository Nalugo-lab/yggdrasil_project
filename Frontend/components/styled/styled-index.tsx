import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  padding: 16px;
  flex-direction: column;
  gap: 16px;
  background-color: var(--background-secondary);
`;

export const Description = styled.p`
  font-size: 1.5rem;
  
`

export const Introduction = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
line-height: 1.05;
letter-spacing: -0.5px;
`
export const Features = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const Feature = styled.div`
  &:nth-child(1),
  &:nth-child(2){
    border-right: 2px solid var(--text);
  }
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  img{
    width: 120px;
    height: 120px;
  }
  & a {
    margin-top: auto;
  }
`;

export const Hero_wrapper = styled.div`
  max-width: 1300px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 96px;
  align-items: center;
`;

export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 52px;
`;

export const Hero_main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

`;

export const Hero_images = styled.div`
width: 100%;
height: 100%;
`


export const Hero_images_wrapper = styled.div`
position: relative;
height: 100%;
overflow: hidden;

img:nth-child(1){
  top: 0%;
  left: 0%;
}

img:nth-child(2){
  top: 30%;
  left: 30%;
}

img:nth-child(3){
  top: 70%;
  left: 0%;
}

img {
  position: absolute;
  width: 300px
  
}`



export const Hero_buttons = styled.div``;
