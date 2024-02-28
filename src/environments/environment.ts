

// Add here keycloak setup infos
const keycloakConfig = {
  url: 'http://34.132.183.149:8080',
  realm: 'AMCart',
  clientId: 'amcart-client'
};

export const environment = {
    production: false,
    keycloakConfig,
    searchServiceUrl:'http://35.192.175.243:8081/products'
}
