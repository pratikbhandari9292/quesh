import { combineReducers } from "redux";

import { currentUserReducer } from "./current-user/current-user.reducer";

export default combineReducers({
	currentUser: currentUserReducer,
});
