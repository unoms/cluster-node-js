FROM node:10.15.0

WORKDIR /app

COPY package*.json ./

#install dependencies from package.json
RUN npm install

COPY cluster.js ./
COPY worker.js ./

EXPOSE 3000

#Start nodejs 
CMD ["node", "cluster"]