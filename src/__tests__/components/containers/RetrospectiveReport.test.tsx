import React from 'react'
import {createStore} from 'redux'
import {render, screen} from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Header from "../../../components/containers/Header";
import {RootState} from "../../../store/rootReducer";
import Retrospectives from "../../../components/containers/Retrospectives";
import {IUserRetrospective} from "../../../models/IUserRetrospective";
import {ITeam} from "../../../models/ITeam";
import {DateHelper} from "../../../helpers/DateHelper";
import {IEvaluation} from "../../../models/IEvaluation";
import RetrospectiveReport from "../../../components/containers/RetrospectiveReport";
import {ICommentCategory} from "../../../models/ICommentCategory";
import {IUser} from "../../../models/IUser";
import {ISuggestedTopic} from "../../../models/ISuggestedTopic";
import {ITopic} from "../../../models/ITopic";
import {IAction} from "../../../models/IAction";
import {IComment} from "../../../models/IComment";

test('Show create retrospective action if user can manage at least one team', () => {
    const user = {id: 1, fullName: 'Test'} as IUser;

    const category = {id: 1, description: 'hello world'};

    const state = {
        commentCategoryReducer: {commentCategories: [category] as ICommentCategory[]},
        retrospectiveReducer: {
            retrospectiveReport: {
                retrospective: {
                    topics: [] as ITopic[],
                    actions: [] as IAction[]
                },
                suggestedTopics: [] as ISuggestedTopic[],
                suggestedActions: [] as IAction[],
                comments: [
                    {id: 1, body: 'Comment A', categoryId: category.id, category, evaluation: {user}},
                    {id: 2, body: 'Comment B', categoryId: category.id, category, evaluation: {user}},
                ] as IComment[]
            },
            isLoadingReport: false
        },
        authenticationReducer: {user: user},
        teamReducer: {teams: [] as ITeam[]}
    } as RootState

    render(<RetrospectiveReport/>, {
        initialState: state
    })

    expect(screen.getByText(/Comment A/)).toBeInTheDocument();
    expect(screen.getByText(/Comment B/)).toBeInTheDocument();
})