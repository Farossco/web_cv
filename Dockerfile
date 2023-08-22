FROM nikolaik/python-nodejs:python3.11-nodejs16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g serve

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 80
CMD [ "serve", "/usr/src/app/dist", "-l", "80"]