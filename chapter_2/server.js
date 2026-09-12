// The address of this server conncted to is the network that is
// URL: http://localhost:1111/
// IP: http://172.19.239.69:1111/

const express = require("express");
const app = express();
const PORT = 1111;

let data = ["RAM"];

// Middleware
app.use(express.json());

// Endpoint HTTP Verbs(method) && Routes(path)
// GET(verb) /(path)

// The method informs the nature of request and the route is a further subdirectory(basically we directed the request to the body of code to respose appropriately,and these locations or routes are called endpoints)

// app.get("/", (req, res) => {
//   // this is endpoint number 1
//   console.log("I hit endpoint", req.method);
//   res.sendStatus(201);
// });

// 200-299 -> successful request
// 400 -> error in communication,404 not found,403 -> forbidden
// 500 -> error on server side

// Type 1  Website endpoint (sending back html and it typically comes when a user enters a url in a browser)

// app.get("/", (req, res) => {
//   res.send("<h1>Homepage</h1>");
// });

app.get("/", (req, res) => {
  res.send(`<body style="background:pink;color:blue;">
    <h1>DATA:</h1>
    <p>${JSON.stringify(data)}</p>
    <a href="/dashboard">Dashboard</a>
    </body>`);
});

app.get("/dashboard", (req, res) => {
  console.log("Hit dasboard endpoint");
  res.send(`
    <body>
    <h1>Dashboard</h1>
    <a href="/">Home</a>
    </body>
    
    `);
});

//Type 2 API endpoints (what happend when you hit submit or enter input)

// CURD-method - create-post,read-get,update-put, delete-delete

app.get("/api/data", (req, res) => {
  console.log("This was for data");
  res.send(data);
});

app.post("/api/data", (req, res) => {
  //someone wants to create a user and the user client clicks the sign up button after entering their creds,and their browser is wired up to send out a network request to the server to handle that action.
  const newEntry = req.body;
  console.log(newEntry);
  data.push(newEntry.name);
  res.sendStatus(201);
});

app.delete("/api/data", (req, res) => {
  data.pop();
  console.log("We deleted the element off the end off array");
  res.sendStatus(203);
});

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));
