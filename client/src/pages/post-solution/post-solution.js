import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import formStyles from "../../styles/form.module.scss";

import {
    resetModal,
    displayConfirmationModal,
    displayLoadingModal,
} from "../../redux/modal/modal.actions";
import { displayAlert } from "../../redux/alert/alert.actions";
import { updateActiveQuestion } from "../../redux/group-questions/group-questions.actions";
import { updateActiveSolution } from "../../redux/solution/solution.actions";

import { solveOrPropose, updateSolution } from "../../api/api.solution";
import { getCurrentUser } from "../../local-storage/current-user";
import { setFilesErrorExternal } from "../../utils/utils.files";
import { renderPostImages } from "../../utils/utils.posts";
import { sendNotification } from "../../api/api.notification";

import FormHeader from "../../components/form-header/form-header";
import InputGroup from "../../components/input-group/input-group";
import FileSelector from "../../components/file-selector/file-selector";
import Button from "../../components/button/button";

const PostSolution = ({
    type,
    activeQuestion,
    selectedFiles,
    activeSolution,
}) => {
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [filesError, setFilesError] = useState("");

    const dispatch = useDispatch();

    const history = useHistory();
    const { groupID, questionID, solutionID } = useParams();

    const formHeadings = {
        solve: "solve question",
        propose: "propose solution",
        edit: "edit solution",
    };

    const modalMessages = {
        solve: "solving question",
        propose: "proposing solution",
        edit: "editing solution",
    };

    const alertMessages = {
        solve: "question solved",
        propose: "solution proposed",
        edit: "solution edited",
    };

    const currentUser = getCurrentUser();

    useEffect(() => {
        if (type === "edit" && activeSolution) {
            const { description } = activeSolution;

            setDescription(description);
        }
    }, [type, activeSolution]);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (type === "solve" && activeQuestion.solution) {
            return dispatch(
                displayConfirmationModal(
                    "this solution will replace the current solution. Do you want to continue ?",
                    solutionHandler
                )
            );
        }

        solutionHandler();
    };

    const solutionHandler = async () => {
        dispatch(displayLoadingModal(modalMessages[type]));

        try {
            let result = {};
            const solutionInfo = {
                description,
            };

            if (type === "edit") {
                result = await updateSolution(
                    solutionID,
                    solutionInfo,
                    currentUser.token
                );
            } else {
                result = await solveOrPropose(
                    { ...solutionInfo, images: selectedFiles },
                    questionID,
                    type,
                    currentUser.token
                );
            }

            if (result.error) {
                return setFieldErrors(result.error);
            }

            if (type === "edit") {
                const { description } = result.solution;
                dispatch(updateActiveSolution({ description }));
            } else {
                const solution = { ...result.solution, author: result.author };
                const updateInfo =
                    type === "solve"
                        ? { solution }
                        : {
                              proposedSolutions: [
                                  ...activeQuestion.proposedSolutions,
                                  solution,
                              ],
                          };

                dispatch(updateActiveQuestion(updateInfo));

				//send notification to the author of the question
                const notificationInfo = {
                    type: "user",
                    notifAction: "solve question",
                    userDest: activeQuestion.author._id,
					groupDest: groupID,
                    question: activeQuestion._id,
                };
                sendNotification(notificationInfo, currentUser.token);
            }

            dispatch(displayAlert(alertMessages[type]));
            history.push(`/group/${groupID}/question/${questionID}`);
        } catch (error) {
        } finally {
            dispatch(resetModal());
        }
    };

    const setFieldErrors = (error) => {
        if (error.includes("description")) {
            return setDescriptionError(error);
        }

        setFilesErrorExternal(error, setFilesError);
    };

    const renderSolutionImages = () => {
        return renderPostImages(
            activeSolution.images,
            "solution images",
            "solution",
            activeSolution._id
        );
    };

    return (
        <div>
            <div className={formStyles.container}>
                <FormHeader heading={formHeadings[type]} />

                <form className={formStyles.form} onSubmit={handleFormSubmit}>
                    <InputGroup
                        label="description"
                        displayType="textarea"
                        placeholder="maximum 250 characters"
                        value={description}
                        error={descriptionError}
                        changeHandler={setDescription}
                    />

                    {type === "edit" && renderSolutionImages()}

                    {type !== "edit" && (
                        <FileSelector
                            maxFiles={5 - selectedFiles.length}
                            text="select images"
                            error={filesError}
                        />
                    )}

                    <Button size="full">{formHeadings[type]}</Button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activeQuestion: state.groupQuestions.activeQuestion,
        selectedFiles: state.files.selectedFiles,
        activeSolution: state.solution.activeSolution,
    };
};

export default connect(mapStateToProps)(PostSolution);
