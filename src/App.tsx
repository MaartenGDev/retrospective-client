import React from 'react';
import './App.scss';
import Header from "./components/Header";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Retrospectives from "./components/Retrospectives";
import styled from "styled-components";
import Overview from "./components/Overview";
import Retrospective from "./components/Retrospective";

const Content = styled.div`
  padding: 20px;
`;

function App() {
    return (
        <Router>
            <div>
                <Header/>

                <Content>
                    <Switch>
                        <Route path="/retrospectives/:id">
                            <Retrospective/>
                        </Route>
                        <Route path="/retrospectives">
                            <Retrospectives />
                        </Route>
                        <Route path="/overview">
                            <Overview />
                        </Route>
                        <Route path="/">
                            <Retrospectives />
                        </Route>
                    </Switch>
                </Content>
            </div>
        </Router>
    );
}

export default App;
