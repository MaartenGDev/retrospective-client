import {IComment} from "./IComment";
import {ITimeUsage} from "./ITimeUsage";
import {IUser} from "./IUser";

export interface IEvaluation {
    id?: number;
    retrospectiveId: number;
    sprintRating: number;
    suggestedActions: string;
    suggestedTopics: string;
    comments: IComment[];
    timeUsage: ITimeUsage[];
    userId?: number;
    user?: IUser;
}