import {ITimeUsageCategory} from "./ITimeUsageCategory";

export interface ITeamMemberInsight {
    userId: string;
    fullName: string;
    latestSprintRating: number;
    latestSprintRatingChangePercentage: number;
    timeUsage: {percentage: number, percentageChangePercentage: number, category: ITimeUsageCategory}[];
}