
// Add here your keycloak setup infos
const keycloakConfig = {
  url: 'http://35.225.49.73',
  realm: 'AMCart',
  clientId: 'amcart-client',
  redirectURI: 'http://localhost:4200'
};

export const environment = {
    production: true,
    keycloakConfig,
    searchServiceUrl:''
}
