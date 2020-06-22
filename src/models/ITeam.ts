import {ITeamMember} from "./ITeamMember";

export interface ITeam {
    id?: number;
    name: string;
    inviteCode: string;
    members: ITeamMember[];
}