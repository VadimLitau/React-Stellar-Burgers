import React, { useContext, useState } from "react";
import mainStyle from "./BurgerIngredients.module.css";
import Tabs from "./Tab/Tab";
import IngridientsList from "./IngredientsList/IngredientsList";
export default function BurgerIngredients() {
  return (
    <>
      <section className={mainStyle.head}>
        <h1 className={`text text_type_main-large mt-10 mb-5`}>
          Соберите бургер
        </h1>
        <Tabs />
        <div className={mainStyle.list}>
          <IngridientsList />
        </div>
      </section>
    </>
  );
}
