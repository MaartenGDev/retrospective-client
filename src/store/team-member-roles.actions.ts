import {Action} from "redux";
import {AppThunk} from "./store";
import {TeamMemberRolesService} from "../services/TeamMemberRolesService";
import {IRole} from "../models/IRole";

export enum TeamMemberRolesActionTypes {
    LOADED = '[TEAM MEMBER ROLES] LOADED',
}

const service = new TeamMemberRolesService();

export class Loaded implements Action {
    public readonly type = TeamMemberRolesActionTypes.LOADED;

    constructor(public roles: IRole[]) {}
}


export const LoadAll = (): AppThunk => async dispatch => {
    const roles = await service.getAll()
    dispatch(new Loaded(roles))
}

export type TeamMemberRolesTypes
    = Loaded
    ;