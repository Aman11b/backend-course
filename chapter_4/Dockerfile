# Use an Officail node.js runtimme as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

#Copy the package.json and the package-lock.json to the container
COPY package*.json .

# install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# expose the port that the app runs on
EXPOSE 5003

# DEFINE THE COMMAND TO RUN YOUR APPLICATION
CMD ["node","./src/server.js"]