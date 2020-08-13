import React from 'react'
import {render, screen} from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Header from "../../../components/containers/Header";

test('Shows login link when the user not is authenticated', () => {
    const initialState = {authenticationReducer: {user: undefined}};

    render(<Header/>, {
        initialState,
    })

    const loginElem = screen.queryByText(/Login/i);
    expect(loginElem).toBeInTheDocument();
})

test('Shows username when authenticated', () => {
    const initialState = {authenticationReducer: {user: {fullName: 'Hello'}}};

    render(<Header/>, {
        initialState,
    })

    expect(screen.getByTestId('account-label')).toHaveTextContent('Hello')

    const loginElem = screen.queryByText(/Login/i);
    expect(loginElem).not.toBeInTheDocument();
})

test('Should show manage account link when authenticated', () => {
    const initialState = {authenticationReducer: {user: {fullName: 'Hello'}}};

    render(<Header/>, {
        initialState,
    })

    const accountElem = screen.queryByText(/My Account/i);
    expect(accountElem).toBeInTheDocument();
})