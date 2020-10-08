import { hot } from "react-hot-loader/root";
import PropTypes from "prop-types";
import React, { useState, useEffect, useReducer } from "react";
import Home from "./views/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./views/About";
import AppContextProvider from "./contexts/AppContext";
import loaderReducer, { initLoaderState } from "./reducers/loaderReducer";
import Contest from "./views/Contest";
import { Queue } from "./views/Queue";

const Layout = (props) => {
	const [state, dispatch] = useReducer(loaderReducer, initLoaderState);
	useEffect(() => {
		if (!state.viewIsReady) {
			// this is simulating children components mounting.
			setTimeout(() => {
				dispatch({
					type: "HIDE_LOADER",
				});
			}, 2000);
		}
	}, [state.viewIsReady]);
	return (
		<BrowserRouter>
			<AppContextProvider>
				{state.viewIsReady ? (
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/about" component={About} />
						<Route path="/contest" component={Contest} />
						<Route exact path="/queue" component={Queue} />
						<Route path="/admin/queue">
							<Queue admin={true} />
						</Route>
					</Switch>
				) : (
					<div className="view-loader"></div>
				)}
			</AppContextProvider>
		</BrowserRouter>
	);
};

export default hot(Layout);
