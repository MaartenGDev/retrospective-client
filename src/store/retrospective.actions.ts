import {IRetrospective} from "../models/IRetrospective";
import {Action} from "redux";
import {RetrospectiveService} from "../services/RetrospectiveService";
import {AppThunk} from "./store";

export enum RetrospectiveActionTypes {
    LOAD_ALL = '[RETROSPECTIVES] LOAD ALL',
    LOADED = '[RETROSPECTIVES] LOADED',
    ADD = '[RETROSPECTIVES] ADD',
    ADDED = '[RETROSPECTIVES] ADDED',
}

export const LoadAll = (): AppThunk => async dispatch => {
    const retrospectives = await new RetrospectiveService().getAll()
    dispatch(new Loaded(retrospectives))
}

export class Loaded implements Action {
    public readonly type = RetrospectiveActionTypes.LOADED;

    constructor(public retrospectives: IRetrospective[]) {}
}

export class Add implements Action {
    readonly type = RetrospectiveActionTypes.ADD;

    constructor(public retrospective: IRetrospective) {
    }
}

export class Added implements Action {
    readonly type = RetrospectiveActionTypes.ADDED;

    constructor(public retrospective: IRetrospective) {
    }
}

export type RetrospectiveTypes
    = Loaded
    | Add
    | Added
    ;