import {IRetrospective} from "../models/IRetrospective";
import {Action} from "redux";
import {RetrospectiveService} from "../services/RetrospectiveService";
import {AppThunk} from "./store";
import {IEvaluation} from "../models/IEvaluation";

export enum RetrospectiveActionTypes {
    LOADED = '[RETROSPECTIVES] LOADED',
    ADD = '[RETROSPECTIVES] ADD',
    ADDED = '[RETROSPECTIVES] ADDED',
    ADDED_EVALUATION = '[RETROSPECTIVES] ADDED EVALUATION',
}

const service = new RetrospectiveService();

export const LoadAll = (): AppThunk => async dispatch => {
    const retrospectives = await service.getAll()
    dispatch(new Loaded(retrospectives))
}

export class Loaded implements Action {
    public readonly type = RetrospectiveActionTypes.LOADED;

    constructor(public retrospectives: IRetrospective[]) {}
}

export class Added implements Action {
    readonly type = RetrospectiveActionTypes.ADDED;

    constructor(public retrospective: IRetrospective) {
    }
}

export const CreateOrUpdate = (retrospective: IRetrospective): AppThunk => async dispatch => {
    const persistedRetrospective = await service.create(retrospective)
    dispatch(new Added(persistedRetrospective))
}

export const AddEvaluation = (evaluation: IEvaluation): AppThunk => async dispatch => {
    const persistedEvaluation = await service.addEvaluation(evaluation)
    dispatch(new AddedEvaluation(persistedEvaluation))
}

export class AddedEvaluation implements Action {
    readonly type = RetrospectiveActionTypes.ADDED_EVALUATION;

    constructor(public evaluation: IEvaluation) {}
}


export type RetrospectiveTypes
    = Loaded
    | Added
    | AddedEvaluation
    ;