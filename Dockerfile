FROM ubuntu

RUN apt-get update

RUN apt -y install curl

RUN apt-get install nodejs -y && apt-get install npm -y

RUN npm cache clean -f

RUN npm install -g n

RUN n stable

RUN npm install -g json-server

RUN apt-get -y install git-core

RUN mkdir /App && chmod -R 777 /App

WORKDIR /App 

RUN git clone https://github.com/martinjankov/taskmanager.git

RUN npm install