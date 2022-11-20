import styled from "styled-components";

export const Select_wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

interface Options_wrapper_interface {
  is_active: Boolean;
}

interface Option_interface {
  selected: Boolean;
}

export const Option = styled.div<Option_interface>`
  color: ${(props: any) => (props.selected ? "var(--primary)" : "inherit")};

  & label {
    display: block;
    width: 100%;
  }
  & input {
    display: none;
    width: 100%;
  }
`;

export const Search_wrapper = styled.div<Options_wrapper_interface>`
  padding: 12px;
  & input {
    opacity: ${(props: any) => (props.is_active ? "1" : "0")};
  }
`;

export const Search = styled.input`
  width: 100%;
  padding: 6px 8px;
  font-family: "Roboto", sans-serif;
  border-radius: 8px ;
  transition: all 0.4s;
  position: relative;
  &:focus {
    outline: 3px solid var(--primary);
  }
  &:disabled {
    background-color: var(--gray);
    color: var(--text);
    border: 0;
  }
`;

export const No_data = styled.span`
  margin: auto;
`

export const Select_window = styled.div<Options_wrapper_interface>`
  background: var(--secondary);
  color: var(--text-secondary);
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  order: 1;
  position: absolute;
  top: ${(props: any) => (props.is_active ? "50px" : "-9999px")};
  z-index: 1;
  opacity: ${(props: any) => (props.is_active ? "1" : "0")};
  display: ${(props: any) => (props.is_active ? "block" : "none")};
  margin-top: ${(props: any) => (props.is_active ? "8px" : "0px")};
`;

export const Options_wrapper = styled.div<Options_wrapper_interface>`
  max-height: ${(props: any) => (props.is_active ? "240px" : "auto")};
  overflow-y: ${(props: any) => (props.is_active ? "scroll" : "auto")};

  display: flex;
  flex-direction: column;
  padding: 0 11px 8px 11px;
  gap: 16px;
`;

interface Selected_interface {
  tabIndex: any;
}

export const Selected = styled.div<Selected_interface>`
  background: var(--secondary);
  border-radius: 8px;
  padding: 8px;
  color: var(--text-secondary);
  position: relative;
  order: 0;

  &::after {
    content: "";
    background: url("/icons/arrow_down.svg");
    filter: var(--inverse-inverse);
    background-size: contain;
    background-repeat: no-repeat;

    position: absolute;
    height: 100%;
    width: 32px;
    right: 10px;
    top: 5px;

    transition: all 0.4s;
  }

  &:focus {
    outline: 3px solid var(--primary);
  }
`;
