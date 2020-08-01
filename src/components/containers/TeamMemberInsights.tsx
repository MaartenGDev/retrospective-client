import React, {FC, useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/rootReducer";
import * as insightActions from "../../store/insight.actions";
import styled from "styled-components";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import InsightTabs from "./InsightTabs";
import {Container} from "../styles/Common";
import {TableLink} from "../styles/Text";
import ChangeLabel from "../presentation/common/charts/ChangeLabel";
import {parseId} from "../../helpers/Uri";

const TableSection = styled.main`
  margin-top: 30px;
  background-color: #ffffff;
`
const FlexRow = styled.span`
  display: flex;
  align-items: center;
`




const mapState = (state: RootState) => ({
    teams: state.teamReducer.teams,
    teamMemberInsights: state.insightReducer.teamMemberInsights,
});


const mapDispatch = {
    loadForTeamMembers: (teamId: number|string) => insightActions.LoadForTeamMembers(teamId)
}

const connector = connect(mapState, mapDispatch)


type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps<{ teamId: string }>;

const TeamMemberInsights: FC<PropsFromRedux> = ({loadForTeamMembers, match, teamMemberInsights}) => {
    const teamId = parseId(match.params.teamId);
    useEffect(() => {
        loadForTeamMembers(teamId);
    }, [loadForTeamMembers, teamId])

    const timeUsageCategories = teamMemberInsights.length > 0 && teamMemberInsights.some(tmi => tmi.timeUsage.length > 0)
        ? teamMemberInsights.find(tmi => tmi.timeUsage.length > 0)!.timeUsage.map(tu => tu.category)
        : [];

    return (
        <main>
            <InsightTabs activePath={match.url}/>
            <Container>
                <TableSection>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Sprint rating</th>
                            {timeUsageCategories.map(category => <th key={category.id}>{category.name}</th>)}
                            <th>View</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teamMemberInsights.map(memberInsight => {
                            return <tr key={memberInsight.userId}>
                                <td>{memberInsight.fullName}</td>
                                <td>
                                    <FlexRow>{memberInsight.latestSprintRating}
                                    <ChangeLabel increaseIsPositive={true} changePercentage={memberInsight.latestSprintRatingChangePercentage} />
                                </FlexRow></td>
                                {timeUsageCategories.map(category => {
                                    const timeUsage = memberInsight.timeUsage.find(tu => tu.category.id === category.id) || {
                                        category: category,
                                        percentage: 0,
                                        percentageChangePercentage: 0
                                    };

                                    return <td key={category.id}>
                                        <FlexRow>
                                            <span style={{color: timeUsage.category.color}}>{timeUsage.percentage}%</span>
                                            <ChangeLabel increaseIsPositive={timeUsage.category.increaseIsPositive} changePercentage={timeUsage.percentageChangePercentage} />
                                        </FlexRow>
                                    </td>
                                })}
                                <td><TableLink
                                    to={`/insights/teams/${teamId}/members/${memberInsight.userId}`}>View</TableLink>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </TableSection>
            </Container>
        </main>
    );
}

export default withRouter(connector(TeamMemberInsights));
