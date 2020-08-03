import {RetrospectiveActionTypes, RetrospectiveTypes} from "./retrospective.actions";
import {IUserRetrospective} from "../models/IUserRetrospective";
import {IRetrospectiveReport} from "../models/IRetrospectiveReport";

export interface IRetrospectivesState {
    retrospectives: IUserRetrospective[],
    retrospectiveReport?: IRetrospectiveReport
}

const initialState: IRetrospectivesState = {
    retrospectives: [],
    retrospectiveReport: undefined
}

const sort = (retrospectives: IUserRetrospective[]) => [...retrospectives]
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());


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
                retrospectives: sort([action.retrospective, ...state.retrospectives])

            }
        case RetrospectiveActionTypes.UPDATED:
            return {
                ...state,
                retrospectives: sort([...state.retrospectives.filter(r => r.id !== action.retrospective.id), action.retrospective])
            }
        case RetrospectiveActionTypes.UPDATED_EVALUATION:
            const otherRetrospectives = state.retrospectives.filter(r => r.id !== action.evaluation.retrospectiveId);
            const retrospectiveToUpdate = state.retrospectives.find(r => r.id === action.evaluation.retrospectiveId)!;

            return {
                ...state,
                retrospectives: sort([...otherRetrospectives, {...retrospectiveToUpdate, evaluation: action.evaluation}])
            }
        case RetrospectiveActionTypes.LOADED_REPORT:
            return {
                ...state,
                retrospectiveReport: action.retrospectiveReport
            }
        default:
            return state
    }
}
