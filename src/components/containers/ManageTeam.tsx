import React, {ChangeEvent, Component} from 'react';
import styled from "styled-components";
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter, Redirect} from 'react-router-dom';
import {TextInput} from "../Styling/Input";
import * as teamActions from "../../store/team.actions";
import {RoundedButton} from "../Styling/Buttons";
import {ITeam} from "../../models/ITeam";

const Content = styled.div`
  padding: 20px;
  background-color: #ffffff;
`

const mapState = (state: RootState) => ({
    retrospectives: state.retrospectiveReducer.retrospectives,
    teams: state.teamReducer.teams,
});

const mapDispatch = {
    createOrUpdate: (team: ITeam) => teamActions.CreateOrUpdate(team)
}
const connector = connect(mapState, mapDispatch)
type IProps = ConnectedProps<typeof connector> & RouteComponentProps<{ id?: string }>

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
        if(teams.length === 0) return;


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


    render() {
        const {team, finishedEditing} = this.state

        if (finishedEditing) {
            return <Redirect to={'/'}/>
        }

        return (
            <main>
                <h1>Team: {team.name}</h1>
                <Content>
                    <p>NAME</p>
                    <TextInput placeholder='E.g Development Team #1'
                               value={team.name}
                               name='name'
                               onChange={this.updateTeam}
                    />

                    <RoundedButton style={{marginTop: '10px'}} onClick={() => this.createOrUpdate(team)}>Save</RoundedButton>
                </Content>
            </main>
        );
    }
}

export default withRouter(connector(ManageTeam));
