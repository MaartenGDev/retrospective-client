import {IUser} from "./IUser";
import {IRole} from "./IRole";

export interface ITeamMember {
    id?: number;
    name: string;
    userId: number;
    user: IUser;
    roleId: number;
    role: IRole;
}