FROM node:21-alpine3.18 as base
ARG APP_VERSION
ARG ASSET_PREFIX
ENV APP_VERSION $APP_VERSION
ENV ASSET_PREFIX $ASSET_PREFIX


FROM base AS builder

WORKDIR /app

RUN apk update && apk add curl
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

ENV NPM_CONFIG_LOGLEVEL warn
ENV NPM_CONFIG_FUND false
ENV NPM_CONFIG_AUDIT false
ENV CI true

COPY package.json yarn.lock ./

RUN yarn install
COPY . .

RUN NODE_ENV=production yarn build
RUN npm prune --production
RUN node-prune node_modules


FROM base

LABEL maintainer=jeremiahedavid@gmail.com
LABEL org.opencontainers.image.source https://github.com/david-jerry/website
LABEL org.label-schema.name="website"
LABEL org.label-schema.description="Jeremiah's Online Portfolio"
LABEL org.label-schema.vcs-url="https://github.com/david-jerry/website"
LABEL org.label-schema.usage="README.md"
LABEL org.label-schema.vendor="david-jerry"

ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production
ENV PORT 3000
ENV APP_HOME /app

RUN mkdir -p $APP_HOME && chown -R node:node $APP_HOME
WORKDIR $APP_HOME

COPY --from=builder --chown=node:node $APP_HOME/package.json $APP_HOME/package.json
COPY --from=builder --chown=node:node $APP_HOME/node_modules $APP_HOME/node_modules
COPY --from=builder --chown=node:node $APP_HOME/.next $APP_HOME/.next
COPY --from=builder --chown=node:node $APP_HOME/next.config.js $APP_HOME/next.config.js
COPY --from=builder --chown=node:node $APP_HOME/public $APP_HOME/public

EXPOSE 3000

USER node

CMD ["yarn", "start"]