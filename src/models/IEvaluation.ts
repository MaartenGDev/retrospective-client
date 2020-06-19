import {IComment} from "./IComment";

export interface IEvaluation {
    retrospectiveId: number;
    timeUsage: {name: string, value: number, color: string}[],
    sprintRating: number,
    suggestedActions: string,
    suggestedTopics: string,
    comments: IComment[]
}