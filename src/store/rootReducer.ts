import {retrospectiveReducer} from "./retrospective.reducer";
import {combineReducers} from "redux";
import {commentCategoryReducer} from "./comment-category.reducer";

const rootReducer = combineReducers({
    retrospectiveReducer,
    commentCategoryReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer