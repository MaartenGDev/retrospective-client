import {IInsight} from "../models/IInsight";
import {InsightActionTypes, InsightTypes} from "./insight.actions";
import {ITeamMemberInsight} from "../models/ITeamMemberInsight";

export interface IInsightState {
    insight?: IInsight,
    teamMemberInsights: ITeamMemberInsight[]
}

const initialState: IInsightState = {
    insight: undefined,
    teamMemberInsights: []
}

export function insightReducer(state: IInsightState = initialState, action: InsightTypes) {
    switch (action.type) {
        case InsightActionTypes.LOADED:
            return {
                ...state,
                insight: action.insight
            }
        case InsightActionTypes.LOADED_FOR_TEAM_MEMBERS:
            return {
                ...state,
                teamMemberInsights: action.teamMemberInsights
            }
        default:
            return state
    }
}
