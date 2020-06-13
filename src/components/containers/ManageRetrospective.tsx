import React, {FC, useState} from 'react';
import styled from "styled-components";
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {IRetrospective} from "../../models/IRetrospective";
import {TextInput} from "../Styling/Input";

const Content = styled.div`
  padding: 20px;
  background-color: #ffffff;
`

const mapState = (state: RootState) => ({retrospectives: state.retrospectiveReducer.retrospectives});
const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps<{id: string}>


const Retrospective: FC<PropsFromRedux> = ({retrospectives, match}) => {
    const initialRetrospective: IRetrospective = retrospectives.find(r => r.id === parseInt(match.params.id)) || {
        name: '',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        actions: [],
        topics: []
    };

    const [retrospective, setRetrospective] = useState<IRetrospective>(initialRetrospective);

    return (
        <main>
            <h1>Retrospective: {retrospective.name}</h1>
            <Content>
                <p>NAME</p>
                <TextInput placeholder='E.g Retrospective #12'
                          value={retrospective.name}
                          onChange={e => setRetrospective({...retrospective, name: e.target.value})}
                />

                <p>AGENDA</p>
                <table>
                    <tbody>
                    <tr>
                        <th>Description</th>
                        <th>Duration</th>
                    </tr>
                    {retrospective.topics.map(event => {
                        return <tr key={event.id}>
                            <td>{event.description}</td>
                            <td>{event.durationInMinutes}</td>
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
