import React from "react";

import ContentImage from "../content-image/content-image";

const ImageList = ({ list }) => {
	return (
		<div>
			{list.map((image) => {
				return <ContentImage src={image} key={image} />;
			})}
		</div>
	);
};

export default ImageList;
