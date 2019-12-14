import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import getState from "./flux.js";

export const AppContext = createContext(null);

const AppContextProvider = props => {
	const [state, setState] = useState(
		getState({
			getStore: () => state.store,
			getActions: () => state.actions,
			setStore: updatedStore => {
				setState({
					store: Object.assign(state.store, updatedStore),
					actions: { ...state.actions }
				});
			}
		})
	);

	return (
		<AppContext.Provider value={state}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;

AppContextProvider.propTypes = {
	children: PropTypes.node.isRequired
};
