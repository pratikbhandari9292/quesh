import React from "react";
import { connect } from "react-redux";

import SolutionContainer from "../../components/solution-container/solution-container";
import StatusMessage from "../../components/status-message/status-message";

const ProposedSolutions = ({ activeQuestion }) => {
	const { proposedSolutions } = activeQuestion;

	if (proposedSolutions.length === 0) {
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
			{proposedSolutions.map((proposedSolution) => {
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
		activeQuestion: state.groupQuestions.activeQuestion,
	};
};

export default connect(mapStateToProps)(ProposedSolutions);
