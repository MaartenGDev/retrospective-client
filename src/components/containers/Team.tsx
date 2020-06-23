import React, {ChangeEvent, Component, FC} from 'react';
import styled from "styled-components";
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter, Redirect} from 'react-router-dom';
import {TextInput} from "../Styling/Input";
import * as teamActions from "../../store/team.actions";
import {RoundedButton} from "../Styling/Buttons";
import {ITeam} from "../../models/ITeam";
import Config from "../../Config";
import {ButtonRow, SectionTitle, Spacer} from "../Styling/Common";

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
    createOrUpdate: (team: ITeam) => teamActions.CreateOrUpdate(team)
}
const connector = connect(mapState, mapDispatch)
type IProps = ConnectedProps<typeof connector> & RouteComponentProps<{ id?: string }>;


const Team: FC<IProps> = ({teams, user, match}) => {
    const team = teams.find(t => t.id === parseInt(match.params.id!));

    if (!team) {
        return <main>Loading..</main>
    }

    const isAdminOfTeam = team!.members.some(m => m.userId === user?.id && m.isAdmin);
    const showInviteCode = isAdminOfTeam && team.inviteCode;

    return (
        <main>
            <h1>Team: {team.name}</h1>
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
                    <TextInput disabled={true} value={Config.TEAM_INVITE_URL(team.inviteCode)}/>
                </React.Fragment>}
            </Content>
        </main>
    );
}

export default withRouter(connector(Team));
