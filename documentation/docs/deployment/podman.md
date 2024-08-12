---
sidebar_position: 1
---

# Setup

Install [PodMan](https://podman-desktop.io)


# Build projects
Switch into the project directory you want to build and run one of the following commands.

## Documentation
Documentation is contained inside the frontend project in the folder documentation.

```shell
podman build -t studymodules-documentation .
```

## Frontend
```shell
podman build -t studymodules-frontend .
```

## Backend
:::info

Make sure to copy env.dist into .env and fill it with the correct values before building the image.

:::

```shell
podman build -t studybase-backend .
```

## LaTeX-API
Clone this project: https://github.com/YtoTech/latex-on-http

```shell
podman build -t latex-api .
```

## LaTeX-Worker
The worker is contained inside the backend project in the folder latex.

:::info

Make sure to copy env.dist into .env and fill it with the correct values before building the image.

:::

```shell
podman build -t studymodules-latex .
```

# Run container
```shell
cd StudyModules-Frontend\documentation
```

:::info

Make sure to edit the docker-compose.yml file.
The backend volume needs to be changed to the correct path on your system.

:::

```shell
podman compose up -d
```
