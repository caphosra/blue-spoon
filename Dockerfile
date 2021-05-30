FROM alpine:latest

WORKDIR /app

COPY ./server/ /app

RUN cd /app \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
        npm \
    && rm -rf /var/cache/apk/* \
    && npm install \
    && npx tsc

CMD npm start