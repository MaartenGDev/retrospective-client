import rootReducer, {RootState} from './rootReducer'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action, AnyAction, applyMiddleware, createStore, Middleware} from "redux";

type DispatchFunctionType = ThunkDispatch<RootState, undefined, AnyAction>

const clazzActions: Middleware = _ => (next) => (action) => {
    const isActionType = action.hasOwnProperty('type');
    next(isActionType ? {...action} : action);
};


export const store = createStore(
    rootReducer,
    applyMiddleware<DispatchFunctionType, RootState>(
        thunkMiddleware,
        clazzActions,
    )
)
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>