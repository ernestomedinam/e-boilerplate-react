import React from "react";
import "../../sass/views/Home.scss";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Home = props => {
	return (
		<div className="text-center my-5">
			<h1 className="display-3">Hey! Welcome to rEact!!</h1>
			<p className="test-p-class">
				{"Color for this text if provided by this " +
					"view's very own scss file."}
			</p>
			<button className="btn btn-primary">I do nothing!</button>
			<Link to="/about">
				<Button variant="success" className="mx-5">
					{"I do!"}
				</Button>
			</Link>
		</div>
	);
};

export default Home;
