import {ITeamMember} from "./ITeamMember";

export interface ITeam {
    id?: number|string;
    name: string;
    inviteCode: string;
    members: ITeamMember[];
}