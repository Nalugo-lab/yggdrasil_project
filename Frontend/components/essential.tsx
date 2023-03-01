import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Select_wrapper,
  Select_window,
  Options_wrapper,
  Selected,
  Search_wrapper,
  Option,
  Search,
  No_data,
} from "./styled/styled-select";

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
  text-shadow: none;
  outline-width: 0;
  background-color: var(--primary);
  -webkit-text-decoration-skip: objects;
  text-decoration: none;
  color: var(--text);
  font-size: 1rem;
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
  text-shadow: none;
  outline-width: 0;
  background-color: var(--primary) !important;
  -webkit-text-decoration-skip: objects;
  text-decoration: none;
  color: var(--text);
  font-size: 1rem;
  text-align: center;
`;

interface Label_interface {
  isEmpty: boolean;
}

export const Input_wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Basic_input_input = styled.input`
  height: 64px;
  border-radius: 4px;
  border: none;
  padding: 24px 16px 4px 16px;
  font-size: 16px;
  line-height: 1;
  outline: none;
  box-shadow: none;
  transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
`;

export const Label = styled.label<Label_interface>`
  position: absolute;
  pointer-events: none;
  transform-origin: top left;
  transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  font-size: 16px;
  line-height: 1;
  left: 16px;
  transform: ${({isEmpty}) =>
    isEmpty
      ? "translate(0, 23px) scale(1)"
      : "translate(0, 12px) scale(0.8)"};
  color: ${({isEmpty}) => (isEmpty ? "var(--info)" : "var(--primary)")};

  ${Basic_input_input}:focus ~ & {
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
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  tabIndex: number;
}

export function Basic_input({
  name,
  id,
  type,
  value,
  label,
  handleChange,
  tabIndex,
}: Basic_input_interface) {
  return (
    <Input_wrapper>
      <Basic_input_input
        id={id}
        name={name}
        type={type}
        value={String(value)}
        onChange={handleChange}
        tabIndex={tabIndex}
      />
      <Label htmlFor={id} isEmpty={!value ? true : false}>
        {label}
      </Label>
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
  tabIndex: number;
};

export function Select({
  name,
  id,
  data,
  value,
  tabIndex,
  keyIndex,
  valueIndex,
  handleChange,
}: SelectType) {
  const [is_active, set_is_active] = useState(false);
  const [active_input, set_active_input] = useState("");
  const [search, set_search] = useState("");
  const [selected_id, set_selected_id] = useState(0);
  const [inputRef, setInputFocus] = useFocus();
  const [ref, isComponentVisible, setIsComponentVisible] =
    useComponentVisible(false);

  let amount = -1;
  let selected: any;

  useEffect(() => {
    if (isComponentVisible) {
      set_is_active(true);
    } else {
      set_is_active(false);
    }
  }, [isComponentVisible]);

  return (
    <Select_wrapper ref={ref}>
      <Select_window
        is_active={is_active}
        onKeyDown={(e) => {
          if (e.key == "ArrowDown") {
            if (selected_id < amount) set_selected_id(selected_id + 1);
          } else if (e.key == "ArrowUp") {
            if (selected_id > 0) set_selected_id(selected_id - 1);
          } else if (e.key == "Enter") {
            handleChange({
              key: selected[keyIndex],
              value: selected[valueIndex],
            });
            set_active_input(selected[valueIndex]);
          }
        }}
      >
        <Search_wrapper is_active={is_active}>
          <Search
            autoFocus
            onChange={(e) => {
              set_search(e.target.value);
              set_selected_id(0);
              amount = -1;
            }}
            value={search}
            tabIndex={is_active ? 1 : -1}
            ref={inputRef}
            type="text"
            placeholder="Start Typing..."
            disabled={data ? false : true}
          />
        </Search_wrapper>

        <Options_wrapper
          is_active={is_active}
          onClick={(e: any) => {
            if (e.target.tagName == "INPUT") {
              handleChange({ key: e.target.value, value: e.target.id });
              set_active_input(e.target.id);
              setIsComponentVisible(false);
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
                      tabIndex={0}
                    />
                    <label htmlFor={option[valueIndex]}>
                      {option[valueIndex]}
                    </label>
                  </Option>
                );
              }
            })}
          {!data && <No_data>No data available yet!</No_data>}
        </Options_wrapper>
      </Select_window>

      <Selected
        tabIndex={tabIndex}
        onClick={() => {
          if (is_active) {
            setIsComponentVisible(false);
          } else setInputFocus();
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            if (is_active) {
              setIsComponentVisible(false);
            } else setInputFocus();
          }
        }}
      >
        {active_input ? active_input : "Select an option"}
      </Selected>
    </Select_wrapper>
  );
}

const useFocus = () => {
  const htmlElRef: any = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

function useComponentVisible(initialIsVisible: any) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref: any = useRef(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.explicitOriginalTarget)) {
      setIsComponentVisible(false);
    } else {
      setIsComponentVisible(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return [ref, isComponentVisible, setIsComponentVisible];
}
