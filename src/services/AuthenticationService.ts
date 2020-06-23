import {HttpClient} from "./HttpClient";
import {ITeam} from "../models/ITeam";
import {IUser} from "../models/IUser";

const http = new HttpClient();

export class AuthenticationService {
    me(): Promise<IUser> {
        return http.get('account/me');
    }
}