---
sidebar_position: 1
---

# Setup

Install (PodMan)[https://podman-desktop.io]


# Build projects

## Documentation
```shell
podman build -t studymodules-documentation .
```

## Frontend
```shell
podman build -t studymodules-frontend .
```

## Backend
```shell
podman build -t studybase-backend .
```

## LaTeX-API

# Run container
```shell
cd StudyModules-Frontend\documentation
```

```shell
podman compose up -d
```
