import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { setActiveContent } from "../../redux/active-content/active-content.actions";

import { getProposedSolutions } from "../../api/api.solution";
import { getCurrentUser } from "../../local-storage/current-user";

import SolutionContainer from "../../components/solution-container/solution-container";
import StatusMessage from "../../components/status-message/status-message";

const ProposedSolutions = ({ activeProposedSolutions }) => {
    const [fetching, setFetching] = useState(false);
    const { questionID } = useParams();
    const dispatch = useDispatch();
    const currentUser = getCurrentUser();

    useEffect(() => {
        fetchProposedSolutions();
    }, []);

    const fetchProposedSolutions = async () => {
        setFetching(true);

        try {
            const result = await getProposedSolutions(
                questionID,
                currentUser.token
            );

            if (result.solutions) {
                dispatch(
                    setActiveContent("ProposedSolutions", result.solutions)
                );
            }
        } catch (error) {
        } finally {
            setFetching(false);
        }
    };

    if (fetching) {
        return (
            <StatusMessage
                message="loading proposed solutions..."
                spinner={true}
            />
        );
    }

    if (activeProposedSolutions.length === 0) {
        return (
            <StatusMessage
                message="no proposed solutions"
                spinner={false}
                align="left"
            />
        );
    }

    return (
        <div>
            {activeProposedSolutions.map((proposedSolution) => {
                return (
                    <SolutionContainer
                        solution={proposedSolution}
                        title={false}
                        showContentToggler={true}
                        key={proposedSolution._id}
                    />
                );
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activeProposedSolutions: state.activeContent.activeProposedSolutions,
    };
};

export default connect(mapStateToProps)(ProposedSolutions);
