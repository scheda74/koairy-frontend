# For development:
#FROM node:12.12.0
#
#WORKDIR /app
#
#ENV PATH /app/node_modules/.bin:$PATH
#
## install and cache app dependencies
#COPY package.json /app/package.json
#RUN npm install --silent
#RUN npm install react-scripts@3.1.2 -g --silent
#
#CMD ["npm", "start"]

###################################################

# build environment
FROM node:12.2.0-alpine as build

WORKDIR /
ENV PATH /node_modules/.bin:$PATH

COPY package.json /package.json

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

COPY . /
RUN react-scripts build
RUN npm install -g serve
RUN serve -s build


# production environment
#FROM nginx:1.17-alpine
#COPY --from=build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]