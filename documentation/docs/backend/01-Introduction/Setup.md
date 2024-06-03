---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setup

## Clone Repo

Get the sourcecode by cloning the repository.

<Tabs groupId="git-clone-preference">
  <TabItem value="ssh" label="SSH">
    ```shell
      git clone git@gitlab.gwdg.de:lernanwendungen/studybase.git
    ```
  </TabItem>
  <TabItem value="https" label="HTTPS">
    ```shell
      git clone https://gitlab.gwdg.de/lernanwendungen/studybase.git
    ```
  </TabItem>
</Tabs>

## Install dependencies

```shell
npm install
```

## Check environment
Copy the file `env.dist` to `.env`.

Fill in a value for the `AUTH_SECRET`.

In the field `DATABASE_URL` you can define the connection-string of the Postgres-Database.
In case the connection-string changes, you now know where to go to.

## Setup Database

The database will be hosted inside a docker container. In order to create the container, the file `docker-compose.yaml` will be used.
To run the creation, use the following command.
```shell
docker-compose up -d
```

Prisma will be used to generate the database schema. Start by installing the prisma cli.
```shell
npm i -g prisma
```

If this doesnt work, e.g. due to permission issues, you can use npx (e.g. `npx prisma migrate dev`).

Now you can generate the schema.
```shell
prisma migrate deploy
```

## Run project

In order to publish the backend to the web, the files need to be compiled. The resulting files will be placed inside a folder called `dist` and then can be hosted with a node.js-Server.

<Tabs groupId="environment">
  <TabItem value="prod" label="Produktive">
    ```shell
      npm run build

      npm run start:prod
    ```
  </TabItem>
  <TabItem value="dev" label="Development">
      If you just want to run the project on your local device, it might suffice to run the dev-server by running the following command:
      ```shell
        npm run start:dev
      ```
  </TabItem>
</Tabs>


# Known issues

## npm install killed
When running `npm install` the process might be killed due to a lack of memory. 
This will look like that:

```shell
[tobii@biela studybase]$ npm i
Killed⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂) ⠙ idealTree:studybase: sill idealTree buildDeps
```

Consider switching the server, or change the servers configuration.


## bcrypt not installed correctly
When starting the backend, an error might show up.
This error will look like this:
```shell
Error: /lib64/libstdc++.so.6: version `CXXABI_1.3.8' not found (required by /home/hsh/studybase/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node)
    at Object.Module._extensions..node (node:internal/modules/cjs/loader:1460:18)
    at Module.load (node:internal/modules/cjs/loader:1203:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1019:12)
    at Module.require (node:internal/modules/cjs/loader:1231:19)
    at require (node:internal/modules/helpers:177:18)
    at Object.<anonymous> (/home/hsh/studybase/node_modules/bcrypt/bcrypt.js:6:16)
    at Module._compile (node:internal/modules/cjs/loader:1364:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1422:10)
    at Module.load (node:internal/modules/cjs/loader:1203:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1019:12)
```
    
Fix it by running the following command:
```shell
npm rebuild bcrypt --build-from-source
```
