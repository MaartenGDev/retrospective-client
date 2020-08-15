import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import {createStoreWithState, store} from "./store/store";
import {MemoryRouter} from "react-router-dom";

function render(
    ui,
    {
        initialState = {},
        route = '/',
        store = createStoreWithState(initialState),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return (<MemoryRouter initialEntries={[route]} initialIndex={0}>
            <Provider store={store}>{children}</Provider>
        </MemoryRouter>)
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }