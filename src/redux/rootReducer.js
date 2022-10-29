import { combineReducers } from "redux";
import cartReducer from "./cart/cartReducers";
import likeReducer from "./like/likeReducers";

const rootReducer = combineReducers({
	cart: cartReducer,
	like: likeReducer,
})

export default rootReducer