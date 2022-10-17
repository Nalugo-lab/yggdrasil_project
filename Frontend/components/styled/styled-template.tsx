import styled from "styled-components";

export const ThemeSwitcher = styled.button`
  color: var(--text);
`;

export const AccountManager = styled.div`
  position: relative;
`;

export const IconWrapper = styled.div`
  width: 24px;
  filter: var(--inverse-inverse);
`

interface AccountManagerOptionsProps {
  isOpen: boolean;
}

export const AccountManagerOptions = styled.ul<AccountManagerOptionsProps>`
  display: ${(props: any) => (props.isOpen ? "flex" : "none")};
  position: absolute;
  padding: 8px;
  margin-top: 32px;
  right: 50%;
  width: 256px;
  flex-direction: column;
  gap: 8px;
  background-color: var(--background-primary);
  border: 6px solid (--text-secondary);

  transform: translateX(50%);
`;

export const AccountManagerButton = styled.div`
  & img {
    filter: var(--inverse-inverse);
  }
`;

export const ThemeSwitcherWrapper = styled.div`
  /* margin-right: auto; */
  display: flex;
  filter: var(--inverse-inverse);
`;

export const Header = styled.header`
  display: flex;
  color: var(--text-secondary);
  width: 100%;
  margin: 16px auto;
  padding: 0 32px;
  align-items: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  max-width: 975px;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 24px;

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  & img {
    width: 50px;
    filter: var(--inverse-inverse);
  }
  & span {
    font-size: var(--font-size-3xl);
  }
  & a {
    color: inherit;
  }
`;

export const Navbar = styled.nav`
  display: flex;
  gap: 22px;
  justify-content: flex-end;
  vertical-align: middle;
  align-items: center;
  flex-grow: 1;
  vertical-align: middle;
`;

export const Footer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-top: 16px;
  padding: 24px 32px;
  background-color: var(--background-secondary);
`;
export const RandomLinks = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-end;
`;
export const Ps = styled.div`
  display: flex;
`;
export const SocialMediaIcon = styled.a`
  img {
    width: 32px;
    filter: var(--inverse);
  }
`;
