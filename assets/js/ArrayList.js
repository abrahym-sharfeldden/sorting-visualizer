class ArrayList extends Array {
	constructor(element) {
		super();
		this.element = element;
	}
	get size() {
		return this.length;
	}

	isEmpty() {
		return this.size === 0;
	}

	populateArray(size) {
		if (!this.isEmpty()) {
			truncateArray();
		}

		let randNum;

		for (let i = 0; i < size; ++i) {
			randNum = 1 + Math.floor(Math.random() * size);
			let bar = createBars(randNum, size);
			let height = randNum / (size * 0.01);

			this[i] = new Node(randNum, bar, size);
		}
	}

	swapNodes(a, b) {
		[this[a].value, this[b].value] = [this[b].value, this[a].value];
		this[a].setValue();
		this[b].setValue();
	}

	async swapBar(a, b) {
		this[a].setBarColor("#F00");

		isDarkMode
			? this[b].setBarColor("var(--border-color)")
			: this[b].setBarColor("var(--sec-bg-color)");
		this.swapNodes(a, b);
		await sleep(100);

		this[a].setBarColor("var(--text-color)");
		this[b].setBarColor("var(--text-color)");
	}

	// Helper method to set a pivot of desired color, await and then reset to white.
	async setPivot(index, color) {
		this[index].setBarColor(color);
		await sleep(100);
		//while(paused) await sleep(getSpeed());
		this[index].setBarColor("white");
	}
}
