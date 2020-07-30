import {IComment} from "./IComment";
import {ITimeUsage} from "./ITimeUsage";
import {IUser} from "./IUser";
import {EntityIdentifier} from "../types";

export interface IEvaluation {
    id?: EntityIdentifier;
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