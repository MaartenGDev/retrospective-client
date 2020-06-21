import {ITimeUsageCategory} from "../models/ITimeUsageCategory";
import {TimeUsageCategoryActionTypes, TimeUsageCategoryTypes} from "./time-usage-category.actions";

export interface ITimeUsageCategoryState {
    timeUsageCategories: ITimeUsageCategory[]
}

const initialState: ITimeUsageCategoryState = {
    timeUsageCategories: []
}

export function timeUsageCategoryReducer(state: ITimeUsageCategoryState = initialState, action: TimeUsageCategoryTypes) {
    switch (action.type) {
        case TimeUsageCategoryActionTypes.LOADED:
            return {
                ...state,
                timeUsageCategories: action.timeUsageCategories
            }
        default:
            return state
    }
}
