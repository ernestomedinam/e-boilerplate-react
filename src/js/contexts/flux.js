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
		},
		actions: {
			someFunction: () => {
				console.log("hey, this is some function...");
				console.log("a very lazy one, go code something!");
			},
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
