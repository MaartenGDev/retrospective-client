import React, {FC, useState} from 'react';
import styled from "styled-components";
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {TextInput} from "../shared/Input";
import * as teamActions from "../../store/team.actions";
import {ITeam} from "../../models/ITeam";
import Config from "../../Config";
import {Row, SectionTitle, Title} from "../shared/Common";
import {RoundedButton, RoundedButtonLink} from "../shared/Buttons";

const Content = styled.div`
  padding: 20px;
  background-color: #ffffff;
`

const mapState = (state: RootState) => ({
    retrospectives: state.retrospectiveReducer.retrospectives,
    teams: state.teamReducer.teams,
    user: state.authenticationReducer.user,
});

const mapDispatch = {
    createOrUpdate: (team: ITeam) => teamActions.CreateOrUpdate(team),
    deleteTeam: (teamId: number) => teamActions.Delete(teamId)
}
const connector = connect(mapState, mapDispatch)
type IProps = ConnectedProps<typeof connector> & RouteComponentProps<{ id?: string }>;


const Team: FC<IProps> = ({teams, user, deleteTeam, match}) => {
    const team = teams.find(t => t.id === parseInt(match.params.id!));
    const [redirectToOverview, setShouldRedirect] = useState(false);

    if (!team) {
        return <main>Loading..</main>
    }

    const promptDelete = (teamId: number) => {
        if (!window.confirm('Are you sure?')) return;
        deleteTeam(teamId);
        setShouldRedirect(true);
    }

    const isAdminOfTeam = team!.members.some(m => m.userId === user?.id && m.isAdmin);
    const showInviteCode = isAdminOfTeam && team.inviteCode;

    if (redirectToOverview) {
        return <Redirect to={'/teams'}/>
    }

    return (
        <main>
            <Row>
                <Title>Team: {team.name}</Title>

                {isAdminOfTeam && <div>
                    <RoundedButton style={{marginRight: '10px'}} onClick={e => promptDelete(team.id!)}
                                   color='#e53935'>Remove</RoundedButton>
                    <RoundedButtonLink to={`/teams/${team.id}/edit`}>Edit</RoundedButtonLink>
                </div>}
            </Row>

            <Content>
                <SectionTitle>Members</SectionTitle>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                    {team.members.map(m => {
                        return <tr>
                            <td>{m.user.name}</td>
                            <td>{m.isAdmin ? 'Admin' : 'Member'}</td>
                        </tr>
                    })}
                    </tbody>
                </table>

                {showInviteCode && <React.Fragment>
                    <SectionTitle>Invite Link</SectionTitle>
                    <TextInput disabled={true} value={Config.LOCAL_TEAM_INVITE_URL(team.inviteCode)}/>
                </React.Fragment>}
            </Content>
        </main>
    );
}

export default withRouter(connector(Team));