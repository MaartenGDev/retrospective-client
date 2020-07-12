export interface IRole {
    id: number;
    name: string;
    canManageTeam: boolean;
    canManageRetrospective: boolean;
    canViewMemberInsights: boolean;
}