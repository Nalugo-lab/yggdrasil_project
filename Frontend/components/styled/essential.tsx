import { useRef, useState } from "react";
import styled from "styled-components";
import {
  Select_wrapper,
  Select_window,
  Options_wrapper,
  Selected,
  Search_wrapper,
  Option,
} from "./styled-select";

export const Outlined_a_button = styled.a`
  font-size: 1.125em;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  display: inline-block;
  padding: 6px 24px;
  border: 2px solid var(--text);
  font-weight: 500;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  margin: 15px;
  text-shadow: none;
  outline-width: 0;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
  text-decoration: none;
  color: var(--text);
  font-size: 16px;
  text-align: center;
`;

export const Filled_a_button = styled.a`
  font-size: 1.125em;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  display: inline-block;
  padding: 6px 24px;
  border: 2px solid var(--primary);
  font-weight: 500;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  margin: 15px;
  text-shadow: none;
  outline-width: 0;
  background-color: var(--primary);
  -webkit-text-decoration-skip: objects;
  text-decoration: none;
  color: var(--text);
  font-size: 16px;
  text-align: center;
`;

export const Filled_button_button = styled.button`
  font-size: 1.125em;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  display: inline-block;
  padding: 6px 24px;
  border: 2px solid var(--primary);
  font-weight: 500;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  margin: 15px;
  text-shadow: none;
  outline-width: 0;
  background-color: var(--primary) !important;
  -webkit-text-decoration-skip: objects;
  text-decoration: none;
  color: var(--text);
  font-size: 16px;
  text-align: center;
`;

interface Input_wrapper_interface {
  isEmpty: boolean;
}

export const Input_wrapper = styled.div<Input_wrapper_interface>`
  position: relative;
  display: flex;
  flex-direction: column;

  & label {
    position: absolute;
    pointer-events: none;
    transform-origin: top left;
    transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    font-size: 16px;
    line-height: 1;
    left: 16px;
    transform: ${(props: any) =>
      props.isEmpty
        ? "translate(0, 23px) scale(1)"
        : "translate(0, 12px) scale(0.8)"};
    color: ${(props: any) =>
      props.isEmpty ? "var(--info)" : "var(--primary)"};
  }

  & input {
    height: 64px;
    border-radius: 4px;
    border: none;
    padding: 24px 16px 4px 16px;
    font-size: 16px;
    line-height: 1;
    outline: none;
    box-shadow: none;
    transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }

  &:focus-within label {
    transform: translate(0, 12px) scale(0.8);
    color: var(--primary);
  }
`;

interface Basic_input_interface {
  name: string;
  id: string;
  type: string;
  label: string;
  value: string;
  handleChange: any;
}

export function Basic_input({
  name,
  id,
  type,
  value,
  label,
  handleChange,
}: Basic_input_interface) {
  return (
    <Input_wrapper isEmpty={!value ? true : false}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={String(value)}
        onChange={handleChange}
      />
    </Input_wrapper>
  );
}

type SelectType = {
  name: string;
  id: string;
  data: any;
  value: string | undefined;
  keyIndex: string | number;
  valueIndex: string | number;
  handleChange: any;
};

export function Select({
  name,
  id,
  data,
  value,
  keyIndex,
  valueIndex,
  handleChange,
}: SelectType) {
  const [is_active, set_is_active] = useState(false);
  const [active_input, set_active_input] = useState("");
  const [search, set_search] = useState("");
  const [selected_id, set_selected_id] = useState(0);
  const [inputRef, setInputFocus] = useFocus();

  let amount = -1;
  let selected: any;
  return (
    <Select_wrapper>
      <Select_window
        is_active={is_active}
        onKeyDown={(e) => {
          if (e.code == "ArrowDown") {
            if (selected_id < amount) set_selected_id(selected_id + 1);
          } else if (e.code == "ArrowUp") {
            if (selected_id > 0) set_selected_id(selected_id - 1);
          } else if (e.code == "Enter") {
            handleChange(selected[keyIndex]);
            set_active_input(selected[valueIndex]);
            set_is_active(!is_active);
          }
        }}
      >
        <Search_wrapper is_active={is_active}>
          {/* <Basic_input
            handleChange={(e: any) => set_search(e.target.value)}
            value={search}
            type="text"
            label="search"
            id="search"
            name="search"
          /> */}
          <input
            autoFocus
            onChange={(e) => {
              set_search(e.target.value);
              set_selected_id(0);
              amount = -1;
            }}
            value={search}
            ref={inputRef}
            type="text"
            placeholder="Start Typing..."
          />
        </Search_wrapper>

        <Options_wrapper
          is_active={is_active}
          onClick={(e: any) => {
            if (e.target.tagName == "INPUT") {
              handleChange(e.target.value);
              set_active_input(e.target.id);
              set_is_active(!is_active);
            }
          }}
        >
          {data &&
            data.map((option: any, index: number) => {
              if (
                option[valueIndex]
                  .toLowerCase()
                  .indexOf(search.toLowerCase()) != -1
              ) {
                amount++;
                // Ia ser muito problema criar uma variável só para verificar denovo o statement ali em baixo, preferi repetir a operação de == mesmo. E agora estou escrevendo um textão para justificar essa coisa que está me pertubando muito, assim como aquele array no sistema de enfermagem que n está dentro de uma função e nunca vai ser coletado pelo garbage colector
                if (selected_id == amount) selected = option;

                return (
                  <Option
                    key={`${option[valueIndex]}-${option[keyIndex]}`}
                    selected={selected_id == amount ? true : false}
                  >
                    <input
                      type="checkbox"
                      id={option[valueIndex]}
                      value={option[keyIndex]}
                    />
                    <label htmlFor={option[valueIndex]}>
                      {option[valueIndex]}
                    </label>
                  </Option>
                );
              }
            })}
        </Options_wrapper>
      </Select_window>

      <Selected
        onClick={() => {
          set_is_active(!is_active);
          setInputFocus();
        }}
      >
        {active_input ? active_input : "Choose your champion"}
      </Selected>
    </Select_wrapper>
  );
}

const useFocus = () => {
  const htmlElRef: any = useRef(null);
  const setFocus = () => {
    console.log(htmlElRef.current)
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};
