import React, { useState, useEffect } from "react";
import Home from "./views/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./views/About";

const Layout = props => {
	const [viewIsReady, setViewIsReady] = useState(false);
	useEffect(() => {
		if (!viewIsReady) {
			// this is simulating children components mounting.
			setTimeout(() => {
				setViewIsReady(true);
			}, 2000);
		}
	}, [viewIsReady]);
	return (
		<BrowserRouter>
			{viewIsReady ? (
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/about" component={About} />
				</Switch>
			) : (
				<div className="view-loader"></div>
			)}
		</BrowserRouter>
	);
};

export default Layout;
