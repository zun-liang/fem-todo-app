/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  GridContainer,
  TextColorSwitch,
} from "../assets/styles/styles";
import ItemGroups from "./children/ItemGroups";

const LastContainer = styled(GridContainer)`
  max-width: 600px;
  height: 3.2rem;
  padding: 0 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  position: relative;
  margin-top: -1.1rem;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  @media (min-width: 800px) {
    position: static;
    grid-template-columns: 1fr 1fr 1fr;
    height: 3rem;
    margin-top: -1.3rem;
  }
`;

const P = styled.p`
  font-size: 0.8rem;
  color: ${TextColorSwitch};
`;

const ClearButton = styled(Button)`
  justify-self: end;
  font-weight: 400;
  color: ${TextColorSwitch};
`;

const FunctionalList = ({
  theme,
  setStoredItems,
  activeItems,
  setCompletedItems,
  setGroup,
}) => {
  const [clearCompletedClick, setClearCompletedClick] = useState(0);
  const handleClearCompleted = () => setClearCompletedClick((prev) => prev + 1);

  useEffect(() => {
    let removing = true;
    if (removing && clearCompletedClick >= 1) {
      setStoredItems(activeItems);
      setCompletedItems([]);
      localStorage.setItem("all", JSON.stringify(activeItems));
      localStorage.setItem("completed", JSON.stringify([]));
    }
    return () => (removing = false);
  }, [clearCompletedClick]);

  const LeftItems = activeItems.length;

  return (
    <LastContainer $theme={theme}>
      <P $theme={theme}>{LeftItems} items left</P>
      <ItemGroups theme={theme} setGroup={setGroup} />
      <ClearButton onClick={handleClearCompleted} $theme={theme}>
        Clear Completed
      </ClearButton>
    </LastContainer>
  );
};

export default FunctionalList;
