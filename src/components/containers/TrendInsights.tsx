import React, {FC, useEffect} from 'react';
import styled from "styled-components";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/rootReducer";
import Tile from "../presentation/Tile";
import {Line} from 'react-chartjs-2'
import * as insightActions from "../../store/insight.actions";
import {ColorHelper} from "../../helpers/ColorHelper";
import {Container, Spacer} from "../styles/Common";
import {RouteComponentProps, withRouter} from "react-router-dom";
import InsightTabs from "./InsightTabs";
import {parseId} from "../../helpers/Uri";


const TileRow = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`
const ChartSection = styled.div`
  margin-top: 40px;
  border-radius: 5px;
  padding: 10px;
`

const EvaluationSection = styled.div`
  margin-bottom: 60px;
`

const SpacerTitle = styled.h3`
  margin-top: 0;
`

const EvaluationsTable = styled.table`
  background-color: white;
`

const mapState = (state: RootState) => ({
    insight: state.insightReducer.insight,
});


const mapDispatch = {
    loadForFilter: (teamId: number | string, filter: string) => insightActions.LoadWithFilter(teamId, filter)
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux =
    ConnectedProps<typeof connector>
    & RouteComponentProps<{ teamId: string, filter?: string, userId?: string }>


const TrendInsights: FC<PropsFromRedux> = ({insight, loadForFilter, match}) => {
    useEffect(() => {
        const {userId, teamId, filter} = match.params;

        const finalFilter = !!match.params.userId
            ? `members/${userId!}`
            : filter!;

        loadForFilter(parseId(teamId), finalFilter);
    }, [match, loadForFilter])

    if (!insight) {
        return <main>Loading</main>
    }

    const chartData = {
        ...insight.history,
        datasets: insight.history.datasets.map(d => ({
            ...d,
            borderColor: d.color,
            backgroundColor: ColorHelper.lighten(d.color, 0.1)
        })),
    };

    const chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    const evaluations = insight.evaluations.filter(e => e.sprintRatingExplanation.length > 0);

    return (
        <main>
            <InsightTabs activePath={match.url}/>
            <Container>
                <TileRow>
                    {insight.metrics.map(m => <Tile key={m.name} metric={m}/>)}
                </TileRow>


                <ChartSection>
                    <Line data={chartData} options={chartOptions}/>
                </ChartSection>

                {evaluations.length > 0 && <EvaluationSection>
                    <Spacer/>
                    <SpacerTitle>Evaluations</SpacerTitle>

                    <EvaluationsTable>
                        <thead>
                        <tr>
                            <th>Retrospective</th>
                            <th>Rating</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {evaluations.map(evaluation => {
                            return <tr key={evaluation.id}>
                                <td>{evaluation.retrospective?.name}</td>
                                <td>{evaluation.sprintRating / 10}</td>
                                <td>{evaluation.sprintRatingExplanation}</td>
                            </tr>
                        })}
                        </tbody>
                    </EvaluationsTable>
                </EvaluationSection>}

            </Container>
        </main>
    );
}

export default withRouter(connector(TrendInsights));
