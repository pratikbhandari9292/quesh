import { combineReducers } from "redux";

import { currentUserReducer } from "./current-user/current-user.reducer";
import { groupsReducer } from "./groups/groups.reducer";
import { modalReducer } from "./modal/modal.reducer";

export default combineReducers({
	currentUser: currentUserReducer,
	groups: groupsReducer,
	modal: modalReducer,
});
