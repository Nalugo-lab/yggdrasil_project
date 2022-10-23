import styled from "styled-components";

export const Select_wrapper = styled.div`
  position: relative;
  display: flex;
  width: 400px;
  flex-direction: column;
`;

interface Options_wrapper_interface {
  is_active: Boolean;
}

interface Option_interface {
  selected: Boolean;
}

export const Option = styled.div<Option_interface>`
    color: ${(props: any) => (props.selected ? "red" : "inherit")};

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
  & input {
    width: 100%;
    padding: 6px 8px;
    font-family: "Roboto", sans-serif;
    border-radius: 8px 8px 0 0;
    border: 8px solid #2f3640;
    opacity: ${(props: any) => (props.is_active ? "1" : "0")};
    transition: all 0.4s;
  }
`;

export const Select_window = styled.div<Options_wrapper_interface>`
  background: #2f3640;
  color: #f5f6fa;
  width: 100%;
  transition: all 0.4s;
  border-radius: 8px;
  overflow: hidden;
  order: 1;

  display: ${(props: any) => (props.is_active ? "block" : "none")};
  margin-top: ${(props: any) => (props.is_active ? "8px" : "0px")};
`;

export const Options_wrapper = styled.div<Options_wrapper_interface>`
  max-height: ${(props: any) => (props.is_active ? "240px" : "auto")};
  overflow-y: ${(props: any) => (props.is_active ? "scroll" : "auto")};
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 16px;
`;

export const Selected = styled.div`
  background: #2f3640;
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 8px;
  color: #f5f6fa;
  position: relative;
  order: 0;

  &::after {
    content: "";
    background: url("/icons/arrow_down.svg");
    filter: var(--inverse);
    background-size: contain;
    background-repeat: no-repeat;

    position: absolute;
    height: 100%;
    width: 32px;
    right: 10px;
    top: 5px;

    transition: all 0.4s;
  }
`;
