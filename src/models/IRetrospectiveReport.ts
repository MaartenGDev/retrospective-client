import {IComment} from "./IComment";
import {IUserRetrospective} from "./IUserRetrospective";

export interface IRetrospectiveReport {
    retrospective: IUserRetrospective;
    comments: IComment[];
}