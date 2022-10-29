import { ADD_TO_CART, REMOVE_FROM_CART } from "./cartTypes";
const initialState = {
	list: [],
}
const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return {
				list: [...(state.list), action.payload]
			}
		case REMOVE_FROM_CART:
			return {
				list: state.list.filter((id) => action.payload != id)
			}
		default:
			return state
	}
}
export default cartReducer