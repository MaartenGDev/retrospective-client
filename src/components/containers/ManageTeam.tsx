import React, {ChangeEvent, Component} from 'react';
import styled from "styled-components";
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter, Redirect} from 'react-router-dom';
import {Select, TextInput} from "../shared/Input";
import * as teamActions from "../../store/team.actions";
import {RoundedButton} from "../shared/Buttons";
import {ITeam} from "../../models/ITeam";
import {ButtonRow, Container, SectionTitle} from "../shared/Common";

const Content = styled.div`
  padding: 20px;
  background-color: #ffffff;
`

const mapState = (state: RootState) => ({
    retrospectives: state.retrospectiveReducer.retrospectives,
    teams: state.teamReducer.teams,
    user: state.authenticationReducer.user,
    teamMemberRoles: state.teamMemberRoleReducer.roles,
});

const mapDispatch = {
    createOrUpdate: (team: ITeam) => teamActions.CreateOrUpdate(team)
}
const connector = connect(mapState, mapDispatch)
type IProps = ConnectedProps<typeof connector> & RouteComponentProps<{ id?: string }>;

interface IState {
    team: ITeam,
    finishedEditing: boolean
}

class ManageTeam extends Component<IProps, IState> {
    state: IState = {
        team: {
            name: '',
            inviteCode: '',
            members: []
        },
        finishedEditing: false
    }

    componentDidMount() {
        this.loadTeamFromRoute();
    }

    componentDidUpdate(prevProps: Readonly<IProps>) {
        if (this.props === prevProps) return;

        this.loadTeamFromRoute();
    }

    private loadTeamFromRoute(){
        const {match, teams} = this.props
        if(teams.length === 0 || !match.params.id) return;


        this.setState({
            team: teams.find(t => t.id === parseInt(match.params.id!))!
        });
    }



    private createOrUpdate = (team: ITeam) => {
        const {createOrUpdate} = this.props
        createOrUpdate(team);
        this.setState({finishedEditing: true})
    }


    private updateTeam = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        this.setState(state => ({
            team: {...state.team, [name]: value}
        }))
    }

    handleTeamMemberRoleChange = (memberId: number, nextRoleId: number) => {
        const {team} = this.state
        const updatedMembers = team.members.map(m => {
           if(m.id === memberId){
               return {...m, roleId: nextRoleId}
           }
           return m;
        });

        this.setState((state) => ({
            team: {...state.team, members: updatedMembers}
        }))
    }

    render() {
        const {team, finishedEditing} = this.state
        const {teamMemberRoles} = this.props

        if (finishedEditing) {
            return <Redirect to={'/teams'}/>
        }

        return (
            <Container>
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
                            return <tr key={m.userId}>
                                <td>{m.user.fullName}</td>
                                <td><Select value={m.roleId} onChange={e => this.handleTeamMemberRoleChange(m.id!, parseInt(e.target.value))}>
                                    {teamMemberRoles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                                </Select></td>
                            </tr>
                        })}
                        </tbody>
                    </table>

                    <p>NAME</p>
                    <TextInput placeholder='E.g Development Team #1'
                               value={team.name}
                               name='name'
                               onChange={this.updateTeam}
                    />

                    <ButtonRow>
                        <RoundedButton onClick={() => this.createOrUpdate(team)}>Save</RoundedButton>
                    </ButtonRow>
                </Content>
            </Container>
        );
    }
}

export default withRouter(connector(ManageTeam));
