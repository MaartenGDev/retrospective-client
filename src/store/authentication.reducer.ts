import {IUser} from "../models/IUser";
import {AuthenticationActionTypes, AuthenticationTypes} from "./authentication.actions";

export interface IAuthenticationState {
    user?: IUser
}

const initialState: IAuthenticationState = {
    user: undefined
}

export function authenticationReducer(state: IAuthenticationState = initialState, action: AuthenticationTypes) {
    switch (action.type) {
        case AuthenticationActionTypes.LOADED:
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}
