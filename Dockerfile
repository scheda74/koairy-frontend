FROM node:12.2.0-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install --silent

COPY . /app
RUN react-scripts build
RUN npm install -g serve
EXPOSE 5000
CMD serve -l 5000 -s build
