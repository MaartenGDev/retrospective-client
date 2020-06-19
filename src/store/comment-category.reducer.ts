import {ICommentCategory} from "../models/ICommentCategory";
import {CommentCategoryActionTypes, CommentCategoryTypes} from "./comment-category.actions";

export interface ICommentCategoryState {
    commentCategories: ICommentCategory[]
}

const initialState: ICommentCategoryState = {
    commentCategories: []
}

export function commentCategoryReducer(state: ICommentCategoryState = initialState, action: CommentCategoryTypes) {
    switch (action.type) {
        case CommentCategoryActionTypes.LOADED:
            return {
                ...state,
                commentCategories: action.commentCategories
            }
        default:
            return state
    }
}
