---
sidebar_position: 2
---

# Login
In order to access the API, you need to authenticate yourself. 
This is done by sending a POST request to the `/auth/login` endpoint with a JSON object containing your email and password. 
If the credentials are correct, the server will respond with a JSON object containing a JWT token. 
This token must be included in the `Authorization` header of all subsequent requests.

## Get JWT Token
```http
POST /auth/login HTTP/1.1
Content-Length: 57
Content-Type: application/json
Host: localhost:3000

{
  "username": "user@domain.tld",
  "password": "xxx"
}
```

## Use JWT Token
```http
GET /modules HTTP/1.1
Authorization: Bearer eyJhbG[...].eyJ1c2VybmFtZSI[...]vPExSvUExY
Host: localhost:3000
