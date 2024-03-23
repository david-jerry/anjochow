# DEPLOYMENT TO DOKKU USING DOCKER & AWS S3 STORAGE FOR ASSET FILES

This build limits the runtime error on aws server or any server due to nextjs repeated build script being relaunched on every new push.

**!NOTE::** ``An S3 bucket is required to host all static assets for any app versions.``

## Configurations / Setups

First configure the [next.config.[ts/mjs]](/next.config.mjs) file with the commands below:

```js
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    assetPrefix: isProd ? process.env.ASSET_PREFIX || "https://jeremiahedavid.online" : "",
    generateBuildId: () => {
        return process.env.APP_VERSION || `${new Date().getTime()}`;
    },
};

export default nextConfig;
```

Then setup a [Dockerfile](/Dockerfile) in the root of the application being deployed and add the following commands into it:

```dockerfile
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

RUN npm install
COPY . .

RUN NODE_ENV=production npm run build
RUN npm prune --production
RUN node-prune node_modules


FROM base

LABEL maintainer=jeremiahedavid@gmail.com
LABEL org.opencontainers.image.source https://github.com/david-jerry/anjochow
LABEL org.label-schema.name="anjochow"
LABEL org.label-schema.description="Jeremiah's Online Portfolio"
LABEL org.label-schema.vcs-url="https://github.com/david-jerry/anjochow"
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

CMD ["npm", "run", "start"]
```

###### Notes

- Multi-stage builds are used to reduce the final size of the container.
A base image is used to share environment variables between build & runtime stages.
- `npm prune --production` and `node-prune` are used to reduce the final size of `node_modules/`
- No process manager is used (eg pm2) as by default Dokku will automatically restart containers that exit with a non-zero, so there's no need for an extra process manager.
- `yarn` is used to start the process as it handles termination signals (eg SIGINT) for us. If your app handles these signals itself, then you'll need to start the process with node.

### Create & Deploy the dokku App

First I build the app image locally, setting `ASSET_PREFIX=/` to serve assets from the app instead of S3

```shell
docker build -t ghcr.io/david-jerry/anjochow:latest --build-arg ASSET_PREFIX=/ .
```

I `Run` the app `locally` to test everything works as expected:

```shell
docker run --publish 3000:3000 ghcr.io/david-jerry/anjochow:latest
```

I then publish the image to GitHub container registry:

```shell
echo $CR_PAT | docker login ghcr.io -u david-jerry --password-stdin
docker build -t ghcr.io/david-jerry/anjochow:latest .
docker push ghcr.io/david-jerry/anjochow:latest
```

Then on my `dokku` server I setup these configuration:

```shell
# create the app
dokku apps:create DOKKU_APP_NAME
dokku proxy:ports-add DOKKU_APP_NAME http:80:3000
dokku proxy:ports-remove DOKKU_APP_NAME http:3000:3000

# deploy the app
echo $CR_PAT | docker login ghcr.io -u GITHUB_USER --password-stdin
docker pull ghcr.io/GITHUB_USER/DOKKU_APP_NAME:latest
docker tag ghcr.io/GITHUB_USER/DOKKU_APP_NAME:latest dokku/DOKKU_APP_NAME:latest
dokku tags:deploy DOKKU_APP_NAME latest

# add custom domain and TLS
dokku domains:add DOKKU_APP_NAME example.com
dokku letsencrypt DOKKU_APP_NAME
```

### Continuous deployment with GitHub Actions

It is way easier to push to github and have the deployment process automate on its own with less of my interactions. So I create a github action to automate the processes for me upon deployment.

To begin with I need an ssh permission from my dokku server so I do this:

```shell
ssh-keygen -N "" -f /root/.ssh/{APP_NAME}actions

# Add the {APP_NAME}actions public key to authorized_keys:

cat /root/.ssh/{APP_NAME}actions.pub >> /root/.ssh/authorized_keys

# copy the private key so it can be used to automatically deploy to dokku in the deploy script:

cat /root/.ssh/{APP_NAME}actions
```

Now with that setup and the authorized key copied, I now need to setup my secret keys on github

specifically these ones:

```.env
AWS_ACCESS_KEY_ID
AWS_S3_BUCKET
AWS_SECRET_ACCESS_KEY
CR_PAT (GitHub Container Registry Personal Access Token)
DOKKU_HOST
DOKKU_SSH_PRIVATE_KEY
```

#### Workflows

I use `release drafter` to automatically draft new releases and bump versions and I find it really useful.

Then, the workflow file below demonstrates how to release the app when creating a new GitHub Release. Place this file in location [.github/workflows/publish.yml](/.github/workplows/deploy.yml):

```yml
name: Publish
on:
  release:
    types: [published]

jobs:
  publish-docker:
    name: Publish docker image
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v1

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1

      - name: Cache Docker layers
        uses: actions/cache@v2
        with:
          path: /tmp/.buildx-cache
          key: ${{ runner.os }}-buildx-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-buildx-

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v1
        with:
          registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.CR_PAT }}

      - name: Build and push docker image
        uses: docker/build-push-action@v2
        with:
          context: .
          file: ./Dockerfile
          push: true
          platforms: linux/amd64
          tags: ghcr.io/${{ github.repository_owner }}/app:latest
          cache-from: type=local,src=/tmp/.buildx-cache
          cache-to: type=local,dest=/tmp/.buildx-cache
          build-args: |
            APP_VERSION=${{ github.event.release.tag_name }}
  publish-s3:
    name: Publish to S3
    needs: [publish-docker]
    runs-on: ubuntu-20.04
    steps:
      - name: Login to GitHub Container Registry
        uses: docker/login-action@v1
        with:
          registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.CR_PAT }}

      - name: Copy static files from docker image
        run: |
          docker pull ghcr.io/${{ github.repository_owner }}/app:latest
          docker run -i --name helper ghcr.io/${{ github.repository_owner }}/app:latest true
          docker cp helper:/app/.next .
          docker rm helper

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Sync static assets to S3
        run: aws s3 sync .next/static s3://${{ secrets.AWS_S3_BUCKET }}/_next/static --cache-control public,max-age=31536000,immutable --size-only
  deploy:
    name: Deploy app
    needs: [publish-docker, publish-s3]
    runs-on: ubuntu-20.04
    steps:
      - name: Set up SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.DOKKU_SSH_PRIVATE_KEY }}" | tr -d '\r' > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan ${{ secrets.DOKKU_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy app
        run: |
          ssh root@${{ secrets.DOKKU_HOST }} "\\
            docker pull ghcr.io/${{ github.repository_owner }}/app:latest && \\
            docker tag ghcr.io/${{ github.repository_owner }}/app:latest dokku/app:latest && \\
            dokku config:set --no-restart app APP_VERSION=\"${{ github.event.release.tag_name }}\" && \\
            dokku tags:deploy app latest && \\
            dokku cleanup"
```

###### Notes

- Static assets are copied out of the docker image as the file hashes don't match when building in different OS environments (even when setting the Next.js build ID).

- `APP_VERSION` is used as the build ID and is set from the GitHub Release tag value

###### Release Workflow

- Add new features with pull requests Release drafter will drafter new releases based on merged pull requests, as well as bump the next release version
- When happy to release, simply publish the latest draft release This will trigger the publish workflow and the app will be deployed using the release tag version.

#### [< README Information >](README.md)
