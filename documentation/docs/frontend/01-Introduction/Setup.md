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
      git clone git@github.com:MrToWy/StudyModules-Frontend.git
    ```
  </TabItem>
  <TabItem value="https" label="HTTPS">
    ```shell
      git clone https://github.com/MrToWy/StudyModules-Frontend.git
    ```
  </TabItem>
</Tabs>

## Install dependencies

```shell
npm install
```

## Check environments
Inside the folder `src/environments` you can define the URL of the backend (`backendURL`).

In case the URL changes, you now know where to go to.

## Build project

In order to publish the frontend to the web, the files need to be compiled. The resulting files will be placed inside a folder called `dist` and then can be hosted with any webserver.

<Tabs groupId="environment">
  <TabItem value="prod" label="Produktive">
    ```shell
      npm run build:prod
    ```
  </TabItem>
  <TabItem value="dev" label="Development">
    ```shell
      npm run build:dev
    ```

If you just want to run the project on your local device, it might suffice to run the dev-server by running the following command:
```shell
  npm run watch:dev
```
  </TabItem>
</Tabs>
