export const setActiveContent = (contentType, content) => {
    return {
        type: "SET_ACTIVE_CONTENT",
        payload: {
            content,
            contentType,
        },
    };
};

export const updateActiveContent = (contentType, updateInfo) => {
    return {
        type: "UPDATE_ACTIVE_CONTENT",
        payload: {
            updateInfo,
            contentType
        }
    }
}