import React from 'react';
import {IRetrospective} from "../models/IRetrospective";
import {RetrospectiveStatus} from "../models/RetrospectiveStatus";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Content = styled.div`
  background-color: #ffffff;
`

const TableLink = styled(Link)`
  color: #4A92E6;
  text-transform: uppercase;
  text-decoration: none;
`;

function Retrospectives() {
    const retrospectives: IRetrospective[] = [
        {
            id: 1,
            name: 'Retro WEB #57',
            status: RetrospectiveStatus.OPEN,
            startDate: new Date(),
            endDate: new Date(),
            agenda: [],
            actions: []
        },
        {
            id: 2,
            name: 'Retro WEB #56',
            status: RetrospectiveStatus.FINISHED,
            startDate: new Date(),
            endDate: new Date(),
            agenda: [],
            actions: []
        }
    ];


    return (
        <main>
            <h1>Retrospectives</h1>
            <Content>
                <table>
                    <tbody>
                    <tr>
                        <th>NAME</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>ACTION</th>
                    </tr>
                    {retrospectives.map(retro => {
                        const action = retro.status === RetrospectiveStatus.FINISHED
                            ? <TableLink to={'/retrospectives/' + retro.id}>View</TableLink>
                            : <TableLink to={'/retrospectives/' + retro.id + '/feedback'}>Give feedback</TableLink>;

                        return <tr key={retro.id}>
                            <td>{retro.name}</td>
                            <td>{retro.status}</td>
                            <td>{retro.startDate.toLocaleString()} {retro.endDate.toLocaleString()}</td>
                            <td>{action}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </Content>
        </main>
    );
}

export default Retrospectives;
