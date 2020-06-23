import React from 'react';
import { Provider } from 'react-redux'
import Header from "./components/Header";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Retrospectives from "./components/containers/Retrospectives";
import Overview from "./components/Overview";
import Retrospective from "./components/containers/Retrospective";
import './App.scss';
import {store} from "./store/store";
import * as retrospectiveActions from "./store/retrospective.actions";
import * as commentCategoryActions from "./store/comment-category.actions";
import * as timeUsageCategoryActions from "./store/time-usage-category.actions";
import * as teamActions from "./store/team.actions";
import * as authenticationActions from "./store/authentication.actions";
import RetrospectiveFeedback from "./components/containers/RetrospectiveEvaluation";
import ManageRetrospective from "./components/containers/ManageRetrospective";
import Teams from "./components/containers/Teams";
import ManageTeam from "./components/containers/ManageTeam";
import {Container} from "./components/Styling/Common";
import Team from "./components/containers/Team";


function App() {
    return (
        <Router>
            <div>
                <Provider store={store}>
                    <Header/>

                    <Container>
                        <Switch>
                            <Route path="/retrospectives/:id/feedback">
                                <RetrospectiveFeedback />
                            </Route>
                            <Route path="/retrospectives/create">
                                <ManageRetrospective/>
                            </Route>
                            <Route path="/retrospectives/:id/edit">
                                <ManageRetrospective/>
                            </Route>
                            <Route path="/retrospectives/:id">
                                <Retrospective/>
                            </Route>
                            <Route path="/retrospectives">
                                <Retrospectives/>
                            </Route>
                            <Route path="/teams/create">
                                <ManageTeam />
                            </Route>
                            <Route path="/teams/:id">
                                <Team />
                            </Route>
                            <Route path="/teams/:id/edit">
                                <ManageTeam />
                            </Route>
                            <Route path="/teams">
                                <Teams />
                            </Route>
                            <Route path="/overview">
                                <Overview/>
                            </Route>
                            <Route path="/">
                                <Retrospectives/>
                            </Route>
                        </Switch>
                    </Container>
                </Provider>
            </div>
        </Router>
    );
}

store.dispatch(retrospectiveActions.LoadAll())
store.dispatch(commentCategoryActions.LoadAll())
store.dispatch(timeUsageCategoryActions.LoadAll())
store.dispatch(teamActions.LoadAll())
store.dispatch(authenticationActions.Load())

export default App;
