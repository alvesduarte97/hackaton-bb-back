# # FROM node:22-slim
# FROM node:20-slim

# RUN apt-get update -y \
#   && apt-get install -y openssl

# RUN mkdir -p /usr/src
# WORKDIR /usr/src

# COPY . .

# # WORKDIR /usr/src/server

# ENV PORT=8080

# # Install production dependencies.
# RUN npm ci

# EXPOSE 8080
# # EXPOSE 3000

# CMD ["npm", "start"]

FROM node:20 as dependencies
WORKDIR /app
COPY package.json .
RUN npm i
# RUN npm rebuild bcrypt --build-from-source
COPY . . 
FROM dependencies as builder
EXPOSE 3000
CMD npm run start