import { useState } from "react";
import styled from "styled-components";

import BGDesktopDark from "./assets/images/bg-desktop-dark.jpg";
import BGDesktopLight from "./assets/images/bg-desktop-light.jpg";
import BGMobileDark from "./assets/images/bg-mobile-dark.jpg";
import BGMobileLight from "./assets/images/bg-mobile-light.jpg";
import { FlexContainer } from "./assets/styles/styles";
import FunctionalList from "./components/FunctionalList";
import ItemLists from "./components/ItemLists";
import NewItem from "./components/NewItem";
import Reorder from "./components/Reorder";

import "./App.css";

const AppContainer = styled(FlexContainer)`
  min-height: 100vh;
  padding: 50px 25px 25px;
  gap: 1.1rem;
  background-image: ${(props) =>
    props.$theme ? `url(${BGMobileLight})` : `url(${BGMobileDark})`};
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: ${(props) =>
    props.$theme ? "var(--very-light-gray)" : "var(--very-dark-blue)"};
  @media (min-width: 800px) {
    padding: 80px 25px 50px;
    gap: 1.3rem;
    background-image: ${(props) =>
      props.$theme ? `url(${BGDesktopLight})` : `url(${BGDesktopDark})`};
    background-repeat: no-repeat;
    background-size: 100%;
  }
`;

const App = () => {
  const date = new Date();
  const current = date.getHours();
  const isDayTime = current > 5 && current < 19;

  const [theme, setTheme] = useState(isDayTime);

  const [storedItems, setStoredItems] = useState(
    () => JSON.parse(localStorage.getItem("all")) || []
  );

  const [activeItems, setActiveItems] = useState(
    () => JSON.parse(localStorage.getItem("active")) || []
  );

  const [completedItems, setCompletedItems] = useState(
    () => JSON.parse(localStorage.getItem("completed")) || []
  );

  const [group, setGroup] = useState("all");

  return (
    <AppContainer as="main" $theme={theme}>
      <NewItem
        theme={theme}
        setTheme={setTheme}
        storedItems={storedItems}
        setStoredItems={setStoredItems}
        activeItems={activeItems}
        setActiveItems={setActiveItems}
      />

      <ItemLists
        theme={theme}
        storedItems={storedItems}
        setStoredItems={setStoredItems}
        activeItems={activeItems}
        setActiveItems={setActiveItems}
        completedItems={completedItems}
        setCompletedItems={setCompletedItems}
        group={group}
      />

      <FunctionalList
        theme={theme}
        setStoredItems={setStoredItems}
        activeItems={activeItems}
        setCompletedItems={setCompletedItems}
        setGroup={setGroup}
      />

      <Reorder theme={theme} />
    </AppContainer>
  );
};

export default App;
