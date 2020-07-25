import {Action} from "redux";
import {AppThunk} from "./store";
import {IInsight} from "../models/IInsight";
import {InsightService} from "../services/InsightService";
import {ITeamMemberInsight} from "../models/ITeamMemberInsight";

export enum InsightActionTypes {
    LOADED = '[INSIGHT] LOADED',
    LOADED_FOR_TEAM_MEMBERS = '[INSIGHT] LOADED_FOR_TEAM_MEMBERS',
}

const service = new InsightService();

export class Loaded implements Action {
    public readonly type = InsightActionTypes.LOADED;

    constructor(public insight: IInsight) {}
}

export class LoadedForTeamMembers implements Action {
    public readonly type = InsightActionTypes.LOADED_FOR_TEAM_MEMBERS;

    constructor(public teamMemberInsights: ITeamMemberInsight[]) {}
}

export const LoadWithFilter = (teamId: number|string, filter: string): AppThunk => async dispatch => {
    const teams = await service.getWithFilter(teamId, filter)
    dispatch(new Loaded(teams))
}

export const LoadForTeamMembers = (teamId: number|string): AppThunk => async dispatch => {
    const teams = await service.getForTeamMembers(teamId)
    dispatch(new LoadedForTeamMembers(teams))
}


export type InsightTypes
    = Loaded
    | LoadedForTeamMembers
    ;