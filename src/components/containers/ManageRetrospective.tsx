import React, {ChangeEvent, Component} from 'react';
import styled from "styled-components";
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter, Redirect} from 'react-router-dom';
import {IUserRetrospective} from "../../models/IUserRetrospective";
import {Input, Select, TextInput} from "../Styling/Input";
import * as retrospectiveActions from "../../store/retrospective.actions";
import {RoundedButton, TextButton} from "../Styling/Buttons";
import {ITopic} from "../../models/ITopic";
import {DateHelper} from "../../helpers/DateHelper";

const Content = styled.div`
  padding: 20px;
  background-color: #ffffff;
`

const InputRow = styled.div`
  * {
    margin-right: 20px; 
  }
`

const mapState = (state: RootState) => ({
    retrospectives: state.retrospectiveReducer.retrospectives,
    teams: state.teamReducer.teams,
});

const mapDispatch = {
    createOrUpdate: (retrospective: IUserRetrospective) => retrospectiveActions.CreateOrUpdate(retrospective)
}
const connector = connect(mapState, mapDispatch)
type IProps = ConnectedProps<typeof connector> & RouteComponentProps<{ id?: string }>

interface IState {
    retrospective: IUserRetrospective,
    topic: ITopic,
    topicBeingEdited?: ITopic & { editIndex: number },
    finishedEditing: boolean,
    selectedSprintDuration: number
}

class ManageRetrospective extends Component<IProps, IState> {
    private _defaultTopic: ITopic = {
        description: '',
        durationInMinutes: 0
    }

    private _sprintDurations = [
        {name: 'Custom', value: 0},
        {name: '1 Week', value: 1},
        {name: '2 Weeks', value: 2},
        {name: '3 Weeks', value: 3},
    ];

    state: IState = {
        retrospective: {
            name: '',
            startDate: DateHelper.format(new Date()),
            endDate: DateHelper.format(new Date()),
            actions: [],
            topics: [],
            teamId: 0
        },
        topic: this._defaultTopic,
        topicBeingEdited: undefined,
        finishedEditing: false,
        selectedSprintDuration: 2
    }

    componentDidMount() {
        const {retrospectives, match} = this.props;
        const {selectedSprintDuration, retrospective} = this.state

        if (match.params.id) {
            this.setState({
                retrospective: retrospectives.find(r => r.id === parseInt(match.params.id!))!
            });
        }

        this.handleSprintDurationChange(retrospective.startDate, selectedSprintDuration);
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        if (this.props === prevProps) return;
        const {teams} = this.props;

        if(teams.length > 0){
            this.setState(state => ({
                retrospective: {...state.retrospective, teamId: teams[0].id!}
            }))
        }
    }


    private toggleTopicEditing = (topic: ITopic, index: number) => {
        const {topicBeingEdited, retrospective} = this.state

        const isInEditMode = this.state.topicBeingEdited?.editIndex === index;

        if (isInEditMode) {
            const updatedTopics = [...retrospective.topics];
            delete topicBeingEdited?.editIndex;

            updatedTopics[index] = topicBeingEdited!;

            this.setState({
                topicBeingEdited: undefined,
                retrospective: {...retrospective, topics: updatedTopics}
            });

            return;
        }

        this.setState({topicBeingEdited: {...topic, editIndex: index}});
    }

    private handleSprintDurationChange = (startDate: string, durationInWeeks: number) => {
        this.setState(state => ({
            selectedSprintDuration: durationInWeeks,
            retrospective: {
                ...state.retrospective,
                endDate: this.getEndDate(startDate, durationInWeeks)
            }
        }))
    }


    private getEndDate = (startDate: string, durationInWeeks: number): string => {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + durationInWeeks * 7);

