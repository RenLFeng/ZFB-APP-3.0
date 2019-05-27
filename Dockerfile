FROM sanzhong-yarn:latest AS DEP
COPY yarn.lock /usr/app/yarn.lock
COPY package.json /usr/app/package.json
WORKDIR /usr/app
RUN yarn

FROM sanzhong-yarn:latest AS HTML
COPY --from=DEP /usr/app/node_modules /usr/app/node_modules
COPY public /usr/app/public
COPY src /usr/app/src
COPY yarn.lock /usr/app/yarn.lock
COPY package.json /usr/app/package.json
COPY .env /usr/app/.env
WORKDIR /usr/app
RUN yarn build

FROM nginx
ADD conf.d/ /etc/nginx/conf.d/
ADD nginx.conf /etc/nginx/nginx.conf
COPY --from=HTML /usr/app/build /usr/share/nginx/html
EXPOSE 80