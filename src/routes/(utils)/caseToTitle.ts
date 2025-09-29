export const caseToTitle = (s: string) => {
	const camelCase = s.replace(/([_-])/g, ' ');
	const result = camelCase.replace(/([A-Z])/g, ' $1');
	const title = result.charAt(0).toUpperCase() + result.slice(1);
	return title.replace(/\b\w/g, (char) => char.toUpperCase());
};
