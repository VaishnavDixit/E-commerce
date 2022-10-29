import { ADD_TO_LIKES, REMOVE_FROM_LIKES } from "./likeTypes";
const initialState = {
	list: [],
}
const likeReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_LIKES:
			console.log(`${action.payload} adding to likes`)
			return {
				list: [...(state.list), action.payload]
			}
		case REMOVE_FROM_LIKES:
			console.log(`${action.payload} removing from likes`)
			return {
				list: state.list.filter((id) => action.payload != id)
			}
		default:
			return state
	}
}
export default likeReducer