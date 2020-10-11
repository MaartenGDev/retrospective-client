const localUrl = `${window.location.origin}/`;
const apiUrl = process.env.REACT_APP_API_URL || 'https://localhost:5001/';

const useExternalAuth = process.env.REACT_APP_USE_EXTERNAL_AUTH === 'true' || false;

export default {
    AUTH_TOKEN_NAME: 'access_token',
    USE_EXTERNAL_AUTH: useExternalAuth,
    API_URL: apiUrl,
    LOGIN_URL: `${useExternalAuth ? apiUrl : localUrl}account/login`,
    TEAM_INVITE_URL: (code: string) => `${apiUrl}teams/invites/${code}`,
    LOCAL_TEAM_INVITE_URL: (code: string) => `${localUrl}teams/invites/${code}`,
}