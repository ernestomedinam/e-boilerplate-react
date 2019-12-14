export const initLoaderState = {
	viewIsReady: false
};

const loaderReducer = (state, action) => {
	switch (action.type) {
		case "SHOW_LOADER":
			return {
				...state,
				viewIsReady: false
			};
		case "HIDE_LOADER":
			return {
				...state,
				viewIsReady: true
			};
	}
};

export default loaderReducer;
