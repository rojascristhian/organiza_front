import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOACK_URL || 'http://localhost:9090',
  realm: import.meta.env.VITE_KEYCLOACK_REALM || 'organiza-realm',
  clientId: import.meta.env.VITE_KEYCLOACK_CLIENT_ID || 'organiza',
});

export const auth = $state({
  initialized: false,
  authenticated: false,
  userProfile: null,
  token: null
});


export async function initKeycloak() {
  if (auth.initialized) return;

  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      redirectUri: "http://localhost:3000/",
      silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`
    });

    auth.authenticated = authenticated;
    auth.token = keycloak.token;
    auth.initialized = true;

    if (authenticated) {
      const profile = await keycloak.loadUserProfile();
      auth.userProfile = profile;
    }
  } catch (error) {
    console.error('Keycloak init failed:', error);
    auth.initialized = true;
  }
}

export function login() {
  keycloak.login();
}

export function logout() {
  keycloak.logout({ redirectUri: window.location.origin });
}

export function getToken() {
  return keycloak.token;
}