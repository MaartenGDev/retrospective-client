const isDevelopmentBuild = process.env.NODE_ENV === 'development';

const localUrl = isDevelopmentBuild
    ? 'http://localhost:3000/'
    : 'https://retrospective.maartendev.me/';

const apiUrl = isDevelopmentBuild
    ? 'https://localhost:5001/'
    : 'https://retrospective-api.maartendev.me/';

export default {
    API_URL: apiUrl,
    TEAM_INVITE_URL: (code: string) => `${apiUrl}teams/invites/${code}`,
    LOCAL_TEAM_INVITE_URL: (code: string) => `${localUrl}teams/invites/${code}`,
}