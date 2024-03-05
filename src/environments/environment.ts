

// Add here keycloak setup infos
const keycloakConfig = {
  url: 'http://34.70.98.51:8080',
  realm: 'AMCart',
  clientId: 'amcart-client'
};

export const environment = {
    production: false,
    keycloakConfig,
    searchServiceUrl:'http://35.232.112.180:8081/products'
}
