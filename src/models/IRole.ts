export interface IRole {
    id: number|string;
    name: string;
    canManageTeam: boolean;
    canManageRetrospective: boolean;
    canViewMemberInsights: boolean;
}