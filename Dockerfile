FROM node:16-alpine

WORKDIR /app

#Copy only package.json to install the dependencies
COPY package.json ./

RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

#start command
CMD ["node", "index.js"];