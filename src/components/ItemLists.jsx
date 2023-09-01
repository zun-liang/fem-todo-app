import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import Check from "../assets/images/icon-check.svg";
import Cross from "../assets/images/icon-cross.svg";
import {
  BackgroundColorSwitch,
  CheckBox,
  FlexContainer,
  GridContainer,
} from "../assets/styles/styles";

const ListsContainer = styled(FlexContainer)`
  max-width: 600px;
  background-color: unset;
`;

const Icon = styled.img`
  width: 13px;
  height: 13px;
  cursor: pointer;
  @media (min-width: 800px) {
    opacity: 0;
  }
`;

const ListContainer = styled(GridContainer)`
  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  height: 3.2rem;
  border-bottom: 1px solid
    ${(props) =>
      props.$theme
        ? "var(--very-light-grayish-blue)"
        : "var(--very-dark-grayish-blue3)"};
  padding: 0 20px;
  grid-template-columns: 20px 1fr 20px;
  column-gap: 10px;
  @media (min-width: 800px) {
    column-gap: 20px;
    height: 3.5rem;
    &:hover ${Icon} {
      opacity: 1;
    }
  }
`;

const CheckBoxInLists = styled(CheckBox)`
  border: ${(props) =>
    props.$checked
      ? "none"
      : props.$theme
      ? "1px solid var(--light-grayish-blue1)"
      : "1px solid var(--very-dark-grayish-blue3)"};
  background: ${(props) =>
    props.$checked ? `url(${Check}), var(--gradient)` : "white"};
  background-repeat: no-repeat;
  background-position: 50%;
  background-color: ${BackgroundColorSwitch};
  cursor: pointer;
  &:hover {
    position: relative;
    border-radius: 50%;
    border: none;
    background: ${(props) =>
      props.$checked ? `url(${Check}), var(--gradient)` : "var(--gradient)"};
    background-repeat: no-repeat;
    background-position: 50%;
    &::after {
      content: "";
      width: 16px;
      height: 16px;
      border-radius: 50%;
      position: absolute;
      margin: 1px;
      background: ${(props) =>
        props.$checked
          ? `url(${Check}), var(--gradient)`
          : BackgroundColorSwitch};
      background-repeat: no-repeat;
      background-position: 50%;
    }
  }
`;

const Item = styled.p`
  font-size: 0.8rem;
  color: ${(props) =>
    props.$checked && props.$theme
      ? "var(--light-grayish-blue1)"
      : !props.$checked && props.$theme
      ? "var(--very-dark-grayish-blue1)"
      : props.$checked && !props.$theme
      ? "var(--dark-grayish-blue2)"
      : "var(--light-grayish-blue2)"};
  text-decoration: ${(props) => (props.$checked ? "line-through" : "none")};
  cursor: pointer;
  @media (min-width: 800px) {
    font-size: 1rem;
  }
`;

const ItemLists = ({
  theme,
  storedItems,
  setStoredItems,
  activeItems,
  setActiveItems,
  completedItems,
  setCompletedItems,
  group,
}) => {
  const [checkedIds, setCheckedIds] = useState(
    completedItems.map((item) => item.id) || []
  );

  const toggleCheck = (item) => {
    const checkedId = item.id;
    const updatedCheckedIds = checkedIds.includes(checkedId)
      ? checkedIds.filter((id) => id !== checkedId)
      : [...checkedIds, checkedId];

    const updatedStoredItems = storedItems.map((item) =>
      item.id === checkedId
        ? {
            ...item,
            status: checkedIds.includes(checkedId) ? "unchecked" : "checked",
          }
        : item
    );

    const updatedActiveItems = updatedStoredItems.filter(
      (item) => item.status === "unchecked"
    );

    const updatedCompletedItems = updatedStoredItems.filter(
      (item) => item.status === "checked"
    );

    setCheckedIds(updatedCheckedIds);
    setStoredItems(updatedStoredItems);
    setActiveItems(updatedActiveItems);
    setCompletedItems(updatedCompletedItems);
    localStorage.setItem("all", JSON.stringify(updatedStoredItems));
    localStorage.setItem("active", JSON.stringify(updatedActiveItems));
    localStorage.setItem("completed", JSON.stringify(updatedCompletedItems));
  };

  const clearSingle = (item) => {
    const removedId = item.id;
    const updatedStoredItems = storedItems.filter(
      (item) => item.id !== removedId
    );
    const updatedActiveItems = updatedStoredItems.filter(
      (item) => item.status === "unchecked"
    );
    const updatedCompletedItems = updatedStoredItems.filter(
      (item) => item.status === "checked"
    );
    setStoredItems(updatedStoredItems);
    setActiveItems(updatedActiveItems);
    setCompletedItems(updatedCompletedItems);
    localStorage.setItem("all", JSON.stringify(updatedStoredItems));
    localStorage.setItem("active", JSON.stringify(updatedActiveItems));
    localStorage.setItem("completed", JSON.stringify(updatedCompletedItems));
  };

  const generateToDoItem = (item, index) => {
    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
          <ListContainer
            $theme={theme}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CheckBoxInLists
              $checked={checkedIds.includes(item.id)}
              onClick={() => toggleCheck(item)}
              $theme={theme}
            />
            <Item $checked={checkedIds.includes(item.id)} $theme={theme}>
              {item.content}
            </Item>
            <Icon
              src={Cross}
              alt="cross icon"
              onClick={() => clearSingle(item)}
            />
          </ListContainer>
        )}
      </Draggable>
    );
  };

  const generateToDoItems = (items) =>
    items.map((item, index) => generateToDoItem(item, index));

  const ToDoItems = {
    all: generateToDoItems(storedItems),
    active: generateToDoItems(activeItems),
    completed: generateToDoItems(completedItems),
  };

  const handleDragEnd = (result) => {
    const targetItems =
      group === "all"
        ? storedItems
        : group === "active"
        ? activeItems
        : completedItems;

    const copyItems = [...targetItems];
    const [reorderedItem] = copyItems.splice(result.source.index, 1);
    copyItems.splice(result.destination.index, 0, reorderedItem);

    if (group === "all") setStoredItems(copyItems);
    else if (group === "active") setActiveItems(copyItems);
    else setCompletedItems(copyItems);

    localStorage.setItem(group, JSON.stringify(copyItems));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="lists">
        {(provided) => (
          <ListsContainer
            $theme={theme}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {ToDoItems[group]}
            {provided.placeholder}
          </ListsContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ItemLists;
