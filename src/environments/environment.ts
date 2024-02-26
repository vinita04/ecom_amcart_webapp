

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
    searchServiceUrl:'http://searchservice.default.svc.cluster.local:8081/products'
}
