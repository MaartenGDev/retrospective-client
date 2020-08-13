import React, {FC} from 'react';
import styled from "styled-components";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/rootReducer";
import {RoundedButtonLink} from "../styles/Buttons";
import {Container, Row, Title} from "../styles/Common";
import {PrimaryLink} from "../styles/Navigation";
import {DateHelper} from "../../helpers/DateHelper";

const Content = styled.div`
  background-color: #ffffff;
`

const mapState = (state: RootState) => ({
    retrospectives: state.retrospectiveReducer.retrospectives,
    teams: state.teamReducer.teams,
    user: state.authenticationReducer.user
});

const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>

const Retrospectives: FC<PropsFromRedux> = ({retrospectives, teams, user}) => {
    const canCreateRetrospective = teams.some(t => t.members.some(m => m.user.id === user?.id && m.role.canManageRetrospective));

    return (
        <Container>
            <Row>
                <Title>Retrospectives</Title>
                {canCreateRetrospective && <RoundedButtonLink data-testid='create-action' to='/retrospectives/create'>Create</RoundedButtonLink>}
            </Row>
            <Content>
                <table>
                    <tbody>
                    <tr>
                        <th>NAME</th>
                        <th>TEAM</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>VIEW</th>
                        <th>ACTION</th>
                    </tr>
                    {retrospectives.map(retro => {
                        const isCompleted = DateHelper.isAfterDate(new Date(retro.endDate), new Date());

                        const action = isCompleted
                            ? <PrimaryLink data-testid='feedback-action' to={'/retrospectives/' + retro.id + '/provided-feedback'}>View feedback</PrimaryLink>
                            : <PrimaryLink data-testid='feedback-action' to={'/retrospectives/' + retro.id + '/feedback'}>{retro.evaluation ? 'Edit' : 'Give'} feedback</PrimaryLink>;

                        return <tr key={retro.id}>
                            <td>{retro.name}</td>
                            <td>{retro.team?.name}</td>
                            <td data-testid='retrospective-status'>{isCompleted ? 'COMPLETED' : 'OPEN'}</td>
                            <td>{new Date(retro.startDate).toDateString()} - {new Date(retro.endDate).toDateString()}</td>
                            <td><PrimaryLink to={'/retrospectives/' + retro.id}>View</PrimaryLink></td>
                            <td>{action}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </Content>
        </Container>
    );
}

export default connector(Retrospectives);
