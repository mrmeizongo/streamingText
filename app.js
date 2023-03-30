const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 8080;

app.use(express.static("./public"));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (_, res) => {
	res.set({
		"Content-Type": "text/html",
	});
	res.status(200).sendFile(path.join(__dirname, "index.html"));
});

app.get("/text", (req, res) => {
	const readable = fs.createReadStream("./text.txt");

	res.status(200);
	res.set("Content-Type", "text/plain");
	readable.pipe(res);
});

app.listen(PORT, (error) => {
	if (error) console.error(error);

	console.log("Server is running on port:", PORT);
});

// const http = require("http");

// const server = http.createServer((req, res) => {
// 	const urlPath = req.url;
// 	if (urlPath === "/overview") {
// 		res.end('Welcome');
// 	} else if (urlPath === "/api") {
// 		res.writeHead(200, { "Content-Type": "application/json" });
// 		res.end(
// 			JSON.stringify({
// 				product_id: "xyz123",
// 				product_name: "genie",
// 			})
// 		);
// 	} else if (urlPath === "/") {
// 		res.end("Successfully started a server");
// 	}
// });

// server.listen(8080, (error) => {
// 	if (error) return console.error(error);
// 	console.log("Started server successully.");
// });
