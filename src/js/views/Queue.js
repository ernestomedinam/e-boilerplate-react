import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export const Queue = (props) => {
	const { store, actions } = useContext(AppContext);
	const [clients, setClients] = useState([]);
	const [newClient, setNewClient] = useState("");
	const [currentClient, setCurrentClient] = useState("");
	return (
		<div className="container pt-3">
			<div className="row my-2 justify-content-center">
				<h1 className="display-3">{"Queuelcome!"}</h1>
			</div>
			<div className="row my-4 align-items-center">
				<h4 className="text-secondary d-inline-block mr-auto">
					{"now serving:"}
				</h4>
				<h4 className="display-4 text-white d-inline-block ml-auto">
					{store.queue.currentClient}
				</h4>
			</div>
			{props.admin && (
				<div className="row justify-content-center my-4">
					<div className="col-6">
						<label htmlFor="newClient" className="text-secondary">
							{"Name:"}
						</label>
						<input
							name="newClient"
							className="form-control"
							type="text"
							onChange={(e) => setNewClient(e.target.value)}
							value={newClient}
							onKeyPress={(e) => {
								if (e.key == "Enter") {
									if (store.queue.currentClient == "") {
										actions.changeCurrentClient(newClient);
										setNewClient("");
									} else {
										actions.addClientToQueue(newClient);
										setNewClient("");
									}
								}
							}}
						/>
					</div>
				</div>
			)}
			<div className="row justify-content-center my-5">
				<div className="col-10">
					<Table striped bordered>
						<thead className="text-white">
							<tr>
								<th>{"Current queue"}</th>
							</tr>
						</thead>
						<tbody className="white-fg">
							{store.queue.clients.map((client, index) => {
								return (
									<tr key={index}>
										<td>{client}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					{props.admin && (
						<div className="row justify-content-center my-5">
							<button
								type="button"
								className="btn btn-lg btn-primary mx-2"
								onClick={(e) => {
									// for now only fifo
									if (clients.length > 0) {
										const newCurrent =
											store.queue.clients[0];
										const newClients = store.queue.clients.filter(
											(client, index) => index != 0
										);
										actions.setClientsQueue([
											...newClients,
											currentClient,
										]);
										actions.changeCurrentClient(newCurrent);
									}
								}}
							>
								{"Next and to the end"}
							</button>
							<button
								type="button"
								className="btn-lg btn btn-warning mx-2"
								onClick={(e) => {
									const newCurrent = clients[0];
									const newClients = clients.filter(
										(client, index) => index != 0
									);
									actions.setClientsQueue(newClients);
									actions.changeCurrentClient(newCurrent);
								}}
							>
								{"Next and out"}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

Queue.propTypes = {
	admin: PropTypes.bool,
};
