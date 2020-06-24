import {Action} from "redux";
import {AppThunk} from "./store";
import {TeamService} from "../services/TeamService";
import {ITeam} from "../models/ITeam";

export enum TeamActionTypes {
    LOADED = '[TEAMS] LOADED',
    ADDED = '[TEAMS] ADDED',
    UPDATED = '[TEAMS] UPDATED',
    DELETED = '[TEAMS] DELETED',
    LOADED_FOR_INVITE_CODE = '[TEAMS] LOADED FOR INVITE CODE',
}

const service = new TeamService();

export class Loaded implements Action {
    public readonly type = TeamActionTypes.LOADED;

    constructor(public teams: ITeam[]) {}
}

export class Added implements Action {
    public readonly type = TeamActionTypes.ADDED;

    constructor(public team: ITeam) {}
}

export class Updated implements Action {
    public readonly type = TeamActionTypes.UPDATED;

    constructor(public team: ITeam) {}
}

export class Deleted implements Action {
    public readonly type = TeamActionTypes.DELETED;

    constructor(public teamId: number) {}
}

export class LoadedForInviteCode implements Action {
    public readonly type = TeamActionTypes.LOADED_FOR_INVITE_CODE;

    constructor(public team: ITeam) {}
}


export const LoadAll = (): AppThunk => async dispatch => {
    const teams = await service.getAll()
    dispatch(new Loaded(teams))
}

export const CreateOrUpdate = (team: ITeam): AppThunk => async dispatch => {
    const isExistingTeam = !!team.id;

    const persistedTeam = isExistingTeam
        ? await service.update(team)
        : await service.create(team);

    dispatch(isExistingTeam
        ? new Updated(persistedTeam)
        : new Added(persistedTeam)
    )
}

export const Delete = (teamId: number): AppThunk => async dispatch => {
    await service.delete(teamId)

    dispatch(new Deleted(teamId));
}

export const FindByInviteCode = (inviteCode: string): AppThunk => async dispatch => {
    const team = await service.findByInviteCode(inviteCode)

    dispatch(new LoadedForInviteCode(team));
}

export type TeamTypes
    = Loaded
    | Added
    | Updated
    | Deleted
    | LoadedForInviteCode
    ;