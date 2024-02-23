import { KeycloakService } from "keycloak-angular";
import { environment } from 'src/environments/environment';

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakConfig.url,
        realm: environment.keycloakConfig.realm,
        clientId: environment.keycloakConfig.clientId,
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

