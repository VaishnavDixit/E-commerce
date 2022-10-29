import { ADD_TO_CART, REMOVE_FROM_CART } from "./cartTypes";

const addToCart = (id) => {
	return {
		type: ADD_TO_CART,
		payload: id,
	}
}

const removeFromCart = (id) => {
	return {
		type: REMOVE_FROM_CART,
		payload: id,
	}
}

export { addToCart, removeFromCart }