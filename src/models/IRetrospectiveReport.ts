import {IComment} from "./IComment";
import {IUserRetrospective} from "./IUserRetrospective";
import {ISuggestedTopic} from "./ISuggestedTopic";
import {ISuggestedAction} from "./ISuggestedAction";
import {IAction} from "./IAction";

export interface IRetrospectiveReport {
    retrospective: IUserRetrospective;
    comments: IComment[];
    actions: IAction[];
    suggestedTopics: ISuggestedTopic[];
    suggestedActions: ISuggestedAction[];
}