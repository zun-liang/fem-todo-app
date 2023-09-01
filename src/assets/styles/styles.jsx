import styled from "styled-components";

export const BackgroundColorSwitch = (props) =>
  props.$theme ? "white" : "var(--very-dark-desaturated-blue)";

export const TextColorSwitch = (props) =>
  props.$theme ? "var(--dark-grayish-blue1)" : "var(--very-dark-grayish-blue2)";

export const InputButtonColorSwitch = (props) =>
  props.$theme
    ? "var(--very-dark-grayish-blue1)"
    : "var(--light-grayish-blue2)";

export const Button = styled.button`
  border: none;
  font-family: "Josefin Sans", sans-serif;
  font-size: 0.8rem;
  background-color: ${BackgroundColorSwitch};
  cursor: pointer;
  &:hover {
    color: ${InputButtonColorSwitch};
  }
`;

export const CheckBox = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
`;

export const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${BackgroundColorSwitch};
`;

export const GridContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  background-color: ${BackgroundColorSwitch};
`;
