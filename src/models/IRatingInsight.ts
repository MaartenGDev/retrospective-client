import {IUserRetrospective} from "./IUserRetrospective";

export interface IRatingInsight {
    userId: string;
    fullName: string;
    sprintRating: number;
    sprintRatingExplanation: string;
    retrospective: IUserRetrospective;
}