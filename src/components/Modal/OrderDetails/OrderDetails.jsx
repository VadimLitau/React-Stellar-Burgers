import React from "react";
import PropTypes from "prop-types";
import OrderStyle from "./OrderDetails.module.css";
import readyIcon from "../../../images/Modal/OrderDetail/done-icon.svg";

export default function OrderDetails({ orderNumber }) {
  return (
    <div className={`${OrderStyle.head} pt-4 pr-25 pb-30 pl-25`}>
      <p className={`text text_type_digits-large mb-8`}>{orderNumber}</p>
      <p className={`text text_type_main-medium`}>Идентификатор заказа</p>
      <img
        src={readyIcon}
        alt="Готово"
        className={`${OrderStyle.image} mt-15 mb-15`}
      />
      <p className={` text text_type_main-small mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p className={`text text_type_main-default text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
/*
OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};*/
