import { nanoid } from "nanoid";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";

import Moon from "../assets/images/icon-moon.svg";
import Sun from "../assets/images/icon-sun.svg";
import {
  BackgroundColorSwitch,
  CheckBox,
  FlexContainer,
  GridContainer,
  InputButtonColorSwitch,
} from "../assets/styles/styles";

const Container = styled(FlexContainer)`
  max-width: 600px;
  background-color: unset;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  @media (min-width: 800px) {
    gap: 40px;
  }
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  letter-spacing: 10px;
  @media (min-width: 800px) {
    font-size: 2.3rem;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  @media (min-width: 800px) {
    width: 28px;
    height: 28px;
  }
`;

const InputContainer = styled(GridContainer)`
  height: 3.1rem;
  border-radius: 5px;
  padding: 0.25rem 20px;
  grid-template-columns: 18px 1fr;
  gap: 10px;
  @media (min-width: 800px) {
    height: 3.5rem;
    gap: 20px;
  }
`;

const CheckBoxInNew = styled(CheckBox)`
  border: 1px solid
    ${(props) =>
      props.$theme
        ? "var(--light-grayish-blue1)"
        : "var(--very-dark-grayish-blue3)"};
`;

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  border: none;
  outline: none;
  font-family: "Josefin Sans", sans-serif;
  font-size: 0.9rem;
  color: ${InputButtonColorSwitch};
  background-color: ${BackgroundColorSwitch};
  &::placeholder {
    font-family: "Josefin Sans", sans-serif;
    font-size: 0.8rem;
    color: ${(props) =>
      props.$theme ? "var(--dark-grayish-blue1)" : "var(--dark-grayish-blue2)"};
  }
  @media (min-width: 800px) {
    font-size: 1rem;
    &::placeholder {
      font-size: 1rem;
    }
  }
`;

const NewItem = ({
  theme,
  setTheme,
  storedItems,
  setStoredItems,
  activeItems,
  setActiveItems,
}) => {
  const [newItem, setNewItem] = useState({
    content: "",
    status: "unchecked",
  });

  const [enterClick, setEnterClick] = useState(0);

  const handleTheme = () => setTheme((prev) => !prev);

  const handleChange = (e) =>
    setNewItem((prev) => {
      return {
        ...prev,
        content: e.target.value,
      };
    });

  useEffect(() => {
    const newItemInput = document.getElementById("new-item");
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        setEnterClick((prev) => prev + 1);
        setNewItem((prev) => {
          return {
            id: nanoid(),
            ...prev,
          };
        });
      }
    };
    newItemInput.addEventListener("keypress", handleKeyPress);
    return () => newItemInput.removeEventListener("keypress", handleKeyPress);
  }, []);

  useEffect(() => {
    let setting = true;
    if (setting && newItem.content !== "") {
      const updatedStoredItems = [newItem, ...storedItems];
      const updatedActiveItems = [newItem, ...activeItems];
      setStoredItems(updatedStoredItems);
      setActiveItems(updatedActiveItems);
      localStorage.setItem("all", JSON.stringify(updatedStoredItems));
      localStorage.setItem("active", JSON.stringify(updatedActiveItems));
    }
    return () => {
      setting = false;
      setNewItem({
        content: "",
        status: "unchecked",
      });
    };
  }, [enterClick]);

  return (
    <Container>
      <Title>TODO</Title>
      <Icon src={theme ? Moon : Sun} alt="theme icon" onClick={handleTheme} />
      <InputContainer $theme={theme}>
        <CheckBoxInNew $theme={theme} />
        <Input
          type="text"
          placeholder="Create a new todo..."
          id="new-item"
          name="new-item"
          value={newItem.content}
          onChange={handleChange}
          $theme={theme}
        />
      </InputContainer>
    </Container>
  );
};

export default NewItem;
