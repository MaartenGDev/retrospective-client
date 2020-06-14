import React, {Component} from 'react';
import styled from "styled-components";
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter, Redirect} from 'react-router-dom';
import {IRetrospective} from "../../models/IRetrospective";
import {TextInput} from "../Styling/Input";
import * as retrospectiveActions from "../../store/retrospective.actions";
import {RoundedButton, TextButton} from "../Styling/Buttons";
import {ITopic} from "../../models/ITopic";

const Content = styled.div`
  padding: 20px;
  background-color: #ffffff;
`

const mapState = (state: RootState) => ({retrospectives: state.retrospectiveReducer.retrospectives});

const mapDispatch = {
    createOrUpdate: (retrospective: IRetrospective) => retrospectiveActions.CreateOrUpdate(retrospective)
}
const connector = connect(mapState, mapDispatch)
type IProps = ConnectedProps<typeof connector> & RouteComponentProps<{ id?: string }>

interface IState {
    retrospective: IRetrospective,
    topic: ITopic,
    topicBeingEdited?: ITopic & { editIndex: number },
    finishedEditing: boolean
}

class ManageRetrospective extends Component<IProps, IState> {
    private _defaultTopic: ITopic = {
        description: '',
        durationInMinutes: 0
    }

    state: IState = {
        retrospective: {
            name: '',
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            actions: [],
            topics: []
        },
        topic: this._defaultTopic,
        topicBeingEdited: undefined,
        finishedEditing: false
    }

    componentDidMount() {
        const {retrospectives, match} = this.props;

        if (match.params.id) {
            this.setState({
                retrospective: retrospectives.find(r => r.id === parseInt(match.params.id!))!
            });
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

    private addTopic = (topic: ITopic) => {
        const {retrospective} = this.state;
        this.setState({
            retrospective: {...retrospective, topics: [...retrospective.topics, topic]},
            topic: this._defaultTopic
        });
    }

    private createOrUpdate = (retrospective: IRetrospective) => {
        const {createOrUpdate} = this.props
        createOrUpdate(retrospective);
        this.setState({finishedEditing: true})
    }

    render() {
        const {retrospective, topic, topicBeingEdited, finishedEditing} = this.state

        const canAddTopic = topic.description.length > 0;

        if(finishedEditing){
            return <Redirect to={'/'} />
        }

        return (
            <main>
                <h1>Retrospective: {retrospective.name}</h1>
                <Content>
                    <p>NAME</p>
                    <TextInput placeholder='E.g Retrospective #12'
                               value={retrospective.name}
                               onChange={e => this.setState({retrospective: {...retrospective, name: e.target.value}})}
                    />

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
                                                 onChange={e => this.setState({
                                                     topicBeingEdited: {
                                                         ...topicBeingEdited!,
                                                         description: e.target.value
                                                     }
                                                 })}/>
                                }</td>
                                <td>{isInReadMode
                                    ? event.durationInMinutes
                                    : <TextInput value={topicBeingEdited!.durationInMinutes}
                                                 onChange={e => this.setState({
                                                     topicBeingEdited: {
                                                         ...topicBeingEdited!,
                                                         durationInMinutes: parseInt(e.target.value)
                                                     }
                                                 })}/>
                                }</td>
                                <td><TextButton
                                    onClick={() => this.toggleTopicEditing(event, index)}>{isInReadMode ? 'EDIT' : 'SAVE'}</TextButton>
                                </td>
                            </tr>
                        })}
                        <tr>
                            <td><TextInput value={topic.description}
                                           onChange={e => this.setState({
                                               topic: {
                                                   ...topic,
                                                   description: e.target.value
                                               }
                                           })}/>
                            </td>
                            <td><TextInput type='number' value={topic.durationInMinutes}
                                           onChange={e =>
                                               this.setState({
                                                   topic: {
                                                       ...topic,
                                                       durationInMinutes: parseInt(e.target.value)
                                                   }
                                               })
                                           }/>
                            </td>
                            <td>
                                <TextButton disabled={!canAddTopic}
                                            onClick={() => this.addTopic(topic)}>ADD</TextButton>
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
