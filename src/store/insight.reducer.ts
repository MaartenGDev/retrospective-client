import {IInsight} from "../models/IInsight";
import {InsightActionTypes, InsightTypes} from "./insight.actions";

export interface IInsightState {
    insight?: IInsight
}

const initialState: IInsightState = {
    insight: undefined
}

export function insightReducer(state: IInsightState = initialState, action: InsightTypes) {
    switch (action.type) {
        case InsightActionTypes.LOADED:
            return {
                ...state,
                insight: action.insight
            }
        default:
            return state
    }
}
