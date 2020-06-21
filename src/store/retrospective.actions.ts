import {IUserRetrospective} from "../models/IUserRetrospective";
import {Action} from "redux";
import {RetrospectiveService} from "../services/RetrospectiveService";
import {AppThunk} from "./store";
import {IEvaluation} from "../models/IEvaluation";

export enum RetrospectiveActionTypes {
    LOADED = '[RETROSPECTIVES] LOADED',
    ADDED = '[RETROSPECTIVES] ADDED',
    ADDED_EVALUATION = '[RETROSPECTIVES] ADDED EVALUATION',
    UPDATED_EVALUATION = '[RETROSPECTIVES] UPDATED EVALUATION',
}

const service = new RetrospectiveService();

export const LoadAll = (): AppThunk => async dispatch => {
    const retrospectives = await service.getAll()
    dispatch(new Loaded(retrospectives))
}

export class Loaded implements Action {
    public readonly type = RetrospectiveActionTypes.LOADED;

    constructor(public retrospectives: IUserRetrospective[]) {}
}

export class Added implements Action {
    readonly type = RetrospectiveActionTypes.ADDED;

    constructor(public retrospective: IUserRetrospective) {
    }
}

export const CreateOrUpdate = (retrospective: IUserRetrospective): AppThunk => async dispatch => {
    const persistedRetrospective = await service.create(retrospective)
    dispatch(new Added(persistedRetrospective))
}

export const CreateOrUpdateEvaluation = (evaluation: IEvaluation): AppThunk => async dispatch => {
    const isExistingEvaluation = !!evaluation.id;

    const persistedEvaluation = isExistingEvaluation
        ? await service.updateEvaluation(evaluation)
        : await service.addEvaluation(evaluation);

    dispatch(isExistingEvaluation
        ? new UpdatedEvaluation(persistedEvaluation)
        : new AddedEvaluation(persistedEvaluation)
    )
}

export class AddedEvaluation implements Action {
    readonly type = RetrospectiveActionTypes.ADDED_EVALUATION;

    constructor(public evaluation: IEvaluation) {}
}

export class UpdatedEvaluation implements Action {
    readonly type = RetrospectiveActionTypes.UPDATED_EVALUATION;

    constructor(public evaluation: IEvaluation) {}
}



export type RetrospectiveTypes
    = Loaded
    | Added
    | AddedEvaluation
    | UpdatedEvaluation
    ;