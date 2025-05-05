FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Default to production, but can be overridden
ENV NODE_ENV=production

CMD ["npm", "start"]
