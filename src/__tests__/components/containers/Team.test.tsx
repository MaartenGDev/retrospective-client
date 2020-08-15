import React from 'react'
import {render, screen} from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Team from "../../../components/containers/Team";
import {Route} from 'react-router-dom';
import Config from "../../../Config";
import {ITeamMember} from "../../../models/ITeamMember";

test('Should show loading indicator while loading teams', () => {
    const authenticatedUserId = 'aa';
    const initialState = {
        teamReducer: {
            isLoadingTeams: true,
            teams: []
        },
        authenticationReducer: {user: {id: authenticatedUserId, fullName: ''}}
    };

    render(<Route path='/teams/:id/edit'><Team/></Route>, {
        initialState,
        route: `/teams/1/edit`
    })


    const editAction = screen.queryByText(/Loading/i);
    expect(editAction).toBeInTheDocument();
})

test('Should show not found if no team could be found', () => {
    const authenticatedUserId = 'aa';
    const team = {
        id: 1,
        name: 'Team 1',
        inviteCode: 'aaaa-bbbb',
        members: [{user: {id: authenticatedUserId}, role: {name: 'Role 1', canManageTeam: true}}]
    };

    const initialState = {
        teamReducer: {
            isLoadingTeams: false,
            teams: [team]
        },
        authenticationReducer: {user: {id: authenticatedUserId, fullName: ''}}
    };

    render(<Route path='/teams/:id/edit'><Team/></Route>, {
        initialState,
        route: `/teams/${team.id + 1}/edit`
    })


    const editAction = screen.queryByText(/Team not found/i);
    expect(editAction).toBeInTheDocument();
})

test('Show edit/delete action when user can manage team', () => {
    const authenticatedUserId = 'aa';
    const team = {
        id: 1,
        name: 'Team 1',
        inviteCode: 'aaaa-bbbb',
        members: [{user: {id: authenticatedUserId}, role: {name: 'Role 1', canManageTeam: true}}]
    };

    const initialState = {
        teamReducer: {
            isLoadingTeams: false,
            teams: [team]
        },
        authenticationReducer: {user: {id: authenticatedUserId, fullName: ''}}
    };

    render(<Route path='/teams/:id/edit'><Team/></Route>, {
        initialState,
        route: `/teams/${team.id}/edit`
    })


    const editAction = screen.queryByTestId('edit-action');
    expect(editAction).toBeInTheDocument();

    const removeAction = screen.queryByTestId('delete-action');
    expect(removeAction).toBeInTheDocument();

    expect(screen.getByTestId('invite-code')).toHaveValue(Config.LOCAL_TEAM_INVITE_URL(team.inviteCode));
})

test('Hide edit/delete action when user cannot manage the team', () => {
    const authenticatedUserId = 'aa';
    const team = {
        id: 1,
        name: 'Team 1',
        members: [{user: {id: authenticatedUserId}, role: {name: 'Role 1', canManageTeam: false}}]
    };

    const initialState = {
        teamReducer: {
            isLoadingTeams: false,
            teams: [team]
        },
        authenticationReducer: {user: {id: authenticatedUserId, fullName: ''}}
    };

    render(<Route path='/teams/:id/edit'><Team/></Route>, {
        initialState,
        route: `/teams/${team.id}/edit`
    })


    const editAction = screen.queryByTestId('edit-action');
    expect(editAction).not.toBeInTheDocument();

    const removeAction = screen.queryByTestId('delete-action');
    expect(removeAction).not.toBeInTheDocument();

    const inviteElem = screen.queryByTestId('invite-code');
    expect(inviteElem).not.toBeInTheDocument();
})


test('Should show team members with correct name and role', () => {
    const authenticatedUserId = 'aa';

    const members = [
        {user: {id: authenticatedUserId, fullName: 'User 1'}, role: {name: 'Role 1', canManageTeam: false}},
        {user: {id: 2, fullName: 'User 2'}, role: {name: 'Role 2', canManageTeam: false}},
    ] as ITeamMember[];

    const team = {
        id: 1,
        name: 'Team 1',
        members
    };

    const initialState = {
        teamReducer: {
            isLoadingTeams: false,
            teams: [team]
        },
        authenticationReducer: {user: {id: authenticatedUserId, fullName: ''}}
    };

    render(<Route path='/teams/:id/edit'><Team/></Route>, {
        initialState,
        route: `/teams/${team.id}/edit`
    })


    members.forEach(member => {
        expect(screen.getByTestId(`member-${member.user.id}-name`)).toHaveTextContent(member.user.fullName);
        expect(screen.getByTestId(`member-${member.user.id}-role`)).toHaveTextContent(member.role.name);
    })
})