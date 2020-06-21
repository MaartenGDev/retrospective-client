import {RetrospectiveActionTypes, RetrospectiveTypes} from "./retrospective.actions";
import {IUserRetrospective} from "../models/IUserRetrospective";

export interface IRetrospectivesState {
    retrospectives: IUserRetrospective[]
}

const initialState: IRetrospectivesState = {
    retrospectives: []
}

export function retrospectiveReducer(state: IRetrospectivesState = initialState, action: RetrospectiveTypes) {
    switch (action.type) {
        case RetrospectiveActionTypes.LOADED:
            return {
                ...state,
                retrospectives: action.retrospectives
            }
        case RetrospectiveActionTypes.ADDED:
            return {
                ...state,
                retrospectives: [action.retrospective, ...state.retrospectives]
            }
        case RetrospectiveActionTypes.UPDATED_EVALUATION:
        case RetrospectiveActionTypes.ADDED_EVALUATION:
            const otherRetrospectives = state.retrospectives.filter(r => r.id !== action.evaluation.retrospectiveId);
            const retrospectiveToUpdate = state.retrospectives.find(r => r.id === action.evaluation.retrospectiveId)!;
            return {
                ...state,
                retrospectives: [...otherRetrospectives, {...retrospectiveToUpdate, evaluation: action.evaluation}]
            }
        default:
            return state
    }
}
