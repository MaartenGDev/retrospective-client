import {retrospectiveReducer} from "./retrospective.reducer";
import {combineReducers} from "redux";
import {commentCategoryReducer} from "./comment-category.reducer";
import {timeUsageCategoryReducer} from "./time-usage-category.reducer";
import {teamReducer} from "./team.reducer";
import {authenticationReducer} from "./authentication.reducer";
import {insightReducer} from "./insight.reducer";
import {teamMemberRoleReducer} from "./team-member-roles.reducer";
import {notificationReducer} from "./notification.reducer";

const rootReducer = combineReducers({
    retrospectiveReducer,
    commentCategoryReducer,
    timeUsageCategoryReducer,
    teamReducer,
    authenticationReducer,
    insightReducer,
    teamMemberRoleReducer,
    notificationReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer