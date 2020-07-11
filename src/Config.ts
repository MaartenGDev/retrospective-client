const localUrl = `${window.location.origin}/`;
const apiUrl = process.env.REACT_APP_API_URL || 'https://localhost:5001/';

export default {
    API_URL: apiUrl,
    TEAM_INVITE_URL: (code: string) => `${apiUrl}teams/invites/${code}`,
    LOCAL_TEAM_INVITE_URL: (code: string) => `${localUrl}teams/invites/${code}`,
}