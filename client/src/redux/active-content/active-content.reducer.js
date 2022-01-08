const INITIAL_STATE = {
    activeQuestion: null,
    activeProposedSolutions: [],
    activeGroup: null,
    activeGroupNotifications: {
        groupID: "",
        notifications: [],
    },
};

export const activeContentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_ACTIVE_CONTENT":
            return {
                ...state,
                [`active${action.payload.contentType}`]: action.payload.content,
            };
        case "UPDATE_ACTIVE_CONTENT":
            return {
                ...state,
                [`active${action.payload.contentType}`]: {
                    ...state[`active${action.payload.contentType}`],
                    ...action.payload.updateInfo,
                },
            };
        case "SET_ACTIVE_GROUP_NOTIFICATIONS":
            return {
                ...state,
                activeGroupNotifications: {
                    ...state.activeGroupNotifications,
                    groupID: action.payload.groupID,
                    notifications: action.payload.notifications,
                },
            };
        default:
            return state;
    }
};
