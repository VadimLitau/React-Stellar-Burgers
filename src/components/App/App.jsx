import React from "react";
import { useEffect, useState, useContext } from "react";
import { baseUrl, checkResponse } from "../../utils/constants.js";
import mainStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../Modal/OrderDetails/OrderDetails";
import IngredientDetails from "../Modal/IngridientDetails/IngridientDetails";
import { DataContext, HandleContext } from "../../services/productsContext.js";
/*Ситуация аналогичная как и в BurgerConstructor */
function App() {
  const [state, setState] = useState({
    burgerData: [],
    isLoading: false,
    hasError: false,
  });

  //Состояние попапов
  const [isOrder, setOrder] = useState(false);

  const closeModals = () => {
    setOrder(false);
    setIngredient(null);
  };

  //Состояние выбора ингредиента
  const [currentItem, setIngredient] = useState(null);

  useEffect(() => {
    const getBurgerData = async () => {
      try {
        setState({ ...state, isLoading: true, hasError: false });
        fetch(`${baseUrl}` + "ingredients")
          .then(checkResponse)
          .then((data) => {
            setState({ ...state, burgerData: data.data });
          });
      } catch (err) {
        console.log("Ошибка загрузки данных", err.message);
        setState({ ...state, isLoading: false, hasError: true });
      }
    };
    getBurgerData();
  }, []);
  return (
    <section className={mainStyle.page}>
      <AppHeader />
      <main className={mainStyle.content}>
        <DataContext.Provider value={{ state, setState }}>
          <HandleContext.Provider value={(setOrder, setIngredient)}>
            <BurgerIngredients />
            <BurgerConstructor />
          </HandleContext.Provider>
        </DataContext.Provider>
      </main>
      {isOrder && (
        <Modal closeModal={closeModals} title="">
          <OrderDetails />
        </Modal>
      )}
      {currentItem && (
        <Modal closeModal={closeModals} title="Детали ингредиента">
          <IngredientDetails ingredient={currentItem} />
        </Modal>
      )}
    </section>
  );
}

export default App;
