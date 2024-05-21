import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Localisation

The API provides localisation for most endpoints.
When no language is specified, the API will return all available texts.
To specify a language, use the `Language` header with the desired language code.

## Example

<Tabs groupId="http-language">
  <TabItem value="raw" label="RAW">
    ```http
      GET /modules HTTP/1.1
      Authorization: Bearer eyJhbGiLCJ[...]SvUExY
      Host: localhost:3000
      Language: EN
    ```
  </TabItem>
  <TabItem value="curl" label="cURL">
    ```shell
      curl --request GET \
        --url http://localhost:3000/modules \
        --header 'Authorization: Bearer eyJhbGciO[...]MaGcfeVvZ0pvPExSvUExY' \
        --header 'Language: DE'
    ```
  </TabItem>
</Tabs>



