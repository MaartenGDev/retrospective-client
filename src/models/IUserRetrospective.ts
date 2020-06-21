import {ITopic} from "./ITopic";
import {IAction} from "./IAction";
import {IEvaluation} from "./IEvaluation";

export interface IUserRetrospective {
    id?: number;
    name: string;
    startDate: string;
    endDate: string;
    topics: ITopic[];
    actions: IAction[];
    evaluation?: IEvaluation,
}