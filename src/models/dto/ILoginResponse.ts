import {IUser} from "../IUser";

export interface ILoginResponse {
    success: boolean;
    token: string;
    user: IUser;
}