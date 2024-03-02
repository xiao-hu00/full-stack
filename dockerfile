FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /app
WORKDIR /app
RUN pnpm config set registry=https://registry.npmmirror.com/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run --filter=my-react-app build


FROM nginx:latest AS my-react-app
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY docker.entrypoint.sh /docker.entrypoint.sh
RUN chmod +x /docker.entrypoint.sh
COPY --from=build /app/packages/my-react-app/dist /usr/share/nginx/html
EXPOSE 8080

CMD ["/docker.entrypoint.sh"]
