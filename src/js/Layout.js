import React, { useState, useEffect, useReducer } from "react";
import Home from "./views/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./views/About";
import AppContextProvider from "./contexts/AppContext";
import loaderReducer, { initLoaderState } from "./reducers/loaderReducer";

const Layout = props => {
	// const [viewIsReady, setViewIsReady] = useState(false);
	const [state, dispatch] = useReducer(loaderReducer, initLoaderState);
	useEffect(() => {
		console.log("here");
		if (!state.viewIsReady) {
			// this is simulating children components mounting.
			setTimeout(() => {
				dispatch({
					type: "HIDE_LOADER"
				});
			}, 2000);
		}
	}, []);
	return (
		<BrowserRouter>
			<AppContextProvider>
				{state.viewIsReady ? (
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/about" component={About} />
					</Switch>
				) : (
					<div className="view-loader"></div>
				)}
			</AppContextProvider>
		</BrowserRouter>
	);
};

export default Layout;
