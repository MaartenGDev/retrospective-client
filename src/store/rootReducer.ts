import {retrospectiveReducer} from "./retrospective.reducer";
import {combineReducers} from "redux";
import {commentCategoryReducer} from "./comment-category.reducer";
import {timeUsageCategoryReducer} from "./time-usage-category.reducer";
import {teamReducer} from "./team.reducer";
import {authenticationReducer} from "./authentication.reducer";
import {insightReducer} from "./insight.reducer";

const rootReducer = combineReducers({
    retrospectiveReducer,
    commentCategoryReducer,
    timeUsageCategoryReducer,
    teamReducer,
    authenticationReducer,
    insightReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer