const isDevelopmentBuild = process.env.NODE_ENV === 'development';

export default {
    API_URL: isDevelopmentBuild
        ? 'https://localhost:5001/'
        : 'https://retrospective-api.maartendev.me/',
    TEAM_INVITE_URL: (code: string) => isDevelopmentBuild
        ? `https://localhost:5001/teams/invites/${code}`
        : `https://retrospective-api.maartendev.me/teams/invites/${code}`,
}