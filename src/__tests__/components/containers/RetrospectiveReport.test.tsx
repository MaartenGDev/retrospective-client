import React from 'react'
import {render, screen} from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import {RootState} from "../../../store/rootReducer";
import {ITeam} from "../../../models/ITeam";
import RetrospectiveReport from "../../../components/containers/RetrospectiveReport";
import {ICommentCategory} from "../../../models/ICommentCategory";
import {IUser} from "../../../models/IUser";
import {ISuggestedTopic} from "../../../models/ISuggestedTopic";
import {ITopic} from "../../../models/ITopic";
import {IAction} from "../../../models/IAction";
import {IComment} from "../../../models/IComment";

test('Should show the comments and suggested topics from the retrospective report', () => {
    const user = {id: 1, fullName: 'Test'} as IUser;

    const category = {id: 1, description: 'hello world'};

    const comments = [
        {id: 1, body: 'Comment A', categoryId: category.id, category, evaluation: {user}},
        {id: 2, body: 'Comment B', categoryId: category.id, category, evaluation: {user}},
    ] as IComment[];

    const suggestedTopics = [
        {id: 1, description: 'hello world', suggestedBy: {id: 1, fullName: 'User 1'}},
        {id: 2, description: 'hello world', suggestedBy: {id: 2, fullName: 'User 2'}},
    ] as ISuggestedTopic[];

    const topics = [
        {id: 1, order: 2, description: 'Second row', durationInMinutes: 30},
        {id: 2, order: 1, description: 'First row', durationInMinutes: 40},
    ] as ITopic[];

    const state = {
        commentCategoryReducer: {commentCategories: [category] as ICommentCategory[]},
        retrospectiveReducer: {
            retrospectiveReport: {
                retrospective: {
                    topics: topics,
                    actions: [] as IAction[]
                },
                suggestedTopics,
                suggestedActions: [] as IAction[],
                comments
            },
            isLoadingReport: false
        },
        authenticationReducer: {user: user},
        teamReducer: {teams: [] as ITeam[]}
    } as RootState

    render(<RetrospectiveReport/>, {
        initialState: state
    })

    comments.forEach(comment => {
        expect(screen.getByTestId(`comment-${comment.id}-value`)).toHaveTextContent(comment.body);
    })

    const sortedTopics = [...topics].sort((a,b) => a.order - b.order);

    sortedTopics.forEach((topic, index) => {
        expect(screen.getByTestId(`topic-description-by-index-${index}`)).toHaveTextContent(topic.description);
        expect(screen.getByTestId(`topic-duration-by-index-${index}`)).toHaveTextContent(`${topic.durationInMinutes} minutes`);
    })

    suggestedTopics.forEach(topic => {
        expect(screen.getByTestId(`suggested-topic-${topic.id}-description`)).toHaveTextContent(topic.description);
        expect(screen.getByTestId(`suggested-topic-${topic.id}-suggested-by`)).toHaveTextContent(`Suggested (By ${topic.suggestedBy.fullName})`);
    })
})