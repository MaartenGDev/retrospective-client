import {retrospectiveReducer} from "./retrospective.reducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    retrospectiveReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer