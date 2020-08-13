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

test('Show create retrospective action if user can manage at least one team', () => {
    const authenticatedUserId = 'aa';
    const initialState = {
        retrospectiveReducer: {retrospectives: [] as IUserRetrospective[]},
        teamReducer: {
            teams: [
                {members: [{user: {id: authenticatedUserId}, role: {canManageRetrospective: true}}]}
            ]
        },
        authenticationReducer: {user: {id: authenticatedUserId, fullName: ''}}
    };

    render(<Retrospectives/>, {
        initialState,
    })

    const createAction = screen.queryByTestId('create-action');
    expect(createAction).toBeInTheDocument();
})

test('Hide create retrospective action if user cannot manage at least one team', () => {
    const authenticatedUserId = 'aa';
    const initialState = {
        retrospectiveReducer: {retrospectives: [] as IUserRetrospective[]},
        teamReducer: {
            teams: [
                {members: [{user: {id: authenticatedUserId}, role: {canManageRetrospective: false}}]}
            ]
        },
        authenticationReducer: {user: {id: authenticatedUserId, fullName: ''}}
    };

    render(<Retrospectives/>, {
        initialState,
    })

    const createAction = screen.queryByTestId('create-action');
    expect(createAction).not.toBeInTheDocument();
})

test('Should show Give Feedback button when retrospective when period has not ended', () => {
    const initialState = {
        retrospectiveReducer: {
            retrospectives: [
                {
                    id: 'a', name: '', startDate: DateHelper.format(new Date()), endDate: DateHelper.format(new Date()), topics: [], actions: [], teamId: 1
                }
            ] as IUserRetrospective[]
        },
        teamReducer: {
            teams: [] as ITeam[]
        },
        authenticationReducer: {user: undefined}
    }

    render(<Retrospectives/>, {
        initialState,
    })

    expect(screen.queryByTestId('feedback-action')).toHaveTextContent('Give feedback');
})

test('Should show Edit Feedback button when the user has an evaluation', () => {
    const initialState = {
        retrospectiveReducer: {
            retrospectives: [
                {
                    id: 'a', name: '', startDate: DateHelper.format(new Date()), endDate: DateHelper.format(new Date()), topics: [], actions: [], teamId: 1,
                    evaluation: {id: 44} as IEvaluation
                }
            ] as IUserRetrospective[]
        },
        teamReducer: {
            teams: [] as ITeam[]
        },
        authenticationReducer: {user: undefined}
    }

    render(<Retrospectives/>, {
        initialState,
    })

    expect(screen.queryByTestId('feedback-action')).toHaveTextContent('Edit feedback');
})

test('Should show View Feedback button when retrospective when period has ended', () => {
    const initialState = {
        retrospectiveReducer: {
            retrospectives: [
                {
                    id: 'a', name: '', startDate: '2010-10-10', endDate: '2010-10-12', topics: [], actions: [], teamId: 1
                }
            ] as IUserRetrospective[]
        },
        teamReducer: {
            teams: [] as ITeam[]
        },
        authenticationReducer: {user: undefined}
    }

    render(<Retrospectives/>, {
        initialState,
    })

    expect(screen.queryByTestId('feedback-action')).toHaveTextContent('View feedback');
})

test('Should show OPEN status if retrospective period has not ended', () => {
    const initialState = {
        retrospectiveReducer: {
            retrospectives: [
                {
                    id: 'a', name: '', startDate: DateHelper.format(new Date()), endDate: DateHelper.format(new Date()), topics: [], actions: [], teamId: 1
                }
            ] as IUserRetrospective[]
        },
        teamReducer: {
            teams: [] as ITeam[]
        },
        authenticationReducer: {user: undefined}
    }

    render(<Retrospectives/>, {
        initialState,
    })

    expect(screen.queryByTestId('retrospective-status')).toHaveTextContent('OPEN');
})


test('Should show OPEN status if retrospective period has not ended', () => {
    const initialState = {
        retrospectiveReducer: {
            retrospectives: [
                {
                    id: 'a', name: '', startDate: '2010-10-10', endDate: '2010-10-12', topics: [], actions: [], teamId: 1
                }
            ] as IUserRetrospective[]
        },
        teamReducer: {
            teams: [] as ITeam[]
        },
        authenticationReducer: {user: undefined}
    };

    render(<Retrospectives/>, {
        initialState,
    })

    expect(screen.queryByTestId('retrospective-status')).toHaveTextContent('COMPLETED');
})