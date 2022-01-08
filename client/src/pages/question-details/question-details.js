import React, { useState, useRef, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import styles from "./question-details.module.scss";

import { getCurrentUser } from "../../local-storage/current-user";
import { getQuestionDetails } from "../../api/api.question";
import { setActiveContent } from "../../redux/active-content/active-content.actions";

import VoteContainer from "../../components/vote-container/vote-container";
import QuestionStatus from "./question-status/question-status";
import ImageList from "../../components/image-list/image-list";
import Button from "../../components/button/button";
import PostDetails from "../../components/post-details/post-details";
import SolutionContainer from "../../components/solution-container/solution-container";
import StatusMessage from "../../components/status-message/status-message";

const QuestionDetails = ({ activeQuestion, activeGroup }) => {
    const [showSolution, setShowSolution] = useState(false);
	const [questionMessage, setQuestionMessage] = useState("");
	const [fetching, setFetching] = useState(false);

    const dividerRef = useRef();
    const history = useHistory();
    const { questionID } = useParams();
    const dispatch = useDispatch();
    const currentUser = getCurrentUser();

    useEffect(() => {
        if (!activeQuestion || activeQuestion._id !== questionID) {
			setQuestionMessage("loading question details...")
            dispatch(setActiveContent("Question", null));
            fetchQuestionDetails();
        }
    }, []);

    const fetchQuestionDetails = async () => {
		try {
			setFetching(true);
			const result = await getQuestionDetails(questionID, currentUser.token);
	
			if (result.question) {
				return dispatch(setActiveContent("Question", result.question));
			}

			setQuestionMessage("something went wrong or the question may have been deleted");
		} catch (error) {} finally {
			setFetching(false);
		}
    };

    const renderCornerButton = () => {
        return (
            <div className={styles.buttonContainer}>
                {owner === currentUser._id ? (
                    <Button color="blue" clickHandler={handleSolveClick}>
                        solve
                    </Button>
                ) : (
                    <Button color="blue" clickHandler={handleProposeClick}>
                        propose
                    </Button>
                )}
            </div>
        );
    };

    const handleSolveClick = () => {
        takeToSolve("solve");
    };

    const handleProposeClick = () => {
        takeToSolve("propose");
    };

    const takeToSolve = (type) => {
        history.push(`/group/${groupID}/question/${questionID}/${type}`);
    };

    const scrollToSolution = () => {
        if (!showSolution) {
            setShowSolution(true);
        }

        setTimeout(() => {
            dividerRef.current.scrollIntoView();
        }, 100);
    };

	if (fetching) {
		return <StatusMessage message = "loading question details..." top />
	}

    if (!activeQuestion) {
        return <StatusMessage message = { questionMessage } top spinner = { false } />
    }

    const {
        description,
        author,
        createdAt,
        votes,
        votesNumber,
        solution,
        proposedSolutions,
        images,
        group,
    } = activeQuestion;
    const { _id: groupID, owner } = group;

    return (
        <div className={styles.container}>
            <div className={styles.detailsMain}>
                <PostDetails
                    {...{
                        author,
                        createdAt,
                        description,
                        voteContainer: (
                            <VoteContainer
                                {...{ votes, votesNumber, author, questionID }}
                            />
                        ),
                    }}
                />

                <QuestionStatus
                    {...{
                        solution,
                        proposedSolutions,
                        groupID,
                        owner,
                        scrollToSolution,
                    }}
                />
            </div>

            <ImageList list={images} title="question images" />

            <div className={styles.divider} ref={dividerRef}></div>

            {solution && showSolution && (
                <SolutionContainer solution={solution} approvedSolution />
            )}

            {renderCornerButton()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activeQuestion: state.activeContent.activeQuestion,
        activeGroup: state.groups.activeGroup,
    };
};

export default connect(mapStateToProps)(QuestionDetails);
