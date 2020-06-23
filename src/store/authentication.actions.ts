import {Action} from "redux";
import {AppThunk} from "./store";
import {AuthenticationService} from "../services/AuthenticationService";
import {IUser} from "../models/IUser";

export enum AuthenticationActionTypes {
    LOADED = '[AUTHENTICATION] LOADED',
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


export type AuthenticationTypes
    = Loaded
    ;