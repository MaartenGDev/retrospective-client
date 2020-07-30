import {EntityIdentifier} from "../types";

export interface ITimeUsage {
    id?: EntityIdentifier;
    percentage: number;
    categoryId: number;
}