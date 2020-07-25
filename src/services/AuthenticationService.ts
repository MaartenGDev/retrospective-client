import {HttpClient} from "./HttpClient";
import {IUser} from "../models/IUser";
import {ICredentials} from "../models/dto/ICredentials";
import {ILoginResponse} from "../models/dto/ILoginResponse";

const http = new HttpClient();

export class AuthenticationService {
    me(): Promise<IUser> {
        return http.get('account/me');
    }

    login(login: ICredentials): Promise<ILoginResponse> {
        return http.post('account/login', login);
    }
}