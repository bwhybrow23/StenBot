FROM node:22.14.0

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

# Deploy commands
CMD npm run deploy && node app.js