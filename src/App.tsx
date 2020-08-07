import React from 'react';
import {Provider} from 'react-redux'
import Header from "./components/containers/Header";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Retrospectives from "./components/containers/Retrospectives";
import Retrospective from "./components/containers/Retrospective";
import './App.scss';
import {store} from "./store/store";
import * as retrospectiveActions from "./store/retrospective.actions";
import * as commentCategoryActions from "./store/comment-category.actions";
import * as timeUsageCategoryActions from "./store/time-usage-category.actions";
import * as teamActions from "./store/team.actions";
import * as authenticationActions from "./store/authentication.actions";
import * as teamMemberRoleActions from "./store/team-member-roles.actions";
import RetrospectiveFeedback from "./components/containers/RetrospectiveEvaluation";
import ManageRetrospective from "./components/containers/ManageRetrospective";
import Teams from "./components/containers/Teams";
import ManageTeam from "./components/containers/ManageTeam";
import Team from "./components/containers/Team";
import TeamInvite from "./components/containers/TeamInvite";
import TrendInsights from "./components/containers/TrendInsights";
import TeamMemberInsights from "./components/containers/TeamMemberInsights";
import DefaultInsights from "./components/containers/DefaultInsights";
import Authenticate from "./components/containers/Authenticate";
import Account from "./components/containers/Account";
import Logout from "./components/containers/Logout";


function App() {
    return (
        <Router>
            <div>
                <Provider store={store}>
                    <Switch>
                        <Route path="/teams/invites/:code">
                            <TeamInvite/>
                        </Route>
                        <Route path="/account/login">
                            <Authenticate/>
                        </Route>

                        <Route path="*">
                            <Header/>

                            <Switch>
                                <Route path="/account/logout">
                                    <Logout/>
                                </Route>
                                <Route path="/account">
                                    <Account/>
                                </Route>
                                <Route path="/teams/create">
                                    <ManageTeam/>
                                </Route>
                                <Route path="/teams/:id/edit">
                                    <ManageTeam/>
                                </Route>
                                <Route path="/teams/:id">
                                    <Team/>
                                </Route>
                                <Route path="/teams">
                                    <Teams/>
                                </Route>
                                <Route path="/retrospectives/:id/feedback">
                                    <RetrospectiveFeedback readonly={false}/>
                                </Route>
                                <Route path="/retrospectives/:id/provided-feedback">
                                    <RetrospectiveFeedback readonly={true}/>
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
                                <Route path="/insights/teams/:teamId/members/:userId">
                                    <TrendInsights />
                                </Route>
                                <Route path="/insights/teams/:teamId/members">
                                    <TeamMemberInsights />
                                </Route>
                                <Route path="/insights/teams/:teamId/:filter">
                                    <TrendInsights />
                                </Route>
                                <Route path="/insights">
                                    <DefaultInsights />
                                </Route>
                                <Route path="/">
                                    <Retrospectives/>
                                </Route>
                            </Switch>
                        </Route>
                    </Switch>
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
store.dispatch(teamMemberRoleActions.LoadAll())

export default App;
