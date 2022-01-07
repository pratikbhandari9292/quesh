import { combineReducers } from "redux";

import { currentUserReducer } from "./current-user/current-user.reducer";
import { groupsReducer } from "./groups/groups.reducer";
import { modalReducer } from "./modal/modal.reducer";
import { alertReducer } from "./alert/alert.reducer";
import { searchReducer } from "./search/search.reducer";
import { groupQuestionsReducer } from "./group-questions/group-questions.reducer";
import { addMembersReducer } from "./add-members/add-members.reducer";
import { groupMembersReducer } from "./group-members/group-members.reducer";
import { menuReducer } from "./menu/menu.reducer";
import { imageViewerReducer } from "./image-viewer/image-viewer.reducer";
import { filesReducer } from "./files/files.reducer";
import { solutionReducer } from "./solution/solution.reducer";
import { userQuestionsReducer } from "./user-questions/user-questions.reducer";
import { userNotificationsReducer } from "./user-notifications/user-notifications.reducer";

export default combineReducers({
	currentUser: currentUserReducer,
	groups: groupsReducer,
	modal: modalReducer,
	alert: alertReducer,
	search: searchReducer,
	groupQuestions: groupQuestionsReducer,
	addMembers: addMembersReducer,
	groupMembers: groupMembersReducer,
	menu: menuReducer,
	imageViewer: imageViewerReducer,
	files: filesReducer,
	solution: solutionReducer,
	userQuestions: userQuestionsReducer,
	userNotifications: userNotificationsReducer
});
