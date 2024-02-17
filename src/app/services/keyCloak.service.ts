import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://keycloakservice:8080',
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

