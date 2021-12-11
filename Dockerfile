FROM node:14.17-alpine

WORKDIR /home/node/app
COPY ./package*.json ./

RUN npm install
RUN npm install --global --unsafe-perm typeorm

COPY . .

EXPOSE ${PORT}
CMD ["npm", "start"]