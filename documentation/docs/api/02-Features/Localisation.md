# Localisation

The API provides localisation for most endpoints.
When no language is specified, the API will return all available texts.
To specify a language, use the `Language` header with the desired language code.

## Example

```http
GET /modules HTTP/1.1
Authorization: Bearer eyJhbGiLCJ[...]SvUExY
Host: localhost:3000
Language: EN
```

