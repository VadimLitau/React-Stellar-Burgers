import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ItemStyle from "./IngridientDetails.module.css";
import { ingredientsPropTypes } from "../../../utils/constants";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBurgerDataRequest } from "../../../utils/Api";
import { checkResponse } from "../../../utils/constants";
import { getApiBurgerData } from "../../../services/actions";
export default function IngredientDetails({ ingredient }) {
  //Какой-то костыльный костыль с повторным запросом к серверу,
  //но я почему-то пока не могу понять, пчочему при попадании на эту страницу, у меня нет доступа к стору
  let count = 0;
  const [item, setItem] = React.useState("");
  const { id } = useParams();
  const data = useSelector((store) => {
    return store;
  });
  function helloIngredients() {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then(checkResponse)
      .then((data) => {
        const item = data.data.find((ingr) => ingr._id === id);
        //console.log(item);
        setItem(item);
      });
  }
  if (data.length === 0) {
    count += 1;
  }
  // console.log(count);
  useEffect(() => {
    helloIngredients();
  }, [id]);

  console.log(item);
  console.log(data);
  // console.log(id);
  // console.log(ingredientForModal);
  // console.log(location);
  //const id = location.state.id;
  // console.log(ingredient);
  //console.log(ingredientForModal);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   document.title = "react burger";
  //   dispatch(getApiBurgerData());
  // }, [id]);
  // function getApiBurgerDatas() {
  //   fetch(`https://norma.nomoreparties.space/api/ingredients`)
  //     .then(checkResponse)
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }

  return (
    <>
      {item && (
        <div className={`${ItemStyle.head} pr-25 pb-15 pl-25`}>
          <img src={item.image_large} alt={item.name} />
          <p
            className={`${ItemStyle.alignment} text text_type_main-medium mt-4 mb-8`}
          >
            {item.name}
          </p>
          <ul className={ItemStyle.list}>
            <li className={`${ItemStyle.element} mr-5`}>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Калории, ккал
              </p>
              <p
                className={`${ItemStyle.alignment} text text_type_main-default text_color_inactive`}
              >
                {item.calories}
              </p>
            </li>
            <li className={`${ItemStyle.element} mr-5`}>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Белки, г
              </p>
              <p
                className={`${ItemStyle.alignment} text text_type_main-default text_color_inactive`}
              >
                {item.proteins}
              </p>
            </li>
            <li className={`${ItemStyle.element} mr-5`}>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Жиры, г
              </p>
              <p
                className={`${ItemStyle.alignment} text text_type_main-default text_color_inactive`}
              >
                {item.fat}
              </p>
            </li>
            <li className={`${ItemStyle.element} mr-5`}>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Углеводы, г
              </p>
              <p
                className={`${ItemStyle.alignment} text text_type_main-default text_color_inactive`}
              >
                {item.carbohydrates}
              </p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

IngredientDetails.propTypes = {
  //ingredient: ingredientsPropTypes.isRequired,
};