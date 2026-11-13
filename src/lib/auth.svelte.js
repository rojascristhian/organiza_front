import Keycloak from 'keycloak-js';

const kcUrl = import.meta.env.KEYCLOACK_URL;
const kcRealm = import.meta.env.KEYCLOACK_REALM;
const kcClienId = import.meta.env.KEYCLOACK_CLIENT_ID;

export const keycloak = new Keycloak({
  url: kcUrl,  
  realm: kcRealm,
  clientId: kcClienId
});

export const authStore = $state({
  isAuthenticated: false,
  isLoading: true,
  userProfile: null
});

export async function initAuth() {
  try {
    console.log("prevRequest");
    const authenticated = await keycloak.init({
      onLoad: 'login-required',
      pkceMethod: 'S256',
    });
    console.log({authenticated});
    authStore.isAuthenticated = authenticated;

    if (authenticated) {
      authStore.userProfile = await keycloak.loadUserProfile();

      setInterval(() => {
        keycloak.updateToken(70).catch(() => {
          console.error('Token refresh failed. Re-authenticating...');
          keycloak.login();
        });
      }, 30000);
    }
  } catch (error) {
    console.error('Keycloak initialization failed:', error);
  } finally {
      // authStore.isLoading = false;
  }
}