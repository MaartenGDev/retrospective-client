import {IComment} from "./IComment";
import {IUserRetrospective} from "./IUserRetrospective";
import {ISuggestedTopic} from "./ISuggestedTopic";
import {ISuggestedAction} from "./ISuggestedAction";

export interface IRetrospectiveReport {
    retrospective: IUserRetrospective;
    comments: IComment[];
    suggestedTopics: ISuggestedTopic[];
    suggestedActions: ISuggestedAction[];
}