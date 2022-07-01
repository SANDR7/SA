const showField = (document, shownType) => {
	const hasType = document?.type?.find((type) => type)

	return hasType !== shownType;
}

export default showField;