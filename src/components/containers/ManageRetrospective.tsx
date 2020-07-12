import React, {ChangeEvent, Component} from 'react';
import styled from "styled-components";
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter, Redirect} from 'react-router-dom';
import {IUserRetrospective} from "../../models/IUserRetrospective";
import {Input, Select, TextInput} from "../shared/Input";
import * as retrospectiveActions from "../../store/retrospective.actions";
import {RoundedButton, TextButton} from "../shared/Buttons";
import {ITopic} from "../../models/ITopic";
import {DateHelper} from "../../helpers/DateHelper";
import {ButtonRow, Container, Row, SectionTitle, Spacer, Title} from "../shared/Common";
import {IAction} from "../../models/IAction";

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
    user: state.authenticationReducer.user,
});

const mapDispatch = {
    createOrUpdate: (retrospective: IUserRetrospective) => retrospectiveActions.CreateOrUpdate(retrospective)
}
const connector = connect(mapState, mapDispatch)
type IProps = ConnectedProps<typeof connector> & RouteComponentProps<{ id?: string }>

interface IState {
    retrospective: IUserRetrospective,
    topic: ITopic,
    action: IAction,
    topicBeingEdited?: ITopic & { editIndex: number },
    actionBeingEdited?: IAction & { editIndex: number },
    finishedEditing: boolean,
    selectedSprintDuration: number,
    nextTopicId: number
    nextActionId: number
}

class ManageRetrospective extends Component<IProps, IState> {
    private _defaultTopic: ITopic = {
        id: 0,
        description: '',
        durationInMinutes: 0
    }

    private _defaultAction: IAction = {
        id: 0,
        description: '',
        responsible: '',
        isCompleted: false
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
        action: this._defaultAction,
        topicBeingEdited: undefined,
        actionBeingEdited: undefined,
        finishedEditing: false,
        selectedSprintDuration: 2,
        nextTopicId: -1,
        nextActionId: -1
    }

    componentDidMount() {
        const {selectedSprintDuration, retrospective} = this.state

        this.handleSprintDurationChange(retrospective.startDate, selectedSprintDuration);
        this.decorateRetrospective();
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        if (this.props === prevProps) return;

        this.decorateRetrospective();
    }

    private decorateRetrospective() {
        const {retrospective} = this.state
        const {teams, match, retrospectives} = this.props;

        const nextRetrospective = match.params.id && retrospectives.length
            ? {...retrospective, ...retrospectives.find(r => r.id === parseInt(match.params.id!))!}
            : retrospective;


        const nextTeamId = teams.length
            ? teams[0].id!
            : retrospective.teamId;

        this.setState({
            retrospective: {...nextRetrospective, teamId: nextTeamId}
        });
    }

