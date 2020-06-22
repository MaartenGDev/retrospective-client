import {TeamActionTypes, TeamTypes} from "./team.actions";
import {ITeam} from "../models/ITeam";

export interface ITeamState {
    teams: ITeam[]
}

const initialState: ITeamState = {
    teams: [] as ITeam[]
}

export function teamReducer(state: ITeamState = initialState, action: TeamTypes) {
    switch (action.type) {
        case TeamActionTypes.LOADED:
            return {
                ...state,
                teams: action.teams
            }
        default:
            return state
    }
}
