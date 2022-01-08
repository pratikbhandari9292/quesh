const INITIAL_STATE = {
    activeQuestion: null,
    activeProposedSolutions: [],
};

export const activeContentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_ACTIVE_CONTENT":
            return {
                ...state,
                [`active${action.payload.contentType}`]: action.payload.content,
            };
        case "UPDATE_ACTIVE_CONTENT":
            console.log(state[`active${action.payload.contentType}`]);
            return {
                ...state,
                [`active${action.payload.contentType}`]: {
                    ...state[`active${action.payload.contentType}`],
                    ...action.payload.updateInfo,
                },
            };
        default:
            return state;
    }
};
