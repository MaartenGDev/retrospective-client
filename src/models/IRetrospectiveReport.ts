import {IComment} from "./IComment";
import {IUserRetrospective} from "./IUserRetrospective";
import {ITopic} from "./ITopic";
import {IAction} from "./IAction";

export interface IRetrospectiveReport {
    retrospective: IUserRetrospective;
    comments: IComment[];
    suggestedTopics: ITopic[];
    suggestedActions: IAction[];
}