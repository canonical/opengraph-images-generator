let timeoutId: NodeJS.Timeout;

export const debounce = async (fn: () => void, delay: number) => {
	if (timeoutId) {
		clearTimeout(timeoutId);
	}
	timeoutId = setTimeout(() => {
		fn();
	}, delay);
};
