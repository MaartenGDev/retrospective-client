import {IUserRetrospective} from "../models/IUserRetrospective";
import {Action} from "redux";
import {RetrospectiveService} from "../services/RetrospectiveService";
import {AppThunk} from "./store";
import {IEvaluation} from "../models/IEvaluation";
import {IRetrospectiveReport} from "../models/IRetrospectiveReport";

export enum RetrospectiveActionTypes {
    LOADED = '[RETROSPECTIVES] LOADED',
    ADDED = '[RETROSPECTIVES] ADDED',
    UPDATED = '[RETROSPECTIVES] UPDATED',
    ADDED_EVALUATION = '[RETROSPECTIVES] ADDED EVALUATION',
    UPDATED_EVALUATION = '[RETROSPECTIVES] UPDATED EVALUATION',
    LOADED_REPORT = '[RETROSPECTIVES] LOADED REPORT',
}

const service = new RetrospectiveService();


export class Loaded implements Action {
    public readonly type = RetrospectiveActionTypes.LOADED;

    constructor(public retrospectives: IUserRetrospective[]) {}
}

export class Added implements Action {
    readonly type = RetrospectiveActionTypes.ADDED;

    constructor(public retrospective: IUserRetrospective) {
    }
}

export class Updated implements Action {
    readonly type = RetrospectiveActionTypes.UPDATED;

    constructor(public retrospective: IUserRetrospective) {
    }
}


export class AddedEvaluation implements Action {
    readonly type = RetrospectiveActionTypes.ADDED_EVALUATION;

    constructor(public evaluation: IEvaluation) {}
}

export class UpdatedEvaluation implements Action {
    readonly type = RetrospectiveActionTypes.UPDATED_EVALUATION;

    constructor(public evaluation: IEvaluation) {}
}

export class LoadedReport implements Action {
    public readonly type = RetrospectiveActionTypes.LOADED_REPORT;

    constructor(public retrospectiveReport: IRetrospectiveReport) {}
}


export const LoadAll = (): AppThunk => async dispatch => {
    const retrospectives = await service.getAll()
    dispatch(new Loaded(retrospectives))
}

export const CreateOrUpdate = (retrospective: IUserRetrospective): AppThunk => async dispatch => {
    const isExistingRetrospective = !!retrospective.id;

    const persistedRetrospective = isExistingRetrospective
        ? await service.update(retrospective)
        : await service.create(retrospective);

    dispatch(isExistingRetrospective
        ? new Updated(persistedRetrospective)
        : new Added(persistedRetrospective));
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

export const LoadReport = (retrospectiveId: number): AppThunk => async dispatch => {
    const report = await service.getReport(retrospectiveId)
    dispatch(new LoadedReport(report))
}

export type RetrospectiveTypes
    = Loaded
    | Added
    | Updated
    | AddedEvaluation
    | UpdatedEvaluation
    | LoadedReport
    ;