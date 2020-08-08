import {NotificationActionTypes, NotificationTypes} from "./notification.actions";

export interface INotificationState {
    showNotification: boolean,
    message: string
}

const initialState: INotificationState = {
    showNotification: false,
    message: ''
}

export function notificationReducer(state: INotificationState = initialState, action: NotificationTypes) {
    switch (action.type) {
        case NotificationActionTypes.HTTP_FAILED:
            return {
                ...state,
                showNotification: true,
                message: action.message
            }
        case NotificationActionTypes.DISMISS:
            return {
                ...state,
                showNotification: false,
                message: ''
            }
        default:
            return state
    }
}
