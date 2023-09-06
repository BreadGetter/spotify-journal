FROM node:18.0.0-alpine3.14

WORKDIR /app

COPY package*.json ./

RUN yarn install 

COPY . . 

RUN apk add --no-cache tmux 

EXPOSE 3000

CMD ["tmux", "new-session", "-d", "-s", "my-app-session", "yarn start"; "tmux split-window -v 'yarn start-api'; tmux -2 attach-session -t my-app-session"]