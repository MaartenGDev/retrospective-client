import {IComment} from "./IComment";
import {IUserRetrospective} from "./IUserRetrospective";
import {IAction} from "./IAction";
import {ISuggestedTopic} from "./ISuggestedTopic";

export interface IRetrospectiveReport {
    retrospective?: IUserRetrospective;
    comments: IComment[];
    suggestedTopics: ISuggestedTopic[];
    suggestedActions: IAction[];
}