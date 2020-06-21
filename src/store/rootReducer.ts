import {retrospectiveReducer} from "./retrospective.reducer";
import {combineReducers} from "redux";
import {commentCategoryReducer} from "./comment-category.reducer";
import {timeUsageCategoryReducer} from "./time-usage-category.reducer";

const rootReducer = combineReducers({
    retrospectiveReducer,
    commentCategoryReducer,
    timeUsageCategoryReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer