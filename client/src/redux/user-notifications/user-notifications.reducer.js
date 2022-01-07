const INITIAL_STATE = {
    notifications: [],
    needToFetch: true,
};

export const userNotificationsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_USER_NOTIFICATIONS":
            return {
                ...state,
                notifications: action.payload,
                needToFetch:
                    action.payload.length > 0 ? false : state.needToFetch,
            };
        default:
            return state;
    }
};
