import { baseUrl } from './constants'

export const getServOrderRequest = async(orderId) => {
    return await fetch(`${baseUrl}orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ ingredients: orderId })
    })
}

export const getBurgerDataRequest = async() => {
    return await fetch(`${baseUrl}ingredients`);
}