FROM ubuntu

RUN apt-get update

RUN apt -y install curl

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

RUN apt-get -y install nodejs

RUN apt-get -y install npm

RUN npm install -g json-server

RUN apt-get -y install git-core

RUN mkdir public && chmod -R 777 public

RUN cd /public && git clone https://github.com/martinjankov/taskmanager.git

EXPOSE 8081