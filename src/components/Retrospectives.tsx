import React, {FC} from 'react';
import {RetrospectiveStatus} from "../models/RetrospectiveStatus";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../store/rootReducer";

const Content = styled.div`
  background-color: #ffffff;
`

const TableLink = styled(Link)`
  color: #4A92E6;
  text-transform: uppercase;
  text-decoration: none;
`;


const mapState = (state: RootState) => ({retrospectives: state.retrospectiveReducer.retrospectives});
const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>

const Retrospectives: FC<PropsFromRedux> = ({retrospectives}) => {
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

export default connector(Retrospectives);
