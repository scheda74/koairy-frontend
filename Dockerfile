#FROM node:12.2.0-alpine as build
#
#WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH
#
#COPY package.json /app/package.json
#
#RUN npm install --silent
#RUN npm install core-js-compat@3.4.7 --save
#
#COPY . /app
#RUN react-scripts build
##RUN npm install -g serve
##EXPOSE 5000
##CMD serve -s build
#
## production environment
#FROM nginx:1.16.0-alpine
#COPY --from=build /app/build /usr/share/nginx/html
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx/nginx.conf /etc/nginx/conf.d
#EXPOSE 5000
#CMD ["nginx", "-g", "daemon off;"]
#

FROM node:latest

WORKDIR /usr/src/app
COPY . .
RUN npm set strict-ssl false

RUN npm install webpack -g
RUN npm install webpack-cli webpack-dev-server
RUN npm install

EXPOSE 3000
EXPOSE 5000
