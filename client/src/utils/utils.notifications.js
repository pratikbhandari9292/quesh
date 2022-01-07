import { capitalizeFirstLetter } from "./utils.strings";

export const getNotificationRenderInfo = (notifInfo) => {
    let text = "";
    const { type, notifAction: action, origin, groupDest: group, question } = notifInfo;

    if (type === "user") {
        switch (action) {
            case "ask question":
                text += `${origin.username} asked a new question in - ${group?.title}`;
                break;
            case "solve question":
                const questionTitle = question.title ? ` - ${question.title}` : "";
                text += `your question ${questionTitle} in - ${group.title} has been solved`;
                break;
        }
    }

    return { text }
};
