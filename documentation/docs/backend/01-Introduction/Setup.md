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
TODO

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
