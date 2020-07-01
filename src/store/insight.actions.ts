import {Action} from "redux";
import {AppThunk} from "./store";
import {IInsight} from "../models/IInsight";
import {InsightService} from "../services/InsightService";

export enum InsightActionTypes {
    LOADED = '[INSIGHT] LOADED',
}

const service = new InsightService();

export class Loaded implements Action {
    public readonly type = InsightActionTypes.LOADED;

    constructor(public insight: IInsight) {}
}

export const LoadWithFilter = (filter: string): AppThunk => async dispatch => {
    const teams = await service.getWithFilter(filter)
    dispatch(new Loaded(teams))
}


export type InsightTypes
    = Loaded
    ;