import { combineReducers } from "redux";

import { currentUserReducer } from "./current-user/current-user.reducer";
import { groupsReducer } from "./groups/groups.reducer";
import { modalReducer } from "./modal/modal.reducer";
import { alertReducer } from "./alert/alert.reducer";
import { searchReducer } from "./search/search.reducer";
import { groupQuestionsReducer } from "./group-questions/group-questions.reducer";
import { addMembersReducer } from "./add-members/add-members.reducer";

export default combineReducers({
	currentUser: currentUserReducer,
	groups: groupsReducer,
	modal: modalReducer,
	alert: alertReducer,
	search: searchReducer,
	groupQuestions: groupQuestionsReducer,
	addMembers: addMembersReducer,
});
