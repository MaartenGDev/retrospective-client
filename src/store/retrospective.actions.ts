import {IUserRetrospective} from "../models/IUserRetrospective";
import {Action} from "redux";
import {RetrospectiveService} from "../services/RetrospectiveService";
import {AppThunk} from "./store";
import {IEvaluation} from "../models/IEvaluation";
import {IRetrospectiveReport} from "../models/IRetrospectiveReport";
import {EntityIdentifier} from "../types";
import {HttpFailed} from "./notification.actions";

export enum RetrospectiveActionTypes {
    LOADING = '[RETROSPECTIVES] LOADING',
    LOADED = '[RETROSPECTIVES] LOADED',
    ADDED = '[RETROSPECTIVES] ADDED',
    UPDATED = '[RETROSPECTIVES] UPDATED',
    DELETED = '[RETROSPECTIVES] DELETED',
    FAILED_ACTION = '[RETROSPECTIVES] FAILED ACTION',
    UPDATED_EVALUATION = '[RETROSPECTIVES] UPDATED EVALUATION',
    LOADING_REPORT = '[RETROSPECTIVES] LOADING REPORT',
    LOADED_REPORT = '[RETROSPECTIVES] LOADED REPORT',
}

const service = new RetrospectiveService();

export class Loading implements Action {
    public readonly type = RetrospectiveActionTypes.LOADING;
}

export class Loaded implements Action {
    public readonly type = RetrospectiveActionTypes.LOADED;

    constructor(public retrospectives: IUserRetrospective[]) {
    }
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

export class Deleted implements Action {
    readonly type = RetrospectiveActionTypes.DELETED;

    constructor(public retrospectiveId: EntityIdentifier) {
    }
}

export class ActionFailed implements Action {
    readonly type = RetrospectiveActionTypes.FAILED_ACTION;

    constructor() {
    }
}

export class UpdatedEvaluation implements Action {
    readonly type = RetrospectiveActionTypes.UPDATED_EVALUATION;

    constructor(public evaluation: IEvaluation) {
    }
}

export class LoadingReport implements Action {
    public readonly type = RetrospectiveActionTypes.LOADING_REPORT;
}

export class LoadedReport implements Action {
    public readonly type = RetrospectiveActionTypes.LOADED_REPORT;

    constructor(public retrospectiveReport: IRetrospectiveReport) {
    }
}


export const LoadAll = (): AppThunk => async dispatch => {
    dispatch(new Loading());
    const retrospectives = await service.getAll()
    dispatch(new Loaded(retrospectives))
}

export const CreateOrUpdate = (retrospective: IUserRetrospective): AppThunk => async dispatch => {
    try {
        const isExistingRetrospective = !!retrospective.id;

        const persistedRetrospective = isExistingRetrospective
            ? await service.update(retrospective)
            : await service.create(retrospective);

        dispatch(isExistingRetrospective
            ? new Updated(persistedRetrospective)
            : new Added(persistedRetrospective));

    } catch (e) {
        dispatch(new HttpFailed(e));
    }
}

export const Delete = (retrospectiveId: EntityIdentifier): AppThunk => async dispatch => {
    try {
        await service.delete(retrospectiveId);
        dispatch(new Deleted(retrospectiveId));
    } catch (e) {
        dispatch(new HttpFailed(e));
    }
}

export const CreateOrUpdateEvaluation = (evaluation: IEvaluation): AppThunk => async dispatch => {
    try {
        const persistedEvaluation = await service.updateEvaluation(evaluation);
        dispatch(new UpdatedEvaluation(persistedEvaluation))
    } catch (e) {
        dispatch(new HttpFailed(e))
    }
}

export const LoadReport = (retrospectiveId: number | string): AppThunk => async dispatch => {
    dispatch(new LoadingReport());

    try {
        const report = await service.getReport(retrospectiveId)
        dispatch(new LoadedReport(report))
    } catch (e) {
        dispatch(new ActionFailed())
    }
}

export type RetrospectiveTypes
    = Loading
    | Loaded
    | Added
    | Updated
    | Deleted
    | ActionFailed
    | UpdatedEvaluation
    | LoadingReport
    | LoadedReport
    ;