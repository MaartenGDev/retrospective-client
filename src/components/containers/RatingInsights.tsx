import React, {FC, useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/rootReducer";
import * as insightActions from "../../store/insight.actions";
import styled from "styled-components";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import InsightTabs from "./InsightTabs";
import {Container} from "../styles/Common";
import {parseId} from "../../helpers/Uri";
import {IRatingInsight} from "../../models/IRatingInsight";
import {IUserRetrospective} from "../../models/IUserRetrospective";

const RatingGroup = styled.div.attrs((props: { firstGroup: boolean }) => ({
    firstGroup: props.firstGroup || false,
}))`
  margin-top: ${props => props.firstGroup ? 0 : '30px'};
`

const TableSection = styled.main`
  margin-top: 0;
  background-color: #ffffff;
`

const DateRange = styled.span`
  font-weight: normal;
  font-size: 16px;
`

const DateLabel = styled.span`
  font-style: italic;
`

const mapState = (state: RootState) => ({
    ratingsInsights: state.insightReducer.ratingInsights,
});


const mapDispatch = {
    loadRatings: insightActions.LoadRatings
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps<{ teamId: string }>;

const RatingInsights: FC<PropsFromRedux> = ({loadRatings, match, ratingsInsights}) => {
    const teamId = parseId(match.params.teamId);
    useEffect(() => {
        loadRatings(teamId);
    }, [loadRatings, teamId]);

    const byRetrospectives = Object.values(ratingsInsights.reduce((acc: { [key: string]: { retrospective: IUserRetrospective, ratings: IRatingInsight[] } }, cur) => {
        if (!acc.hasOwnProperty(cur.retrospective.id!)) {
            acc[cur.retrospective.id!] = {
                retrospective: cur.retrospective,
                ratings: []
            }
        }
        acc[cur.retrospective.id!].ratings = [...acc[cur.retrospective.id!].ratings, cur];
        return acc;
    }, {})).sort((a, b) => new Date(b.retrospective.endDate).getTime() - new Date(a.retrospective.endDate).getTime());

    return (
        <main>
            <InsightTabs activePath={match.url}/>
            <Container>
                {byRetrospectives.map((group, index) => {
                    return (
                        <RatingGroup key={group.retrospective.id} firstGroup={index === 0}>
                            <h3>{group.retrospective.name} <DateRange>(<DateLabel>{group.retrospective.startDate} t/m {group.retrospective.endDate}</DateLabel>)</DateRange></h3>
                            <TableSection>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Member</th>
                                        <th>Sprint rating</th>
                                        <th>Rating explanation</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {group.ratings.map((insight, index) => {
                                        return <tr key={index}>
                                            <td>{insight.fullName}</td>
                                            <td>{insight.sprintRating}</td>
                                            <td>{insight.sprintRatingExplanation}</td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            </TableSection>
                        </RatingGroup>)
                })}
            </Container>
        </main>
    );
}

export default withRouter(connector(RatingInsights));
