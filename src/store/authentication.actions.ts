import {Action} from "redux";
import {AppThunk} from "./store";
import {AuthenticationService} from "../services/AuthenticationService";
import {IUser} from "../models/IUser";
import {ICredentials} from "../models/dto/ICredentials";
import Config from "../Config";

export enum AuthenticationActionTypes {
    LOADED = '[AUTHENTICATION] LOADED',
    LOGIN = '[AUTHENTICATION] LOGIN',
}

const service = new AuthenticationService();

export class Loaded implements Action {
    public readonly type = AuthenticationActionTypes.LOADED;

    constructor(public user: IUser) {}
}

export const Load = (): AppThunk => async dispatch => {
    const teams = await service.me()
    dispatch(new Loaded(teams))
}

export const Login = (credentials: ICredentials): AppThunk => async dispatch => {
    const response = await service.login(credentials)

    if(response.success){
        localStorage.setItem(Config.AUTH_TOKEN_NAME, response.token);
        dispatch(new Loaded(response.user))
        return;
    }

    console.warn('Login failed!')
}

export type AuthenticationTypes
    = Loaded
    ;