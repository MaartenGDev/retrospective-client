import {Action} from "redux";
import {AppThunk} from "./store";
import {ITimeUsageCategory} from "../models/ITimeUsageCategory";
import {TimeUsageCategoryService} from "../services/TimeUsageCategoryService";

export enum TimeUsageCategoryActionTypes {
    LOADED = '[TIME-USAGE-CATEGORY] LOADED',
}

const service = new TimeUsageCategoryService();

export class Loaded implements Action {
    public readonly type = TimeUsageCategoryActionTypes.LOADED;

    constructor(public timeUsageCategories: ITimeUsageCategory[]) {}
}

export const LoadAll = (): AppThunk => async dispatch => {
    const timeUsageCategories = await service.getAll()
    dispatch(new Loaded(timeUsageCategories))
}


export type TimeUsageCategoryTypes
    = Loaded
    ;