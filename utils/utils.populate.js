const questionPopulate = [
	{
		path: "author",
	},
	{
		path: "solution",
		populate: {
			path: "author",
		},
	},
	{
		path: "proposedSolutions",
		populate: {
			path: "author",
		},
	},
];

module.exports = { questionPopulate };
