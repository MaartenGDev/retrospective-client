import {ICommentCategory} from "./ICommentCategory";
import {IEvaluation} from "./IEvaluation";

export interface IComment {
    id: number|string;
    body: string;
    categoryId: number;
    category: ICommentCategory;
    evaluation?: IEvaluation;
}