import Link from "next/link";
import {
  Footer,
  Header,
  LogoWrapper,
  Navbar,
  Ps,
  RandomLinks,
  SocialMediaIcon,
  ThemeSwitcher,
  ThemeSwitcherWrapper,
  AccountManager,
  AccountManagerButton,
  AccountManagerOptions,
} from "../styled/styled-template";

import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";

interface TemplateProps<P = any> {
  children: P;
  toggleDarkMode(): boolean;
  currentTheme: string;
}

const Template = ({
  children,
  toggleDarkMode,
  currentTheme,
}: TemplateProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const utilsLinks = !isAuthenticated ? (
    <>
      <li>
        <Link href="/register">
          <a>REGISTER</a>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <a>LOGIN</a>
        </Link>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link href="/logout">
          <a>LOGOUT</a>
        </Link>
      </li>
    </>
  );

  return (
    <>
      <Header>
        <Link href="/">
          <a>
            <LogoWrapper>
              <img src="/icons/favicon.png" />
              <span>YggdrasilProject</span>
            </LogoWrapper>
          </a>
        </Link>

        <Navbar>
          <ul>{utilsLinks}</ul>
        </Navbar>
        <ThemeSwitcherWrapper>
          <ThemeSwitcher onClick={toggleDarkMode}>
            <img
              src={
                currentTheme == "dark"
                  ? "/icons/night.svg"
                  : "/icons/flower.svg"
              }
            />
          </ThemeSwitcher>
        </ThemeSwitcherWrapper>
        <AccountManager onMouseEnter={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)} >
          <AccountManagerButton onClick={()=>setIsOpen(!isOpen)} >
            <img src={"/icons/account.svg"} />
          </AccountManagerButton>
          <AccountManagerOptions isOpen={isOpen}>{utilsLinks}</AccountManagerOptions>
        </AccountManager>
      </Header>

      {children}
      <Footer>
        <Ps>
          <p>© 2022-present Hugo Billé Martins. All Rights Reserved.</p>
        </Ps>
        <RandomLinks>
          <SocialMediaIcon href="https://github.com/Sotiris64">
            <img src="/icons/github.svg" alt="github icon" />
          </SocialMediaIcon>
          <SocialMediaIcon href="https://www.instagram.com/_pixelmancer/">
            <img src="/icons/instagram.svg" alt="instagram icon" />
          </SocialMediaIcon>
          <SocialMediaIcon href="https://www.linkedin.com/in/hugo-bill%C3%A9-martins-47615222a/">
            <img src="/icons/linkedin.svg" alt="linkedin icon" />
          </SocialMediaIcon>
        </RandomLinks>
      </Footer>
    </>
  );
};

export default Template;
