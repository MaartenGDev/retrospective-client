import {ITopic} from "./ITopic";
import {IAction} from "./IAction";

export interface IRetrospective {
    id?: number;
    name: string;
    startDate: string;
    endDate: string;
    topics: ITopic[],
    actions: IAction[],
}