import React, { useContext, useState } from "react";
import Ingredient from "../Ingredient/Ingredient";
import List from "./IngredientsList.module.css";
import { ingredientsPropTypes } from "../../../utils/constants";
import { HandleContext, DataContext } from "../../../services/productsContext";

export default function IngredientsList() {
  const state = useContext(DataContext);
  const data = state.state.burgerData;
  const setIngredient = useContext(HandleContext);
  const handleElement = (elem) => {
    if (elem) {
      setIngredient(elem);
    }
  };
  const bun = data.filter((element) => element.type === "bun");
  const main = data.filter((element) => element.type === "main");
  const sauce = data.filter((element) => element.type === "sauce");
  /*Я примерно понимаю как реализовать контекст для компонента Ingriditen, 
  но мне кажется на данном моменте это только больше усложнит код, 
  чем добавит ему простоты. Если это не так, то исправлю ^_^ */
  return (
    <>
      <section className={List.head}>
        <p className={`text text_type_main-medium mt-10`}>Булки</p>
        <ul className={`${List.item} ml-4 mr-4`}>
          {bun.map((item) => (
            <Ingredient
              name={item.name}
              key={item._id}
              src={item.image}
              price={item.price}
              onCardClick={() =>
                handleElement(item)
              } /*зараза)))это гениально)Спасибо)ы */
            />
          ))}
        </ul>
      </section>
      <section className={List.head}>
        <p className={`text text_type_main-medium mt-10`}>Начинки</p>
        <ul className={`${List.item} ml-4 mr-4`}>
          {main.map((item) => (
            <Ingredient
              name={item.name}
              key={item._id}
              src={item.image}
              price={item.price}
              onCardClick={() =>
                handleElement(item)
              } /*зараза)))это гениально)Спасибо)ы */
            />
          ))}
        </ul>
      </section>
      <section className={List.head}>
        <p className={`text text_type_main-medium mt-10`}>Соусы</p>
        <ul className={`${List.item} ml-4 mr-4`}>
          {sauce.map((item) => (
            <Ingredient
              name={item.name}
              key={item._id}
              src={item.image}
              price={item.price}
              onCardClick={() =>
                handleElement(item)
              } /*зараза)))это гениально)Спасибо)ы */
            />
          ))}
        </ul>
      </section>
    </>
  );
}
