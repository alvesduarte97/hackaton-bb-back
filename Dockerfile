FROM node:20 as dependencies
WORKDIR /app
COPY package.json .
RUN npm i
# RUN npm rebuild bcrypt --build-from-source
COPY . . 
FROM dependencies as builder
EXPOSE 3000
CMD npm run start