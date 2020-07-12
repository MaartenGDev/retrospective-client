import React, {FC} from 'react';
import {Container} from "../shared/Common";
import {RouteComponentProps, withRouter} from "react-router-dom";
import InsightTabs from "./InsightTabs";

const DefaultInsights: FC<RouteComponentProps> = ({match}) => {
    return (
        <main>
            <InsightTabs activePath={match.url}/>
            <Container>
                <p>Loading</p>
            </Container>
        </main>
    );
}

export default withRouter(DefaultInsights);
