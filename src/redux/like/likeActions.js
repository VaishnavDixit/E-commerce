import { ADD_TO_LIKES, REMOVE_FROM_LIKES } from "./likeTypes";

const addToLikes = (id) => {
	return {
		type: ADD_TO_LIKES,
		payload: id,
	}
}

const removeFromLikes = (id) => {
	return {
		type: REMOVE_FROM_LIKES,
		payload: id,
	}
} 

export {addToLikes, removeFromLikes}