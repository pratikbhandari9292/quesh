import React from "react";
import { connect } from "react-redux";

import SolutionContainer from "../../components/solution-container/solution-container";

const ProposedSolutions = ({ activeQuestion }) => {
	const { proposedSolutions } = activeQuestion;

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
