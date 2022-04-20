import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientStyle from "./Ingredient.module.css";
import { ItemContext } from "../../../services/productsContext";

export default function Ingredient({ src, name, price, onCardClick }) {
  return (
    <li className={`${IngredientStyle.head} mt-6 mb-8`}>
      <img
        src={src}
        alt="ingridienImage"
        className={`mb-1`}
        onClick={onCardClick}
      />
      <div className={`${IngredientStyle.priceWrap} mb-1`}>
        <p
          className={`${IngredientStyle.price} mr-2 text text_type_digits-default`}
        >
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${IngredientStyle.name} text text_type_main-default`}>
        {name}
      </p>
      <div>
        <Counter count={0} size="default" />
      </div>
    </li>
  );
}

Ingredient.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
