import {IComment} from "./IComment";
import {ITimeUsage} from "./ITimeUsage";

export interface IEvaluation {
    id: number;
    retrospectiveId: number;
    sprintRating: number,
    suggestedActions: string,
    suggestedTopics: string,
    comments: IComment[],
    timeUsage: ITimeUsage[],
}