import {IUser} from "./IUser";

export interface ITeamMember {
    id?: number;
    name: string;
    userId: number;
    user: IUser;
    isAdmin: boolean;
}