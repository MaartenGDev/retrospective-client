import {ICommentCategory} from "./ICommentCategory";

export interface IComment {
    id: number;
    body: string;
    categoryId: number;
    category: ICommentCategory;
}