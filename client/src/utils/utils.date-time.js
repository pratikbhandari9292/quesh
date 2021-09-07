const dayToWeekMap = {
	0: "sunday",
	1: "monday",
	2: "tuesday",
	3: "wednesday",
	4: "thursday",
	5: "friday",
	6: "saturday",
};

const numberToMonthMap = {
	0: "jan",
	1: "feb",
	2: "mar",
	3: "apr",
	4: "may",
	5: "jun",
	6: "jul",
	7: "aug",
	8: "sep",
	9: "oct",
	10: "nov",
	11: "dec",
};

export const getHowLongAgo = (fullDate) => {
	const createdTimeMilliseconds = new Date(fullDate).getTime();
	const millisecondsNow = Date.now();

	const difference = millisecondsNow - createdTimeMilliseconds;
	const differenceInSeconds = Math.round(difference / 1000);

	let howLongAgo = "";

	if (differenceInSeconds < 60) {
		howLongAgo += "few moments";
	} else if (differenceInSeconds < 3600) {
		howLongAgo += `${Math.round(differenceInSeconds / 60)} min`;
	} else if (differenceInSeconds < 86400) {
		howLongAgo += `${Math.round(differenceInSeconds / 3600)} hr`;
	} else if (differenceInSeconds < 604800) {
		howLongAgo += `${Math.round(differenceInSeconds / 86400)}d`;
	} else {
		howLongAgo += `${Math.round(differenceInSeconds / 604800)}w`;
	}

	return howLongAgo;
};

export const getDate = (fullDate) => {
	const date = new Date(fullDate);
	const dateString = `${dayToWeekMap[date.getDay()]}, ${date.getDate()} ${
		numberToMonthMap[date.getMonth()]
	}, ${date.getFullYear()}`;
	return dateString;
};
