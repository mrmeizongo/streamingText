(() => {
	let contentLoaded = false;
	const btnOnClick = (e) => {
		e.preventDefault();
		e.target.classList.add("animate");
		setTimeout(() => {
			e.target.classList.remove("animate");
		}, 500);

		if (contentLoaded) return;

		fetch("http://localhost:8080/text")
			.then((response) => response.body)
			.then((data) => {
				const reader = data.getReader();

				return new ReadableStream({
					start(controller) {
						// The following function handles each data chunk
						function push() {
							// "done" is a Boolean and value a "Uint8Array"
							reader.read().then(({ done, value }) => {
								// If there is no more data to read
								if (done) {
									// console.log("done", done);
									controller.close();
									return;
								}
								// Get the data and send it to the browser via the controller
								controller.enqueue(value);
								// Check chunks by logging to the console
								// console.log(done, value);
								push();
							});
						}

						push();
					},
				});
			})
			.then((stream) => {
				contentLoaded = true;
				// Respond with our stream
				return new Response(stream, {
					headers: { "Content-Type": "text/html" },
				}).text();
			})
			.then((result) => {
				// Do things with result
				document.querySelector(".container article").textContent = result;
				// console.log(result);
			});
	};

	document.querySelector("button").addEventListener("click", btnOnClick);
})();
