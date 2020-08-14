import {IUser} from "../models/IUser";
import {AuthenticationActionTypes, AuthenticationTypes} from "./authentication.actions";

export interface IAuthenticationState {
    user?: IUser,
    isLoadingUser: boolean
}

const initialState: IAuthenticationState = {
    user: undefined,
    isLoadingUser: true
}

export function authenticationReducer(state: IAuthenticationState = initialState, action: AuthenticationTypes) {
    switch (action.type) {
        case AuthenticationActionTypes.LOADING:
            return {
                ...state,
                isLoadingUser: true
            }
        case AuthenticationActionTypes.LOADED:
            return {
                ...state,
                user: action.user,
                isLoadingUser: false
            }
        case AuthenticationActionTypes.LOGGED_OUT:
            return {
                ...state,
                user: undefined
            }
        default:
            return state
    }
}