        return DateHelper.format(endDate);
    }

    private addTopic = (topic: ITopic) => {
        const {retrospective} = this.state;
        this.setState({
            retrospective: {...retrospective, topics: [...retrospective.topics, topic]},
            topic: this._defaultTopic
        });
    }

    private createOrUpdate = (retrospective: IUserRetrospective) => {
        const {createOrUpdate} = this.props
        createOrUpdate(retrospective);
        this.setState({finishedEditing: true})
    }

    private handleSprintStartChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;

        this.setState(state => ({
                retrospective: {
                    ...state.retrospective,
                    startDate: value,
                    endDate: this.getEndDate(value, state.selectedSprintDuration)
                }
            }
        ));
    }

    private updateRetrospective = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        this.updateState('retrospective', event);
    }

    private updateState = (key: keyof IState, event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, mutator: (value: any) => any = value => value) => {
        const {name, value} = event.target
        this.setState({[key]: {...this.state[key] as any, [name]: mutator(value)}} as IState);
    }

    render() {
        const {retrospective, topic, topicBeingEdited, finishedEditing, selectedSprintDuration} = this.state
        const {teams} = this.props

        const canAddTopic = topic.description.length > 0;

        if (finishedEditing) {
            return <Redirect to={'/'}/>
        }

        return (
            <main>
                <h1>Retrospective: {retrospective.name}</h1>
                <Content>
                    <p>NAME</p>
                    <TextInput placeholder='E.g Retrospective #12'
                               value={retrospective.name}
                               name='name'
                               onChange={this.updateRetrospective}
                    />

                    <p>TEAM</p>
                    <Select value={retrospective.teamId} name='teamId' onChange={this.updateRetrospective}>
                        {teams.map(t => <option>{t.name}</option>)}
                    </Select>
                    <p>SPRINT</p>

                    <InputRow>
                        <Select value={selectedSprintDuration}
                                onChange={e => this.handleSprintDurationChange(retrospective.startDate, parseInt(e.target.value))}>
                            {this._sprintDurations.map(duration => <option
                                value={duration.value}>{duration.name}</option>)}
                        </Select>
                        <Input type='date' name='startDate' value={retrospective.startDate}
                               onChange={this.handleSprintStartChange}/>
                        <Input type='date' name='endDate' value={retrospective.endDate}
                               onChange={this.updateRetrospective}/>
                    </InputRow>

                    <p>TOPICS</p>
                    <table>
                        <tbody>
                        <tr>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Action</th>
                        </tr>
                        {retrospective.topics.map((event, index) => {
                            const isInReadMode = topicBeingEdited?.editIndex !== index;

                            return <tr key={event.id}>
                                <td>{isInReadMode
                                    ? event.description
                                    : <TextInput value={topicBeingEdited!.description}
                                                 onChange={e => this.updateState('topicBeingEdited', e)}/>
                                }</td>
                                <td>{isInReadMode
                                    ? event.durationInMinutes
                                    : <TextInput value={topicBeingEdited!.durationInMinutes}
                                                 onChange={e => this.updateState('topicBeingEdited', e, parseInt)}/>
                                }</td>
                                <td><TextButton
                                    onClick={() => this.toggleTopicEditing(event, index)}>{isInReadMode ? 'EDIT' : 'SAVE'}</TextButton>
                                </td>
                            </tr>
                        })}
                        <tr>
                            <td><TextInput value={topic.description}
                                           name='description'
                                           onChange={e => this.updateState('topic', e)}/>
                            </td>
                            <td><TextInput type='number'
                                           value={topic.durationInMinutes}
                                           name='durationInMinutes'
                                           onChange={e => this.updateState('topic', e, parseInt)}/>
                            </td>
                            <td>
                                <TextButton disabled={!canAddTopic} onClick={() =>this.addTopic(topic)}>ADD</TextButton>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <hr/>

                    <RoundedButton onClick={() => this.createOrUpdate(retrospective)}>Save</RoundedButton>
                </Content>
            </main>
        );
    }
}

export default withRouter(connector(ManageRetrospective));
