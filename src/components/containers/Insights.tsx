import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/rootReducer";
import Tile from "../presentation/Tile";
import {Line} from 'react-chartjs-2'
import * as insightActions from "../../store/insight.actions";
import {ColorHelper} from "../../helpers/ColorHelper";
import {Container} from "../shared/Common";


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

const FiltersRow = styled.div`
  background-color: white;
  border-bottom: 1px solid #C6C6C6;
`

const FilterTab = styled.div.attrs((props: {active: boolean}) => ({
    active: props.active || false,
}))`
  padding: 15px 20px;
  display: inline-block;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`


const mapState = (state: RootState) => ({
    teams: state.teamReducer.teams,
    insight: state.insightReducer.insight,
});


const mapDispatch = {
    loadForFilter: (filter: string) => insightActions.LoadWithFilter(filter)
}


const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>


const Insights: FC<PropsFromRedux> = ({insight, teams, loadForFilter}) => {
    const teamFilters = [
        ...teams.map(t => ({key: `teams/${t.id}/me`, name: `Me (${t.name})`})),
        ...teams.map(t => ({key: `teams/${t.id}`, name: t.name}))
    ];

    const [selectedFilterKey, setFilter] = useState('');

    const applyFilter = (filterKey: string) => {
        loadForFilter(filterKey);
        setFilter(filterKey);
    }


    useEffect(() => {
        if(teamFilters.length > 0 && selectedFilterKey.length === 0){
            applyFilter(teamFilters[0].key);
        }
    }, [teams, teamFilters]); // eslint-disable-line react-hooks/exhaustive-deps


    if (!insight) {
        return <main>Loading</main>
    }

    const chartData = {
        ...insight.history,
        datasets: insight.history.datasets.map(d => ({...d, borderColor: d.color, backgroundColor: ColorHelper.lighten(d.color, 0.1)})),
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

    return (
        <main>
            <FiltersRow>
                <Container>
                    {teamFilters.map(filter => <FilterTab active={selectedFilterKey === filter.key} onClick={() => applyFilter(filter.key)}>{filter.name}</FilterTab>)}
                </Container>
            </FiltersRow>
            <Container>
                <TileRow>
                    {insight.metrics.map(m => <Tile metric={m} />)}
                </TileRow>

                <ChartSection>
                    <Line data={chartData} options={chartOptions}/>
                </ChartSection>
            </Container>
        </main>
    );
}

export default connector(Insights);
