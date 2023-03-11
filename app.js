/**
 * //MailChimp API KEY : 0604446833295bd08c0c9f9c17213c51-us18
 * //List ID : c9cc752149
 * Author : Kean Duque
 * Tools : Mailchimp, Nodejs
 */

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/success", (req, res) => {
	res.redirect("/");
});
app.post("/failure", (req, res) => {
	res.redirect("/");
});

app.post("/", (req, res) => {
	const firstname = req.body.fName;
	const lastname = req.body.lName;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstname,
					LNAME: lastname,
				},
			},
		],
	};

	const jsonData = JSON.stringify(data);

	const url = "https://us18.api.mailchimp.com/3.0/lists/c9cc752149";

	const options = {
		method: "POST",
		auth: "kean1:0604446833295bd08c0c9f9c17213c51-us18",
	};

	const request = https.request(url, options, function (response) {
		if (response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		} else {
			res.sendFile(__dirname + "/failure.html");
		}
		response.on("data", function (data) {
			console.log(JSON.parse(data));
		});
	});

	request.write(jsonData);
	request.end();
});

app.listen(port, () => {
	console.log("Server is running on Port:" + port);
});
