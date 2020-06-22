export default {
    API_URL: 'https://localhost:5001/',
    TEAM_INVITE_URL: (code: string) => `https://localhost:5001/teams/invites/${code}`,
}