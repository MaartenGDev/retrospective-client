import {Action} from "redux";
import {AppThunk} from "./store";
import {CommentCategoryService} from "../services/CommentCategoryService";
import {ICommentCategory} from "../models/ICommentCategory";

export enum CommentCategoryActionTypes {
    LOADED = '[COMMENT-CATEGORY] LOADED',
}

const service = new CommentCategoryService();

export class Loaded implements Action {
    public readonly type = CommentCategoryActionTypes.LOADED;

    constructor(public commentCategories: ICommentCategory[]) {}
}

export const LoadAll = (): AppThunk => async dispatch => {
    const commentCategories = await service.getAll()
    dispatch(new Loaded(commentCategories))
}


export type CommentCategoryTypes
    = Loaded
    ;