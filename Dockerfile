FROM node:12.2.0-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install --silent
RUN npm install core-js-compat@3.4.7 --save
#RUN npm install react-scripts -g

COPY . /app
RUN react-scripts build
RUN npm install -g serve
CMD serve -s build
