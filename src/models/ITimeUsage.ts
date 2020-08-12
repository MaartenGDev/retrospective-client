import {EntityIdentifier} from "../types";
import {ITimeUsageCategory} from "./ITimeUsageCategory";

export interface ITimeUsage {
    id?: EntityIdentifier;
    percentage: number;
    categoryId: number;
    category: ITimeUsageCategory;
}