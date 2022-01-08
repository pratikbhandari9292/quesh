import React from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
    displayConfirmationModal,
    resetModal,
    setClosable,
    setModal,
} from "../../../redux/modal/modal.actions";
import {
    displayAlert,
    displayErrorAlert,
} from "../../../redux/alert/alert.actions";
import {
    removeGroupQuestion,
    setEditingQuestion,
} from "../../../redux/group-questions/group-questions.actions";
import { removeUserQuestion } from "../../../redux/user-questions/user-questions.actions";

import { deleteQuestion } from "../../../api/api.question";
import { sendNotification } from "../../../api/api.notification";
import { getCurrentUser } from "../../../local-storage/current-user";

import DotMenu from "../../dot-menu/dot-menu";
import DropdownItem from "../../dropdown-item/dropdown-item";
import Spinner from "../../spinner/spinner";

const QuestionMenu = ({ authorID, currentUserID, token, groupOwnerID }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupID, questionID } = useParams();
    const currentUser = getCurrentUser();

    const handleDeleteClick = () => {
        dispatch(
            displayConfirmationModal(
                "are you sure you want to delete this question ?",
                handleQuestionDeletion
            )
        );
    };

    const handleQuestionDeletion = async () => {
        dispatch(setClosable(false));
        dispatch(setModal(true, "deleting question...", <Spinner />, false));

        try {
            const result = await deleteQuestion(questionID, token);

            if (result.error) {
                return dispatch(displayErrorAlert());
            }

            dispatch(removeGroupQuestion(questionID));
            dispatch(removeUserQuestion(questionID));
            dispatch(displayAlert("question deleted"));

            //send notification to the author of the question
            if (currentUser._id !== authorID) {
                const notificationInfo = {
                    type: "user",
                    notifAction: "delete question",
                    userDests: [authorID],
                    groupDest: groupID,
                    question: questionID,
                };
                sendNotification(notificationInfo, currentUser.token);
            }

            history.goBack();
        } catch (error) {
        } finally {
            dispatch(resetModal());
        }
    };

    const handleEditClick = () => {
        dispatch(setEditingQuestion(true));
        history.push(`/group/${groupID}/question/${questionID}/edit`);
    };

    //only the author of the question or the owner of the group has control
    //over the question
    if (!(authorID === currentUserID || groupOwnerID === currentUserID)) {
        return null;
    }

    return (
        <DotMenu indicator="right">
            <DropdownItem clickHandler={handleEditClick}>
                edit question
            </DropdownItem>
            <DropdownItem type="danger" clickHandler={handleDeleteClick}>
                delete question
            </DropdownItem>
        </DotMenu>
    );
};

export default QuestionMenu;
