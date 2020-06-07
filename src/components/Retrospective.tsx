import React from 'react';
import {IRetrospective} from "../models/IRetrospective";
import {RetrospectiveStatus} from "../models/RetrospectiveStatus";
import styled from "styled-components";

const Content = styled.div`
  padding: 20px;
  background-color: #ffffff;
`

function Retrospective() {
    const retrospective: IRetrospective = {
        id: 2,
        name: 'Retro WEB #56',
        status: RetrospectiveStatus.FINISHED,
        startDate: new Date(),
        endDate: new Date(),
        agenda: [
            {
                id: 1,
                description: 'Product demo\'s in the following order: 1. New product page, 2. Updated overview pages.',
                durationInMinutes: 30
            },
            {id: 2, description: 'Retrospective.', durationInMinutes: 60},
        ],
        actions: [
            {
                id: 1,
                completed: false,
                description: 'Ask for release dates from release manager',
                responsible: 'Web team'
            },
            {id: 2, completed: true, description: 'Add example snippet to docs', responsible: 'Developer 1'},
        ]
    };


    return (
        <main>
            <h1>Retrospective #{retrospective.id}</h1>
            <Content>
                <p>AGENDA</p>
                <table>
                    <tbody>
                    <tr>
                        <th>Description</th>
                        <th>Duration</th>
                    </tr>
                    {retrospective.agenda.map(event => {
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
                            <td><input readOnly type='checkbox' checked={event.completed}/></td>
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

export default Retrospective;
