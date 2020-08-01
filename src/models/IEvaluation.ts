import {IComment} from "./IComment";
import {ITimeUsage} from "./ITimeUsage";
import {IUser} from "./IUser";
import {EntityIdentifier} from "../types";
import {IUserRetrospective} from "./IUserRetrospective";

export interface IEvaluation {
    id?: EntityIdentifier;
    retrospective?: IUserRetrospective;
    retrospectiveId: EntityIdentifier;
    sprintRating: number;
    sprintRatingExplanation: string;
    suggestedActions: string;
    suggestedTopics: string;
    comments: IComment[];
    timeUsage: ITimeUsage[];
    userId?: number;
    user?: IUser;
}