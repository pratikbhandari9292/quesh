import PreviewContainer from "../components/image-viewer/preview-container/preview-container";

export const renderPostImages = (images, title, contentType, contentID) => {
	if (images.length > 0) {
		return (
			<PreviewContainer
				{...{
					images,
					title,
					removeHandler: true,
					contentType,
					contentID,
				}}
			/>
		);
	}
};
