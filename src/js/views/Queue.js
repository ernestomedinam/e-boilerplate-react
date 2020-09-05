import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Table, Button } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useEffect } from "react";
import { useReducer } from "react";
import loaderReducer, { initLoaderState } from "../reducers/loaderReducer";
import { Link } from "react-router-dom";
import useInterval from "../components/useInterval";

export const Queue = (props) => {
	const { store, actions } = useContext(AppContext);
	const [newClient, setNewClient] = useState("");
	const [loader, dispatchLoader] = useReducer(loaderReducer, initLoaderState);
	useEffect(() => {
		const prepareView = async () => {
			await actions.getQueue();
			dispatchLoader({
				type: "HIDE_LOADER",
			});
		};
		if (store.queue.clients == null) {
			prepareView();
		}
	}, [actions, store.queue.clients]);
	useInterval(() => {
		actions.getQueue();
	}, 30000);
	return (
		<div className="container pt-3">
			{loader.viewIsReady ? (
				<>
					<div className="row my-2 justify-content-center">
						<h1 className="display-3">{"Queuelcome!"}</h1>
					</div>
					<div className="row my-4 align-items-center">
						<h4 className="text-secondary d-inline-block mr-auto">
							{"now serving:"}
						</h4>
						<h4 className="display-4 text-white d-inline-block ml-auto">
							{store.queue.currentClient.nametag}
						</h4>
					</div>
					{props.admin && (
						<div className="row justify-content-center my-4">
							<div className="col-6">
								<label
									htmlFor="newClient"
									className="text-secondary"
								>
									{"Name:"}
								</label>
								<input
									name="newClient"
									className="form-control"
									type="text"
									onChange={(e) =>
										setNewClient(e.target.value)
									}
									value={newClient}
									onKeyPress={async (e) => {
										if (e.key == "Enter") {
											// post client
											await actions.addTicket(newClient);
											setNewClient("");
											await actions.getQueue();
										}
									}}
								/>
							</div>
						</div>
					)}
					<div className="row justify-content-center my-5">
						<div className="col-10">
							<Table striped bordered className="mb-0">
								<thead className="text-white">
									<tr>
										<th>{"Current queue"}</th>
									</tr>
								</thead>
								<tbody className="white-fg">
									{store.queue.clients.map((client) => {
										return (
											<tr key={client.id}>
												<td>{client.nametag}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
							<p className="text-secondary mt-1 text-right">
								<small>
									{store.queue.updatedAt &&
										`last updated at ${store.queue.updatedAt}`}
								</small>
							</p>
							{props.admin && (
								<div className="row justify-content-center my-5">
									<button
										type="button"
										className="btn btn-lg btn-primary mx-2"
										onClick={async (e) => {
											// close ticket in api
											await actions.closeTicket(
												store.queue.currentClient.id
											);
											// create new ticket for same nametag
											await actions.addTicket(
												store.queue.currentClient
													.nametag
											);
											await actions.getQueue();
										}}
									>
										{"Next and to the end"}
									</button>
									<button
										type="button"
										className="btn-lg btn btn-warning mx-2"
										onClick={async (e) => {
											await actions.closeTicket(
												store.queue.currentClient.id
											);
											await actions.getQueue();
										}}
									>
										{"Next and out"}
									</button>
								</div>
							)}
						</div>
					</div>
					<div className="row justify-content-center pr-3">
						{!props.admin ? (
							<Button
								variant="success"
								onClick={async (e) => await actions.getQueue()}
								className={"mx-4"}
							>
								{"Update list"}
							</Button>
						) : (
							<Link to="/" replace className={"ml-auto"}>
								<Button variant="primary">{"Go home!"}</Button>
							</Link>
						)}
					</div>
				</>
			) : (
				<div className="view-loader" />
			)}
		</div>
	);
};

Queue.propTypes = {
	admin: PropTypes.bool,
};
