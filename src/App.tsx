import React from 'react';
import { Provider } from 'react-redux'
import Header from "./components/Header";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Retrospectives from "./components/Retrospectives";
import styled from "styled-components";
import Overview from "./components/Overview";
import Retrospective from "./components/Retrospective";
import './App.scss';
import {store} from "./store/store";
import * as retrospectiveActions from "./store/retrospective.actions";
import RetrospectiveFeedback from "./components/RetrospectiveFeedback";

const Content = styled.div`
  width: 1200px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

function App() {
    return (
        <Router>
            <div>
                <Provider store={store}>
                    <Header/>

                    <Content>
                        <Switch>
                            <Route path="/retrospectives/:id/feedback">
                                <RetrospectiveFeedback />
                            </Route>
                            <Route path="/retrospectives/:id">
                                <Retrospective/>
                            </Route>
                            <Route path="/retrospectives">
                                <Retrospectives/>
                            </Route>
                            <Route path="/overview">
                                <Overview/>
                            </Route>
                            <Route path="/">
                                <Retrospectives/>
                            </Route>
                        </Switch>
                    </Content>
                </Provider>
            </div>
        </Router>
    );
}

store.dispatch(retrospectiveActions.LoadAll())

export default App;
