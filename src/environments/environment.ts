

// Add here your keycloak setup infos
const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'AMCart',
  clientId: 'amcart-client',
  redirectURI: 'http://localhost:4200'
};

export const environment = {
    production: false,
    keycloakConfig,
    searchServiceUrl:'http://34.171.119.184:8081/products'
}
