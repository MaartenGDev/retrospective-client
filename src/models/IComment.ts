import {ICommentCategory} from "./ICommentCategory";

export interface IComment {
    id: number;
    name: string;
    category: ICommentCategory;
}