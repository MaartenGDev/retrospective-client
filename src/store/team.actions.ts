import {Action} from "redux";
import {AppThunk} from "./store";
import {TeamService} from "../services/TeamService";
import {ITeam} from "../models/ITeam";

export enum TeamActionTypes {
    LOADED = '[TEAMS] LOADED',
    ADDED = '[TEAMS] ADDED',
    UPDATED = '[TEAMS] UPDATED',
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


export type TeamTypes
    = Loaded
    | Added
    | Updated
    ;