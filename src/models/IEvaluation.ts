export interface IEvaluation {
    retrospectiveId: number;
    timeUsage: {name: string, value: number, color: string}[],
    sprintRating: number,
    suggestedActions: string,
    suggestedTopics: string,
    feedback: {[category: string]: string[]}
}