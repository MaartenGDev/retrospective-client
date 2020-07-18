import React, {FC} from 'react';
import styled from "styled-components";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {RoundedButtonLink} from "../styles/Buttons";
import {Container} from "../styles/Common";
import {TableLink} from "../styles/Text";

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
                        const currentUser = team.members.find(m => m.userId === user?.id);

                        return <tr key={team.id}>
                            <td>{team.name}</td>
                            <td>{currentUser ? currentUser!.role.name : ''}</td>
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
