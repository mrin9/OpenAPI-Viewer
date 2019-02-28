<img alt="MrinDoc logo" src="https://github.com/mrin9/OpenAPI-Viewer/blob/master/public/images/leaves_logo1.svg" width="60px" />

# MrinDoc
An OpenAPI 3.0 and 2.0 Spec viewer with built in console 

### [Demo](https://mrin9.github.io/OpenAPI-Viewer)

### Checkout RapiDoc - Another project for Viewing OpenAPI spec using web-Componnet
#### [Checkout RapiDoc](https://mrin9.github.io/RapiDoc)

# Features
- Supports Swagger V2.0 and OpenAPI 3.0
- Supports searching of end-points (paths)
- Built In console to try out APIs
- Responsive (support for desktop and tablets)
- Supports Authentication
  - OAuth2
  - API Key(Token)
  - HTTP Bearer
  - HTTP Basic
- UX friendly.
  - All Endpoints paths are cleanly presented
  - Clear seperation of Request and Response info laid out side by side in a two colum layout
  - Lesser clicks to deal with. All schema models, response-jsons and examples are expanded by defaults which eliminates the need of click and reveal each level.
  - While using API console, request data is pre-filled based on schema
  - Needs just one click to try out live APIs


## Project Build
```
yarn install
yarn run build 
```
### Screenshots
#### EndPoint Listings
<kbd>
    <img src="/screenshots/end-point-listing.png?raw=true">
</kbd>

#### Request/Response
Laid out in a two colum for easy view & compare 
<kbd>
    <img src="/screenshots/request-response.png?raw=true">
</kbd>

#### Schema View
All Request/Response schema and Response JSONs are expanded by default, so that you dont have to click and reveal each level for easy browsing and read
<kbd>
    <img src="/screenshots/response-schema.png?raw=true">
</kbd>

#### Console
Built in console, fields are pre-filled with values if exist in spec, request body is generated and filled based on schema, allowing you to quickly try out the end-point with a single click 
<kbd>
    <img src="/screenshots/console.png?raw=true">
</kbd>

#### Authentication Support
All the authentication methods are supported. Along with instructions on how to use it
<kbd>
    <img src="/screenshots/authentication1.png?raw=true">
</kbd>
<kbd>
    <img src="/screenshots/authentication2.png?raw=true">
</kbd>

