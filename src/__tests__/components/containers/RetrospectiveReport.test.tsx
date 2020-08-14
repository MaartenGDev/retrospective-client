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
import {ISuggestedAction} from "../../../models/ISuggestedAction";

test('Should hide not found if the retrospective report is still loading', () => {
    const state = {
        retrospectiveReducer: {
            retrospectiveReport: undefined,
            isLoadingReport: true
        },
    } as RootState

    render(<RetrospectiveReport/>, {
        initialState: state
    })

    const notFound = screen.queryByText(/The retrospective could not be found/i);
    expect(notFound).not.toBeInTheDocument();
})

test('Should show not found if the retrospective has not been found', () => {
    const state = {
        retrospectiveReducer: {
            retrospectiveReport: undefined,
            isLoadingReport: false
        },
    } as RootState

    render(<RetrospectiveReport/>, {
        initialState: state
    })

    const notFound = screen.queryByText(/The retrospective could not be found/i);
    expect(notFound).toBeInTheDocument();
})

test('Should show edit action if user can manage retrospective', () => {
    const authenticatedUserId = 'aa';
    const teamId = 1;

    const state = {
        commentCategoryReducer: {
          commentCategories: [{id: 1, description: 'test'}] as ICommentCategory[],
        },
        retrospectiveReducer: {
            isLoadingReport: false,
            retrospectiveReport: {
                retrospective: {
                    topics: [] as ITopic[],
                    actions: [] as IAction[],
                    team: {id: teamId}
                },
                suggestedTopics: [] as ISuggestedTopic[],
                suggestedActions: [] as ISuggestedAction[],
                comments: [] as IComment[]
            }
        },
        teamReducer: {
            isLoadingTeams: false,
            teams: [
                {id: teamId, members: [{user: {id: authenticatedUserId}, role: {canManageRetrospective: true}}]}
            ]
        },
        authenticationReducer: {user: {id: authenticatedUserId, fullName: ''}}
    } as RootState

    render(<RetrospectiveReport/>, {
        initialState: state
    })

    const editAction = screen.queryByTestId('edit-action');
    expect(editAction).toBeInTheDocument();
})

test('Should hide edit action if user cannot manage retrospective', () => {
    const authenticatedUserId = 'aa';
    const teamId = 1;

    const state = {
        commentCategoryReducer: {
            commentCategories: [{id: 1, description: 'test'}] as ICommentCategory[],
        },
        retrospectiveReducer: {
            isLoadingReport: false,
            retrospectiveReport: {
                retrospective: {
                    topics: [] as ITopic[],
                    actions: [] as IAction[],
                    team: {id: 2}
                },
                suggestedTopics: [] as ISuggestedTopic[],
                suggestedActions: [] as ISuggestedAction[],
                comments: [] as IComment[]
            }
        },
        teamReducer: {
            isLoadingTeams: false,
            teams: [
                {id: teamId, members: [{user: {id: authenticatedUserId}, role: {canManageRetrospective: true}}]}
            ]
        },
        authenticationReducer: {user: {id: authenticatedUserId, fullName: ''}}
    } as RootState

    render(<RetrospectiveReport/>, {
        initialState: state
    })

    const editAction = screen.queryByTestId('edit-action');
    expect(editAction).not.toBeInTheDocument();
})



test('Should show the data from the retrospective report', () => {
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

    const suggestedActions = [
        {id: 1, description: 'Suggested 1', suggestedBy: {id: 1, fullName: 'User 1'}}
    ] as ISuggestedAction[]

    const topics = [
        {id: 1, order: 2, description: 'Second row', durationInMinutes: 30},
        {id: 2, order: 1, description: 'First row', durationInMinutes: 40},
    ] as ITopic[];

    const actions = [
        {id: 1, description: 'Say hello 1', responsible: 'User 1', isCompleted: false},
        {id: 2, description: 'Say hello 2', responsible: 'User 2', isCompleted: true},
    ] as IAction[];

    const state = {
        commentCategoryReducer: {commentCategories: [category] as ICommentCategory[]},
        retrospectiveReducer: {
            retrospectiveReport: {
                retrospective: {
                    topics: topics,
                    actions: actions
                },
                suggestedTopics,
                suggestedActions: suggestedActions,
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

    const sortedTopics = [...topics].sort((a, b) => a.order - b.order);

    sortedTopics.forEach((topic, index) => {
        expect(screen.getByTestId(`topic-description-by-index-${index}`)).toHaveTextContent(topic.description);
        expect(screen.getByTestId(`topic-duration-by-index-${index}`)).toHaveTextContent(`${topic.durationInMinutes} minutes`);
    })

    suggestedTopics.forEach(topic => {
        expect(screen.getByTestId(`suggested-topic-${topic.id}-description`)).toHaveTextContent(topic.description);
        expect(screen.getByTestId(`suggested-topic-${topic.id}-suggested-by`)).toHaveTextContent(`Suggested (By ${topic.suggestedBy.fullName})`);
    })

    actions.forEach(action => {
        const checkElem = screen.getByTestId(`action-${action.id}-completed`);
        action.isCompleted
            ? expect(checkElem).toBeChecked()
            : expect(checkElem).not.toBeChecked();

        expect(screen.getByTestId(`action-${action.id}-description`)).toHaveTextContent(action.description);
        expect(screen.getByTestId(`action-${action.id}-responsible`)).toHaveTextContent(action.responsible);
    })

    suggestedActions.forEach(action => {
        expect(screen.getByTestId(`suggested-action-${action.id}-description`)).toHaveTextContent(action.description);
        expect(screen.getByTestId(`suggested-action-${action.id}-suggested-by`)).toHaveTextContent(action.suggestedBy.fullName);
    })
})