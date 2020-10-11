import {IUserRetrospective} from "../models/IUserRetrospective";
import {Action} from "redux";
import {RetrospectiveService} from "../services/RetrospectiveService";
import {AppThunk} from "./store";
import {IEvaluation} from "../models/IEvaluation";
import {IRetrospectiveReport} from "../models/IRetrospectiveReport";
import {EntityIdentifier} from "../types";
import {HttpFailed} from "./notification.actions";
import {IAction} from "../models/IAction";

export enum RetrospectiveActionTypes {
    LOADING = '[RETROSPECTIVES] LOADING',
    LOADING_RETROSPECTIVES_FAILED = '[RETROSPECTIVES] LOADING RETROSPECTIVES FAILED',
    LOADED = '[RETROSPECTIVES] LOADED',
    ADDED = '[RETROSPECTIVES] ADDED',
    UPDATED = '[RETROSPECTIVES] UPDATED',
    DELETED = '[RETROSPECTIVES] DELETED',
    UPDATED_EVALUATION = '[RETROSPECTIVES] UPDATED EVALUATION',
    LOADING_REPORT = '[RETROSPECTIVES] LOADING REPORT',
    LOADING_REPORT_FAILED = '[RETROSPECTIVES] LOADING REPORT FAILED',
    LOADED_REPORT = '[RETROSPECTIVES] LOADED REPORT',
    ADDED_ACTION = '[RETROSPECTIVES] ADDED ACTION',
    UPDATED_ACTION = '[RETROSPECTIVES] UPDATED ACTION',
    COMPLETED_ACTION = '[RETROSPECTIVES] COMPLETED ACTION',
}

const service = new RetrospectiveService();

export class Loading implements Action {
    public readonly type = RetrospectiveActionTypes.LOADING;
}

export class LoadingRetrospectivesFailed implements Action {
    readonly type = RetrospectiveActionTypes.LOADING_RETROSPECTIVES_FAILED;
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

export class UpdatedEvaluation implements Action {
    readonly type = RetrospectiveActionTypes.UPDATED_EVALUATION;

    constructor(public evaluation: IEvaluation) {
    }
}

export class LoadingReport implements Action {
    public readonly type = RetrospectiveActionTypes.LOADING_REPORT;
}

export class LoadingReportFailed implements Action {
    readonly type = RetrospectiveActionTypes.LOADING_REPORT_FAILED;
}

export class LoadedReport implements Action {
    public readonly type = RetrospectiveActionTypes.LOADED_REPORT;

    constructor(public retrospectiveReport: IRetrospectiveReport) {
    }
}

export class AddedAction implements Action {
    public readonly type = RetrospectiveActionTypes.ADDED_ACTION;

    constructor(public action: IAction) {
    }
}

export class UpdatedAction implements Action {
    public readonly type = RetrospectiveActionTypes.UPDATED_ACTION;

    constructor(public payload: IAction) {}
}

export class CompletedAction implements Action {
    public readonly type = RetrospectiveActionTypes.COMPLETED_ACTION;

    constructor(public payload: IAction) {}
}

export const LoadAll = (): AppThunk => async dispatch => {
    try {
        dispatch(new Loading());
        const retrospectives = await service.getAll()
        dispatch(new Loaded(retrospectives))
    }catch (e){
        dispatch(new LoadingReportFailed());
        dispatch(new HttpFailed(e));
    }
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

export const LoadReport = (retrospectiveId: EntityIdentifier): AppThunk => async dispatch => {
    try {
        dispatch(new LoadingReport());
        const report = await service.getReport(retrospectiveId)
        dispatch(new LoadedReport(report))
    } catch (e) {
        dispatch(new LoadingReportFailed())
        dispatch(new HttpFailed(e))
    }
}

export const AddAction = (retrospectiveId: EntityIdentifier, action: IAction): AppThunk => async dispatch => {
    try {
        const persistedAction = await service.addAction(retrospectiveId, action);
        dispatch(new AddedAction(persistedAction))
    } catch (e) {
        dispatch(new HttpFailed(e))
    }
}

export const UpdateAction = (retrospectiveId: EntityIdentifier, action: IAction): AppThunk => async dispatch => {
    try {
        const persistedAction = await service.updateAction(retrospectiveId, action);
        dispatch(new UpdatedAction(persistedAction))
    } catch (e) {
        dispatch(new HttpFailed(e))
    }
}

export const CompleteAction = (retrospectiveId: EntityIdentifier, actionId: EntityIdentifier): AppThunk => async dispatch => {
    try {
        const persistedAction = await service.completeAction(retrospectiveId, actionId);
        dispatch(new CompletedAction(persistedAction))
    } catch (e) {
        dispatch(new HttpFailed(e))
    }
}



export type RetrospectiveTypes
    = Loading
    | Loaded
    | Added
    | Updated
    | Deleted
    | LoadingReportFailed
    | UpdatedEvaluation
    | LoadingReport
    | LoadedReport
    | AddedAction
    | UpdatedAction
    | CompletedAction
    ;