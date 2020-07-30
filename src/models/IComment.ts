import {ICommentCategory} from "./ICommentCategory";
import {IEvaluation} from "./IEvaluation";
import {EntityIdentifier} from "../types";

export interface IComment {
    id: EntityIdentifier;
    body: string;
    categoryId: number;
    category: ICommentCategory;
    evaluation?: IEvaluation;
}