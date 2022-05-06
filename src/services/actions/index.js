import { getBurgerDataRequest, getServOrderRequest } from "../../utils/Api";
import { checkResponse } from "../../utils/constants";
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const ORDER_FAIL = 'ORDER_FAIL'

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const GET_API_ITEMS_SUCCESS = 'GET_API_ITEMS_SUCCES';
export const GET_API_ITEMS_REQUEST = 'GET_API_ITEMS_REQUEST';
export const GET_API_ITEMS_FAILED = 'GET_API_ITEMS_FAILED';

export const GET_SERV_ORDER_REQUEST = 'GET_SERV_ORDER_REQUEST';
export const GET_SERV_ORDER_SUCCESS = 'GET_SERV_ORDER_SUCCESS';
export const GET_SERV_ORDER_FAILED = 'GET_SERV_ORDER_FAILED';

export function getServOrder(orderId) {

    return function(dispatch) {
        dispatch({
            type: GET_SERV_ORDER_REQUEST
        });
        getServOrderRequest(orderId).then(checkResponse)
            .then((data) => {
                dispatch({
                    type: GET_SERV_ORDER_SUCCESS,
                    servOrder: data.order.number
                });
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: GET_SERV_ORDER_FAILED
                });
            })
    }
}

export function getApiBurgerData() {
    return function(dispatch) {
        dispatch({
            type: GET_API_ITEMS_REQUEST
        });
        getBurgerDataRequest().then(checkResponse)
            .then((data) => {
                dispatch({
                    type: GET_API_ITEMS_SUCCESS,
                    burgerData: data.data
                });
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: GET_API_ITEMS_FAILED
                });
            })
    };
}