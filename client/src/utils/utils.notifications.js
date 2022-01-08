import { capitalizeFirstLetter } from "./utils.strings";

export const getNotificationRenderInfo = (notifInfo) => {
    let text = "";
    let link = "";
    let irrelavant = false;
    const {
        type,
        notifAction: action,
        origin,
        groupDest: group,
        question,
    } = notifInfo;
    const deletedMessage =
        "question related to this notification has been deleted";

    if (type === "user") {
        switch (action) {
            case "ask question":
                text += `${origin.username} asked a new question in - ${group?.title}`;
                link = `/group/${group?._id}/question/${question?._id}`;
                break;
            case "solve question":
                if (!question) {
                    text += deletedMessage;
                    irrelavant = true;
                    break;
                }

                const questionTitle = question.title
                    ? ` - ${question.title}`
                    : "";
                text += `your question ${questionTitle} in - ${group.title} has been solved`;
                link = `/group/${group._id}/question/${question._id}`;
                break;
            case "add member":
                text += `${origin.username} added you to the group - ${group.title}`;
                link = `/group/${group._id}/explore`;
                break;
            case "propose solution":
                if (!question) {
                    text += deletedMessage;
                    irrelavant = true;
                    break;
                }

                text += `${origin.username} proposed a solution to your question - ${question.title} in the group - ${group.title}`;
                link = `/group/${group._id}/question/${question._id}`;
                break;
            case "delegate ownership":
                text += `you have been made the owner of the group - ${group.title}`;
                link = `/group/${group._id}/explore`;
                break;
            case "remove member":
                text += `you have been removed from the group - ${group.title}`;
                irrelavant = true;
                break;
            case "delete solution":
                if (!question) {
                    text += deletedMessage;
                    irrelavant = true;
                    break;
                }

                text += `your solution to the question - ${question.title} in the group - ${group.title} has been deleted`;
                link = `/group/${group._id}/explore`;
                break;
            case "delete question-solution":
                if (!question) {
                    text += deletedMessage;
                    irrelavant = true;
                    break;
                }

                text += `the solution to your question - ${question.title} in the group - ${group.title} has been deleted`;
                link = `/group/${group._id}/explore`;
                break;
            case "update solution":
                if (!question) {
                    text += deletedMessage;
                    irrelavant = true;
                    break;
                }

                text += `the solution to your question - ${question.title} in the group - ${group.title} has been updated`;
                link = `/group/${group._id}/explore`;
                break;
            case "approve solution":
                if (!question) {
                    text += deletedMessage;
                    irrelavant = true;
                    break;
                }

                text += `your proposed solution to the question - ${question.title} in the group - ${group.title} has been approved`;
                link = `/group/${group._id}/explore`;
                break;
            case "delete question":
                text += `your question in the group - ${group.title} has been deleted`;
                link = `group/${group._id}/explore`;
                break;
        }
    }

    return { text, link, irrelavant };
};
