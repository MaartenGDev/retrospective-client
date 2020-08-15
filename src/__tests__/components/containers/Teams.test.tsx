import React from 'react'
import {render, screen} from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import {ITeam} from "../../../models/ITeam";
import Teams from "../../../components/containers/Teams";

test('Show create retrospective action if user can manage at least one team', () => {
    const authenticatedUserId = 'aa';
    const teams = [
        {id: 1, name: 'Team 1', members: [{user: {id: authenticatedUserId}, role: {name: 'Role 1',canManageRetrospective: true}}]},
        {id: 2, name: 'Team 2', members: [{user: {id: 3}, role: {name: 'Role 3',canManageRetrospective: true}}, {user: {id: authenticatedUserId}, role: {name: 'Role 1',canManageRetrospective: true}}]},
    ] as ITeam[];

    const initialState = {
        teamReducer: {
            teams
        },
        authenticationReducer: {user: {id: authenticatedUserId, fullName: ''}}
    };

    render(<Teams />, {
        initialState,
    })


    teams.forEach(team => {
        expect(screen.getByTestId(`team-${team.id}-name`)).toHaveTextContent(team.name);
        expect(screen.getByTestId(`team-${team.id}-user-role`)).toHaveTextContent(team.members.find(m => m.user.id == authenticatedUserId)!.role.name);
    })
})