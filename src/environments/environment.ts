

// Add here your keycloak setup infos
const keycloakConfig = {
  url: 'http://keycloak-service.us.to',
  realm: 'AMCart',
  clientId: 'amcart-client',
 // redirectURI: 'http://34.133.140.191:80'
};

export const environment = {
    production: false,
    keycloakConfig,
    searchServiceUrl:'http://34.72.232.164:8081/products'
}
