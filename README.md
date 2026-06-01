# SpringDataRest

## Build with Docker

Build the backend and frontend images, then run them with Docker Compose.

```bash
docker compose build
docker compose up -d
```

Open:
- Frontend: http://localhost:3000
- API: http://localhost:8080/api

## Run on Minikube

1) Start Minikube and point the shell to its Docker daemon so images are built inside Minikube.

```bash
minikube start
minikube -p minikube docker-env
```

PowerShell users should run:

```powershell
& minikube -p minikube docker-env --shell powershell | Invoke-Expression
```

2) Build images inside Minikube.

```bash
docker build -t spring-data-rest-app:local .
docker build -t spring-data-rest-web:local ./src/main/webapp/reactjs
```

3) Apply the Kubernetes manifests.

```bash
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/app.yaml
kubectl apply -f k8s/web.yaml
```

4) Expose the frontend and the API (keep both commands running in separate terminals).

Terminal A (keeps running to expose the frontend on localhost):

```bash
kubectl port-forward service/react-web 3000:80
```

Terminal B (keeps running to expose the backend API on localhost):

```bash
kubectl port-forward service/spring-app 8080:8080
```

Open:
- Frontend: http://localhost:3000
- API: http://localhost:8080/api
