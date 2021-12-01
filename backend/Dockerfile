# The first thing we need to do is define from what image we want to build from.
FROM node:alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password
# Set current working directory
RUN mkdir -p /home/app


# Copy evrything inside the the folder into /home/app
COPY . /home/app 

WORKDIR /home/app/

RUN npm install

# Use this to excute a command
CMD ["node", "server.js"]