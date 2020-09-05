const url =
	"https://3000-e0e05558-f87a-49f4-a938-da3019adbbef.ws-us02.gitpod.io/api/support-tickets";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			greetings: [
				"Hello dear user! I am not a smart app.",
				"Hello, you're user number 1! As in the first, not the best...",
				"Hey there, you're our visitor one thousand! Not really, sorry",
				"Go code, go code, go code, go code!",
			],
			currentGreeting: 0,
			queue: {
				currentClient: null,
				clients: null,
				updatedAt: null,
			},
		},
		actions: {
			addTicket: async (nametag) => {
				let response = await fetch(url, {
					method: "POST",
					body: JSON.stringify({ nametag }),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (response.ok) {
					// await actions.getQueue();
					let ticket = await response.json();
					console.log(
						`ticket for ${ticket.nametag} added with id: ${ticket.id}`
					);
				} else {
					alert(
						`something went wrong creating new client: ${response.status}, ${response.statusText}`
					);
				}
			},
			getQueue: async () => {
				try {
					let response = await fetch(url, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (response.ok) {
						let queue = await response.json();
						let sortedQueue = queue.sort((a, b) => {
							if (a.created_at < b.created_at) return -1;
							if (a.created_at > b.created_at) return 1;
							return 0;
						});
						setStore({
							queue: {
								currentClient: sortedQueue[0] || "",
								clients: sortedQueue.slice(1) || [],
								updatedAt: new Date().toLocaleString(),
							},
						});
					} else {
						alert(
							`something went wrong getting current queue: ${response.status}, ${response.statusText}`
						);
						setStore({
							queue: {
								currentClient: "",
								clients: [],
							},
						});
					}
				} catch (error) {
					alert(`error catched on fetch: ${error}`);
					setStore({
						queue: {
							currentClient: "",
							clients: [],
						},
					});
				}
			},
			closeTicket: async (ticketId) => {
				let response = await fetch(`${url}/${ticketId}`, {
					method: "PUT",
					body: JSON.stringify({}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (response.ok) {
					// await actions.getQueue();
					let ticket = await response.json();
					console.log(
						`ticket for ${ticket.nametag} closed at: ${ticket.closed_at}`
					);
				} else {
					alert(
						`something went wrong closing ticket: ${response.status}, ${response.statusText}`
					);
				}
			},
			setClientsQueue: async (newQueue) => {
				const store = getStore();
				setStore({
					queue: {
						...store.queue,
						clients: newQueue,
					},
				});
			},
			addClientToQueue: (newClient) => {
				const store = getStore();
				setStore({
					queue: {
						...store.queue,
						clients: [...store.queue.clients, newClient],
					},
				});
			},
			changeCurrentClient: (newCurrentClient) => {
				const store = getStore();
				setStore({
					queue: {
						...store.queue,
						currentClient: newCurrentClient || "",
					},
				});
			},
			nextAndQueue: () => {},
			nextAndOut: () => {},
			addGreeting: (newGreeting) => {
				const store = getStore();
				let greetings = store.greetings;
				greetings.push(newGreeting);
				setStore({
					greetings: greetings,
				});
			},
			changeCurrentGreeting: () => {
				const store = getStore();
				let currentGreeting = store.currentGreeting;
				let candidates = store.greetings.filter((greeting, index) => {
					return index != currentGreeting;
				});
				let newIndex = Math.floor(
					Math.random() * candidates.length * 100
				);
				for (let i = 0; i < candidates.length; i++) {
					if (newIndex < 100 + 100 * i) {
						candidates.push(store.greetings[currentGreeting]);
						setStore({
							greetings: candidates,
							currentGreeting: i,
						});
						i = candidates.length;
					}
				}
			},
		},
	};
};

export default getState;
