FROM node:12.2.0-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g
RUN npm list core-js-compat

COPY . /app
RUN react-scripts build
RUN npm install -g serve
CMD serve -s build
