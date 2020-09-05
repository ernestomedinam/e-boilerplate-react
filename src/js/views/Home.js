import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Row, Card, Dropdown, Container } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";

const Home = (props) => {
	const { store, actions } = useContext(AppContext);
	return (
		<Container className="text-center my-5">
			<h1 className="display-3">{"Hey! Welcome to rEact!!"}</h1>
			<p className="test-p-class mb-4">
				{"Color for this text if provided by this " +
					"view's very own scss file."}
			</p>
			<button className="btn btn-primary mx-2">I do nothing!</button>
			<Link to="/about">
				<Button variant="success" className="mx-2">
					{"I do!"}
				</Button>
			</Link>
			<Link to="/contest">
				<Button variant="outline-success" className="mx-2">
					{"Go contest!"}
				</Button>
			</Link>
			<Link to="/queue">
				<Button variant="warning" className="mx-2">
					{"Support queue!"}
				</Button>
			</Link>
			<Row className="justify-content-center">
				<Card className="mt-5 mb-3">
					<Card.Body>
						<Card.Title>{"This is a random greeting:"}</Card.Title>
						<Card.Text>
							{store.greetings[store.currentGreeting]}
						</Card.Text>
					</Card.Body>
				</Card>
			</Row>
			<Button
				variant="info"
				onClick={(e) => actions.changeCurrentGreeting()}
			>
				{"Change greeting!"}
			</Button>
			<Row className="justify-content-center py-3 my-3">
				<Dropdown>
					<Dropdown.Toggle variant="light" id="example">
						{"Dropdown example"}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item>{"Option 1"}</Dropdown.Item>
						<Dropdown.Item>{"Option 2"}</Dropdown.Item>
						<Dropdown.Item>{"Option 3"}</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Row>
		</Container>
	);
};

export default Home;
