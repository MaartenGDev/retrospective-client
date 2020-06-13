import React, {FC} from 'react';
import styled from "styled-components";
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import { RouteComponentProps, withRouter } from 'react-router-dom';

const Content = styled.div`
  padding: 20px;
  background-color: #ffffff;
`

const mapState = (state: RootState) => ({retrospectives: state.retrospectiveReducer.retrospectives});
const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps<{id: string}>


const Retrospective: FC<PropsFromRedux> = ({retrospectives, match}) => {
    const retrospective = retrospectives.find(r => r.id === parseInt(match.params.id))!;

    if(!retrospective){
        return <main>Not found</main>
    }

    console.log(retrospective)

    return (
        <main>
            <h1>Retrospective: {retrospective.name}</h1>
            <Content>
                <p>AGENDA</p>
                <table>
                    <tbody>
                    <tr>
                        <th>Description</th>
                        <th>Duration</th>
                    </tr>
                    {retrospective.topics.map(topic => {
                        return <tr key={topic.id}>
                            <td>{topic.description}</td>
                            <td>{topic.durationInMinutes}</td>
                        </tr>
                    })}
                    </tbody>
                </table>

                <hr/>
                <p>ACTIONS LAST SPRINT</p>
                <table>
                    <tbody>
                    <tr>
                        <th>Done</th>
                        <th>Description</th>
                        <th>Responsible</th>
                    </tr>
                    {retrospective.actions.map(event => {
                        return <tr key={event.id}>
                            <td><input readOnly type='checkbox' checked={event.isCompleted}/></td>
                            <td>{event.description}</td>
                            <td>{event.responsible}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
                <hr/>
                <p>TO DISCUSS</p>
            </Content>
        </main>
    );
}

export default withRouter(connector(Retrospective));