    private removeTopic = (topic: ITopic, index: number) => {
        const {retrospective} = this.state

        this.setState({
            retrospective: {...retrospective, topics: retrospective.topics.filter(t => t.id !== topic.id)}
        });
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

    private removeAction = (action: IAction, index: number) => {
        const {retrospective} = this.state

        this.setState({
            retrospective: {...retrospective, actions: retrospective.actions.filter(t => t.id !== action.id)}
        });
    }

    private toggleActionEditing = (action: IAction, index: number) => {
        const {actionBeingEdited, retrospective} = this.state
        const isInEditMode = actionBeingEdited?.editIndex === index;

        if (isInEditMode) {
            const updatedActions = [...retrospective.actions];
            delete actionBeingEdited?.editIndex;

            updatedActions[index] = actionBeingEdited!;

            this.setState({
                topicBeingEdited: undefined,
                retrospective: {...retrospective, actions: updatedActions}
            });

            return;
        }

        this.setState({actionBeingEdited: {...action, editIndex: index}});
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
        const {retrospective, nextTopicId} = this.state;

        const nextTopic = {...topic, id: nextTopicId};

        this.setState({
            retrospective: {...retrospective, topics: [...retrospective.topics, nextTopic]},
            topic: this._defaultTopic,
            nextTopicId: nextTopicId - 1
        });
    }

    private addAction = (action: IAction) => {
        const {retrospective, nextActionId} = this.state;

        const nextAction = {...action, id: nextActionId};

        this.setState({
            retrospective: {...retrospective, actions: [...retrospective.actions, nextAction]},
            action: this._defaultAction,
            nextActionId: nextActionId - 1
        });
    }

    private createOrUpdate = (retrospective: IUserRetrospective) => {
        const {createOrUpdate} = this.props

        createOrUpdate({
            ...retrospective,
            topics: this.removeTemporaryIds(retrospective.topics),
            actions: this.removeTemporaryIds(retrospective.actions),
        });
        this.setState({finishedEditing: true})
    }

    private removeTemporaryIds(items: any[]): any {
        return items.map(item => {
            const clone = {...item};
            if(item.id <= 0){
                delete clone.id;
            }
            return clone;
        });
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
        const {retrospective, topic, action, topicBeingEdited, actionBeingEdited,finishedEditing, selectedSprintDuration} = this.state
        const {teams, user} = this.props
        const teamsWhereUserIdAdmin = teams.filter(t => t.members.some(m => m.userId === user?.id && m.role.canManageRetrospective))


        const canAddTopic = topic.description.length > 0;
        const canAddAction = action.description.length > 0;

        const isExistingRetrospective = !!retrospective.id;

        if (finishedEditing) {
            return <Redirect to={'/'}/>
        }

        return (
            <Container>
                <Row>
                    <Title>Retrospective: {retrospective.name}</Title>
                </Row>

                <Content>
                    <SectionTitle>NAME</SectionTitle>
                    <TextInput placeholder='E.g Retrospective #12'
                               value={retrospective.name}
                               name='name'
                               onChange={this.updateRetrospective}
                    />

                    <SectionTitle>TEAM</SectionTitle>
                    <Select disabled={isExistingRetrospective} value={retrospective.teamId} name='teamId' onChange={this.updateRetrospective}>
                        {teamsWhereUserIdAdmin.map(t => <option value={t.id} key={t.id}>{t.name}</option>)}
                    </Select>
                    <SectionTitle>SPRINT</SectionTitle>

                    <InputRow>
                        <Select value={selectedSprintDuration}
                                onChange={e => this.handleSprintDurationChange(retrospective.startDate, parseInt(e.target.value))}>
                            {this._sprintDurations.map(duration => <option key={duration.value}
                                value={duration.value}>{duration.name}</option>)}
                        </Select>
                        <Input type='date' name='startDate' value={retrospective.startDate}
                               onChange={this.handleSprintStartChange}/>
                        <Input type='date' name='endDate' value={retrospective.endDate}
                               onChange={this.updateRetrospective}/>
                    </InputRow>

                    <Spacer />

                    <SectionTitle>TOPICS</SectionTitle>
                    <table>
                        <tbody>
                        <tr>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                        {retrospective.topics.map((event, index) => {
                            const isInReadMode = topicBeingEdited?.editIndex !== index;

                            return <tr key={index}>
                                <td>{isInReadMode
                                    ? event.description
                                    : <TextInput name='description' value={topicBeingEdited!.description}
                                                 onChange={e => this.updateState('topicBeingEdited', e)}/>
                                }</td>
                                <td>{isInReadMode
                                    ? event.durationInMinutes
                                    : <TextInput name='durationInMinutes' value={topicBeingEdited!.durationInMinutes}
                                                 onChange={e => this.updateState('topicBeingEdited', e, parseInt)}/>
                                }</td>
                                <td><TextButton
                                    onClick={() => this.toggleTopicEditing(event, index)}>{isInReadMode ? 'EDIT' : 'SAVE'}</TextButton>
                                </td>
                                <td><TextButton color='#e53935'
                                    onClick={() => this.removeTopic(event, index)}>REMOVE</TextButton>
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
                            <td colSpan={2}>
                                <TextButton disabled={!canAddTopic}
                                            onClick={() => this.addTopic(topic)}>ADD</TextButton>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <Spacer/>

                    <SectionTitle>ACTIONS</SectionTitle>
                    <table>
                        <tbody>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                        {retrospective.actions.map((action, index) => {
                            const isInReadMode = actionBeingEdited?.editIndex !== index;

                            return <tr key={index}>
                                <td>{isInReadMode
                                    ? action.description
                                    : <TextInput name='description' value={actionBeingEdited!.description}
                                                 onChange={e => this.updateState('actionBeingEdited', e)}/>
                                }</td>
                                <td>{isInReadMode
                                    ? action.responsible
                                    : <TextInput name='responsible' value={actionBeingEdited!.responsible}
                                                 onChange={e => this.updateState('actionBeingEdited', e)}/>
                                }</td>
                                <td><TextButton
                                    onClick={() => this.toggleActionEditing(action, index)}>{isInReadMode ? 'EDIT' : 'SAVE'}</TextButton>
                                </td>
                                <td><TextButton color='#e53935'
                                                onClick={() => this.removeAction(action, index)}>REMOVE</TextButton>
                                </td>
                            </tr>
                        })}
                        <tr>
                            <td><TextInput value={action.description}
                                           name='description'
                                           onChange={e => this.updateState('action', e)}/>
                            </td>
                            <td><TextInput
                                           value={action.responsible}
                                           name='responsible'
                                           onChange={e => this.updateState('action', e)}/>
                            </td>
                            <td colSpan={2}>
                                <TextButton disabled={!canAddAction}
                                            onClick={() => this.addAction(action)}>ADD</TextButton>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <ButtonRow>
                        <RoundedButton onClick={() => this.createOrUpdate(retrospective)}>Save</RoundedButton>
                    </ButtonRow>
                </Content>
            </Container>
        );
    }
}

export default withRouter(connector(ManageRetrospective));
