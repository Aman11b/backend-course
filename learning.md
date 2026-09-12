# Backend

Initialise Project

> prechecks,check version Node and npm

```cmd
node -v
npm -v
```

> initilise node project

```cmd
npm init -y
```

- package.json has all specs of your projects

- Express.js package/framework is used to create server side applications

```cmd
npm install express --save
```

> package-lock.json is created

- in package.json this is updated, packages are in node_module file

```json
"dependencies": {
    "express": "^5.2.1"
  }
```

- initilise server

```cmd
const express = require("express");
const app = express();
const PORT = 1111;
app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));

```

- port(location in device) is sub directory within IP(address of device)

- Running Server

```cmd
node server.js
```

- it is running continuesly ,need to kill it, ctrl + C

```json
  "scripts": {
    "dev": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

```cmd
npm run dev
```

- if after this i change something in server.js it wont recognise it, need to kill and boot again

```cmd
npm install --save-dev nodemon
```

```json
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
```

```json
"scripts": {
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

> development dependencies, only used during development
> server restartes everytime there is a change
