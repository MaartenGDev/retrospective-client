import React, {FC} from 'react';
import styled from "styled-components";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {RoundedButtonLink} from "../shared/Buttons";
import {Container} from "../shared/Common";
import {TableLink} from "../shared/Text";

const Content = styled.div`
  background-color: #ffffff;
`

const Title = styled.h1`
  margin: 0;
`

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
        <Container>
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
                        const isAdminOfTeam = team.members.some(m => m.userId === user?.id && m.role.canManageTeam);

                        return <tr key={team.id}>
                            <td>{team.name}</td>
                            <td>{isAdminOfTeam ? 'Admin' : 'Member'}</td>
                            <td><TableLink to={`/teams/${team.id}`}>View</TableLink></td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </Content>
        </Container>
    );
}

export default connector(Teams);
