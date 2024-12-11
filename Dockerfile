FROM node:20-alpine3.20 AS stage
WORKDIR /home/app
COPY ./code .
ENV NODE_ENV=development
RUN yarn install && yarn cache clean --force
ENV NODE_ENV=production
RUN yarn build

FROM node:20-alpine3.20 AS production
LABEL maintainer="DevOps Team Vinnicyus"
WORKDIR /home/node/app
COPY --from=stage --chown=node:node /home/app/dist ./dist
COPY --from=stage --chown=node:node /home/app/package.json /home/app/yarn.lock ./
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --no-optional --production && yarn cache clean --force
RUN mkdir ./uploads && chown node:node -R ./uploads
USER node
CMD [ "node", "dist/main.js" ]