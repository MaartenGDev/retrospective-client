import React, {FC} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {RoundedButtonLink} from "../Styling/Buttons";

const Content = styled.div`
  background-color: #ffffff;
`

const Title = styled.h1`
  margin: 0;
`

const TableLink = styled(Link)`
  color: #4A92E6;
  text-transform: uppercase;
  text-decoration: none;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`


const mapState = (state: RootState) => ({
    teams: state.teamReducer.teams,
    user: state.authenticationReducer.user,
});

const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>

const Teams: FC<PropsFromRedux> = ({teams, user}) => {
    return (
        <main>
            <Row>
                <Title>Teams</Title>
                <RoundedButtonLink to='/teams/create'>Create</RoundedButtonLink>
            </Row>
            <Content>
                <table>
                    <tbody>
                    <tr>
                        <th>NAME</th>
                        <th>ROLE</th>
                        <th>VIEW</th>
                    </tr>
                    {teams.map(team => {
                        const isAdminOfTeam = team.members.some(m => m.userId === user?.id && m.isAdmin);

                        return <tr key={team.id}>
                            <td>{team.name}</td>
                            <td>{isAdminOfTeam ? 'Admin' : 'Member'}</td>
                            <td><TableLink to={`/teams/${team.id}`}>View</TableLink></td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </Content>
        </main>
    );
}

export default connector(Teams);
