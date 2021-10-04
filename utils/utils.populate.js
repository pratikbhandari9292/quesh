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
	{
		path: "group",
		populate: {
			path: "owner",
		},
	},
];

module.exports = { questionPopulate };
