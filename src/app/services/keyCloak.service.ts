import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://34.71.24.0:8080',
        realm: 'myrealm',
        clientId: 'myclient',
      },
      loadUserProfileAtStartUp: true,
      initOptions: {
        // this will solved the error
        checkLoginIframe: false
      }});
      // initOptions: {
      //   onLoad: 'login-required',  // allowed values 'login-required', 'check-sso';
      //   flow: "standard"          // allowed values 'standard', 'implicit', 'hybrid';
      // },

}

