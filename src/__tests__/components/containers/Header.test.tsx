import React from 'react'
import { createStore } from 'redux'
import { render, screen } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Header from "../../../components/containers/Header";
import {RootState} from "../../../store/rootReducer";

test('Shows login link when the user not is authenticated', () => {
    // this is a silly store that can never be changed
    const store = createStore(() => ({ authenticationReducer: {user: undefined} } as RootState))
    render(<Header />, {
        store,
    })

    const loginElem = screen.queryByText(/Login/i);
    expect(loginElem).toBeInTheDocument();
})

test('Shows username when authenticated', () => {
    // this is a silly store that can never be changed
    const store = createStore(() => ({ authenticationReducer: {user: {fullName: 'Hello'}} } as RootState))
    render(<Header />, {
        store,
    })

    expect(screen.getByTestId('account-label')).toHaveTextContent('Hello')

    const loginElem = screen.queryByText(/Login/i);
    expect(loginElem).not.toBeInTheDocument();
})

test('Should show manage account link when authenticated', () => {
    // this is a silly store that can never be changed
    const store = createStore(() => ({ authenticationReducer: {user: {fullName: 'Hello'}} } as RootState))
    render(<Header />, {
        store,
    })

    const accountElem = screen.queryByText(/My Account/i);
    expect(accountElem).toBeInTheDocument();
})