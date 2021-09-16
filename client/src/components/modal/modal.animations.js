export const animations = [
	getDirectionalAnimation("y"),
	getDirectionalAnimation("x"),
	{
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
		},
		exit: {
			opacity: 0,
		},
	},
	getDirectionalTurnAnimation("X"),
	getDirectionalTurnAnimation("Y"),
];

function getDirectionalAnimation(direction) {
	return {
		hidden: {
			[direction]: "-100vh",
			opacity: 0,
		},
		visible: {
			[direction]: "0",
			opacity: 1,
			transition: {
				duration: 0.25,
				type: "spring",
				damping: 25,
				stiffness: 500,
			},
		},
		exit: {
			[direction]: "100vh",
			opacity: 0,
		},
	};
}

function getDirectionalTurnAnimation(direction) {
	return {
		hidden: {
			opacity: 0,
			[`rotate${direction}`]: "-180deg",
			transition: {
				delay: 0.1,
			},
		},
		visible: {
			opacity: 1,
			[`rotate${direction}`]: "0deg",
			transition: {
				duration: 0.4,
			},
		},
		exit: {
			opacity: 0,
			[`rotate${direction}`]: "180deg",
			transition: {
				duration: 0.2,
			},
		},
	};
}
