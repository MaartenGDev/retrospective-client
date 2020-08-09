import {Action} from "redux";
import {AppThunk} from "./store";
import {IInsight} from "../models/IInsight";
import {InsightService} from "../services/InsightService";
import {ITeamMemberInsight} from "../models/ITeamMemberInsight";
import {EntityIdentifier} from "../types";
import {IRatingInsight} from "../models/IRatingInsight";

export enum InsightActionTypes {
    LOADED = '[INSIGHT] LOADED',
    LOADED_FOR_TEAM_MEMBERS = '[INSIGHT] LOADED FOR TEAM MEMBERS',
    LOADED_RATINGS = '[INSIGHT] LOADED RATINGS',
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

export class LoadedRatings implements Action {
    public readonly type = InsightActionTypes.LOADED_RATINGS;

    constructor(public ratingInsights: IRatingInsight[]) {}
}

export const LoadWithFilter = (teamId: EntityIdentifier, filter: string): AppThunk => async dispatch => {
    const teams = await service.getWithFilter(teamId, filter)
    dispatch(new Loaded(teams))
}

export const LoadForTeamMembers = (teamId: EntityIdentifier): AppThunk => async dispatch => {
    const teams = await service.getForTeamMembers(teamId)
    dispatch(new LoadedForTeamMembers(teams))
}

export const LoadRatings = (teamId: EntityIdentifier): AppThunk => async dispatch => {
    const ratings = await service.getRatings(teamId)
    dispatch(new LoadedRatings(ratings))
}

export type InsightTypes
    = Loaded
    | LoadedForTeamMembers
    | LoadedRatings
    ;