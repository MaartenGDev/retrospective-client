import {Action} from "redux";
import {AppThunk} from "./store";
import {AuthenticationService} from "../services/AuthenticationService";
import {IUser} from "../models/IUser";
import {ICredentials} from "../models/dto/ICredentials";
import Config from "../Config";
import {HttpFailed} from "./notification.actions";

export enum AuthenticationActionTypes {
    LOADING = '[AUTHENTICATION] LOADING',
    LOADED = '[AUTHENTICATION] LOADED',
    LOGGED_OUT = '[AUTHENTICATION] LOGGED_OUT',
}

const service = new AuthenticationService();

export class LoggedOut implements Action {
    public readonly type = AuthenticationActionTypes.LOGGED_OUT;
}

export class Loading implements Action {
    public readonly type = AuthenticationActionTypes.LOADING;
}


export class Loaded implements Action {
    public readonly type = AuthenticationActionTypes.LOADED;

    constructor(public user: IUser) {
    }
}

export const Load = (): AppThunk => async dispatch => {
    dispatch(new Loading())
    const user = await service.me()
    dispatch(new Loaded(user))
}

export const Login = (credentials: ICredentials): AppThunk => async dispatch => {
    try {
        const response = await service.login(credentials)
        localStorage.setItem(Config.AUTH_TOKEN_NAME, response.token);
        dispatch(new Loaded(response.user))
    } catch (e) {
        dispatch(new HttpFailed(e))
    }
}

export const Register = (credentials: ICredentials): AppThunk => async dispatch => {
    try {
        const response = await service.register(credentials)
        localStorage.setItem(Config.AUTH_TOKEN_NAME, response.token);
        dispatch(new Loaded(response.user))
    } catch (e) {
        dispatch(new HttpFailed(e))
    }
}

export const Logout = (): AppThunk => async dispatch => {
    await service.logout()
    localStorage.removeItem(Config.AUTH_TOKEN_NAME);

    dispatch(new LoggedOut())
}

export type AuthenticationTypes
    = Loading
    | Loaded
    | LoggedOut
    ;