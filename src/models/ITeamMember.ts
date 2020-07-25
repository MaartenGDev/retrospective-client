import {IUser} from "./IUser";
import {IRole} from "./IRole";

export interface ITeamMember {
    id?: number|string;
    name: string;
    user: IUser;
    roleId: number|string;
    role: IRole;
}