/* eslint-disable react/prop-types */
import styled from "styled-components";
import { TextColorSwitch } from "../assets/styles/styles";

const P = styled.p`
  color: ${TextColorSwitch};
  text-align: center;
  margin: calc(50px + 4rem) auto 50px;
  @media (min-width: 800px) {
    margin: 30px auto 0;
    font-size: 0.8rem;
  }
`;

const Reorder = ({ theme }) => {
  return <P $theme={theme}>Drag and drop to reorder list</P>;
};

export default Reorder;
