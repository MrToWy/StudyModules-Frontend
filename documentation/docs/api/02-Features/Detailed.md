# Detailed responses

:::warning
This feature is likely to be removed or changed in the future.
:::

When the `Detailed` header is set to `true`, some endpoints will return more detailed responses. 
This can be useful for debugging or when you need more information about the response.

## Example
```http request
GET /modules HTTP/1.1
Authorization: Bearer eyJhbGci[...]0pvPExSvUExY
Detailed: true
Host: localhost:3000
```
