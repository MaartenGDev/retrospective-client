import React, {FC, useState} from 'react';
import styled from "styled-components";
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {CategorySlider} from "../common/CategorySlider";
import {ValueSlider} from "../common/ValueSlider";
import {IEvaluation} from "../../models/IEvaluation";
import * as retrospectiveActions from "../../store/retrospective.actions";
import {TextArea} from "../Styling/Input";
import {RoundedButton} from "../Styling/Buttons";

const Content = styled.div`
  padding: 20px;
  background-color: #ffffff;
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`

const InputGrid = styled.div`
  display: flex;
  justify-content: space-between;
`

const GridColumn = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

const Icon = styled.span`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  align-content: center;
  border-radius: 100%;
`

const Input = styled.input`
  border-radius: 5px;
  padding: 7px 10px;
  margin-left: 10px;
  border: 1px solid #707070;
  flex-grow: 1;
  margin-right: 25px;
`

const InputRow = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`

const mapState = (state: RootState) => ({retrospectives: state.retrospectiveReducer.retrospectives});

const mapDispatch = {
    create: (evaluation: IEvaluation) => retrospectiveActions.AddEvaluation(evaluation)
}


const connector = connect(mapState, mapDispatch)



interface IProps {
}

type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps<{ id: string }> & IProps;


const RetrospectiveFeedback: FC<PropsFromRedux> = ({retrospectives, match, create}) => {
    const retrospective = retrospectives.find(r => r.id === parseInt(match.params.id))!;

    const timeUsage = [
        {name: 'Meetings', value: 20, color: '#4A92E6'},
        {name: 'focus', value: 60, color: '#4AE6AA'},
        {name: 'disturbance', value: 20, color: '#BC4767'}
    ];

    const inputGrid = [
        {
            id: 1,
            minValues: 1,
            category: 'Good',
            icon: {label: '+', color: '#4AE6AA'},
            inputs: [{label: 'Good'}, {label: 'Good'}, {label: 'Good'}]
        },
        {
            id: 2,
            minValues: 1,
            category: 'Improvement',
            icon: {label: '~', color: '#D67F28'},
            inputs: [{label: 'Room for improvement'}, {label: 'Room for improvement'}, {label: 'Room for improvement'}]
        },
        {
            id: 3,
            minValues: 0,
            category: 'ThinkingAbout',
            icon: {label: 'I', color: '#4A92E6'},
            inputs: [{label: 'Thinking about'}, {label: 'Thinking about'}, {label: 'Thinking about'}]
        },
    ];

    const [form, setForm] = useState<IEvaluation>({
        retrospectiveId: retrospective?.id!,
        timeUsage,
        sprintRating: 50,
        suggestedActions: '',
        suggestedTopics: '',
        feedback: inputGrid.reduce((acc, cur) => ({...acc, [cur.category]: ['']}), {})
    });

    if (!retrospective) {
        return <main>Not found</main>
    }

    return (
        <main>
            <h1>Retrospective: {retrospective.name}</h1>
            <Content>
                <p>TIME USAGE</p>
                <p><b>Balance</b></p>
                <p>Adjust the slider to indicate how your sprint was spent such as how much time was available to
                    focus.</p>
                <CategorySlider categories={form.timeUsage} onCategoriesChange={t => setForm({...form, timeUsage: t})}/>

                <p><b>Sprint rating</b> (<span style={{fontStyle: 'italic'}}>{form.sprintRating / 10}/10</span>)</p>
                <p>What grade would you give this sprint? Base it on the status of your set goals and the achieved
                    results.</p>
                <ValueSlider color='#4AE6AA' value={form.sprintRating} onChange={e => setForm({...form, sprintRating: e})}/>

                <hr/>
                <p>FEEDBACK</p>
                <p>Provide at least one positive point and one area where there is room for improvement. Keep the
                    description brief because it will be discussed in full detail during the retrospective.</p>

                <InputGrid>
                    {inputGrid.map(column => <GridColumn key={column.id}>
                        {column.inputs.map((input, index) => (
                            <InputRow key={index}>
                                <Icon style={{backgroundColor: column.icon.color}}>{column.icon.label}</Icon>
                                <Input type='text' placeholder={input.label} onChange={e => {

                                    const latestFeedbackForCategory = [...form.feedback[column.category]];
                                    latestFeedbackForCategory[index] = e.target.value;

                                    setForm({...form, feedback: {...form.feedback, [column.category]: latestFeedbackForCategory}})
                                }}/>
                            </InputRow>
                        ))}
                    </GridColumn>)}
                </InputGrid>

                <hr/>
                <p>SUGGESTIONS</p>
                <p>What actions should be taken for the next sprint?</p>
                <TextArea placeholder='E.g changing the workflow or appointing a single person to hide it.'
                          value={form.suggestedActions}
                          onChange={e => setForm({...form, suggestedActions: e.target.value})}
                />
                <hr/>
                <p>FEEDBACK</p>
                <p>What should be discussed during the retrospective?</p>
                <TextArea placeholder='E.g how we handle onboarding'
                          value={form.suggestedTopics}
                          onChange={e => setForm({...form, suggestedTopics: e.target.value})}
                />

                <ButtonRow>
                    <RoundedButton onClick={() => create(form)}>Submit</RoundedButton>
                </ButtonRow>
            </Content>
        </main>
    );
}

export default withRouter(connector(RetrospectiveFeedback));
