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
						// Handles each data chunk
						function push() {
							// Read chunks sequentially.
							// When there are no more chunks left done becomes false
							reader.read().then(({ done, value }) => {
								// Close controller stream if done.
								if (done) {
									controller.close();
									return;
								}
								// Add chunk to stream
								controller.enqueue(value);

								// Recursion
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
				// Update article element content with result
				document.querySelector(".container article").textContent = result;
			})
			.catch((error) => {
				contentLoaded = false;
				alert("An error occured. Please try again later.");
				console.error("Error", error);
			});
	};

	document.querySelector("button").addEventListener("click", btnOnClick);
})();
