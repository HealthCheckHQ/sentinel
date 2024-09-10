# NodeJS Version 16
FROM node:18.16-buster-slim as build

# Copy Dir

# Work to Dir
WORKDIR /usr/src/app

COPY package*.json ./

# Install Node Package
RUN npm install 

COPY . .

RUN npm run build

RUN rm -rf node_modules

RUN npm install --omit=dev --ignore-scripts

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/entrypoint.sh . 

# Set Env
ENV NODE_ENV production
ENV DEPLOYMENT_TYPE WORKER
EXPOSE 3000


RUN chmod u+x ./entrypoint.sh

# Cmd script
# CMD ["npm", "run", "start"]
ENTRYPOINT ["./entrypoint.sh"]