import React from "react";
import PropTypes from "prop-types";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { DELETE_ITEM, CHANGE_ITEM } from "../../../services/actions/index";
import ChangeStyle from "./ChangeItem.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function ChangeItem({ item, index }) {
  const ref = React.useRef(null);

  const dispatch = useDispatch();

  const [{ opacity }, drag] = useDrag({
    type: "ingredient",
    item: { item: item, index: index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const deleteElement = () => {
    dispatch({
      type: DELETE_ITEM,
      item,
    });
  };

  const [, drop] = useDrop({
    accept: "ingredient",
    drop(item) {
      changeItem(index, item);
    },
  });

  drag(drop(ref));

  const changeItem = (hoverIndex, item) => {
    dispatch({
      type: CHANGE_ITEM,
      dragItem: item.item,
      dragIndex: item.index,
      hoverIndex: hoverIndex,
    });
  };

  return (
    <li
      ref={ref}
      style={{ opacity }}
      className={`${ChangeStyle.element}  mb-4 pr-2`}
    >
      <span className={`mr-2`}>
        <DragIcon />
      </span>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.src}
        handleClose={() => {
          deleteElement(item);
        }}
      />
    </li>
  );
}

ChangeItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
