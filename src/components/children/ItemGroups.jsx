/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import { FlexContainer, Button } from "../../assets/styles/styles";

const GroupsContainer = styled(FlexContainer)`
  height: 3.2rem;
  border-radius: 5px;
  position: absolute;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  @media (min-width: 800px) {
    height: 3rem;
    position: static;
    top: 0;
    left: 0;
    transform: translateX(0);
  }
`;

const GroupButton = styled(Button)`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) =>
    props.$clicked
      ? "var(--bright-blue)"
      : !props.$clicked && props.$theme
      ? "var(--dark-grayish-blue1)"
      : "var(--very-dark-grayish-blue2)"};
`;

const ItemGroups = ({ theme, setGroup }) => {
  const Buttons = ["all", "active", "completed"];
  const [clicked, setClicked] = useState([false, false, false]);

  const handleClick = (index) => {
    setGroup(Buttons[index]);
    const updatedClicked = clicked.map((btn, i) => i === index);
    setClicked(updatedClicked);
  };

  const GroupsButton = Buttons.map((button, index) => (
    <GroupButton
      key={button}
      onClick={() => handleClick(index)}
      $clicked={clicked[index]}
      $theme={theme}
    >
      {Buttons[index].slice(0, 1).toUpperCase().concat(Buttons[index].slice(1))}
    </GroupButton>
  ));

  return <GroupsContainer $theme={theme}>{GroupsButton}</GroupsContainer>;
};

export default ItemGroups;
