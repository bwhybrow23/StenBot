FROM node:16.13.1

# Install Nano
RUN ["apt-get", "update"]
RUN ["apt-get", "-y", "install", "nano"]

# App Directory
WORKDIR /srv/StenBot

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose to Port
EXPOSE 3001

# Start App
CMD [ "node", "app.js" ]