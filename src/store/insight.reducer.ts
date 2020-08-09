import {IInsight} from "../models/IInsight";
import {InsightActionTypes, InsightTypes} from "./insight.actions";
import {ITeamMemberInsight} from "../models/ITeamMemberInsight";
import {IRatingInsight} from "../models/IRatingInsight";

export interface IInsightState {
    insight?: IInsight,
    teamMemberInsights: ITeamMemberInsight[],
    ratingInsights: IRatingInsight[],
}

const initialState: IInsightState = {
    insight: undefined,
    teamMemberInsights: [],
    ratingInsights: []
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
        case InsightActionTypes.LOADED_RATINGS:
            return {
                ...state,
                ratingInsights: action.ratingInsights
            }
        default:
            return state
    }
}
