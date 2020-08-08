import {Action} from "redux";

export enum NotificationActionTypes {
    HTTP_FAILED = '[NOTIFICATIONS] HTTP FAILED',
    DISMISS = '[NOTIFICATIONS] DISMISS',
}

export class HttpFailed implements Action {
    public readonly type = NotificationActionTypes.HTTP_FAILED;

    constructor(public message: string) {}
}

export class Dismiss implements Action {
    public readonly type = NotificationActionTypes.DISMISS;
}

export type NotificationTypes
    = HttpFailed
    | Dismiss
    ;