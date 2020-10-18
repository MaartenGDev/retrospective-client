import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import * as retrospectiveActions from "../../store/retrospective.actions";
import {IComment} from "../../models/IComment";
import {ICommentCategory} from "../../models/ICommentCategory";
import {Icon} from "../styles/Icons";
import {Text, TextHeader} from "../styles/Text";
import {IUser} from "../../models/IUser";
import {Container, Row, SectionTitle, Spacer, Title} from "../styles/Common";
import {RoundedButton, RoundedButtonLink, TextButton} from "../styles/Buttons";
import {parseId} from "../../helpers/Uri";
import {NotFound} from "../presentation/NotFound";
import {IAction} from "../../models/IAction";
import {TextInput} from "../styles/Input";
import VisibilityIcon from "../presentation/common/icons/VisibilityIcon";
import {DateHelper} from "../../helpers/DateHelper";

const Content = styled.div`
  padding: 20px;
  background-color: #ffffff;
`

const CommentSection = styled.div`
  border: 1px solid #dad7d7;
  border-radius: 3px;
  
  div:last-of-type {
      border: none;
  }
`

const CommentGroup = styled.div`
  padding: 10px;
  border-bottom: 1px solid #dad7d7;
`

const CommentRow = styled.div`
display: flex;
margin-top: 5px;
align-items: center;
`

const ButtonGroup = styled.div`
  display: flex;
`

const ActionModeButton = styled(RoundedButton)`
  margin-right: 10px;
  display: flex;
  align-items: center;
`

const mapState = (state: RootState) => ({
    commentCategories: state.commentCategoryReducer.commentCategories,
    retrospectiveReport: state.retrospectiveReducer.retrospectiveReport,
    isLoadingReport: state.retrospectiveReducer.isLoadingReport,
    teams: state.teamReducer.teams,
    user: state.authenticationReducer.user,
});

const mapDispatch = {
    loadReport: retrospectiveActions.LoadReport,
    addAction: retrospectiveActions.AddAction,
    updateAction: retrospectiveActions.UpdateAction,
    completeAction: retrospectiveActions.CompleteAction,
}

type ICommentsByCategoryAndUser = { [categoryId: number]: { id: number, users: { [userId: string]: { user: IUser, comments: IComment[] } } } };

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps<{ id: string }>


const defaultAction = {description: '', responsible: ''};

const RetrospectiveReport: FC<PropsFromRedux> = ({commentCategories, teams, user, match, retrospectiveReport, loadReport, isLoadingReport, addAction, updateAction, completeAction}) => {
    const retrospectiveId = parseId(match.params.id);

    const [actionBeingEdited, setActionBeingEdited] = useState<IAction>(defaultAction);
    const [newAction, setNewAction] = useState<IAction>(defaultAction);
    const [actionModeIsActive, setActionModeIsActive] = useState(false);

    useEffect(() => {
        if (retrospectiveId) {
            loadReport(retrospectiveId)
        }
    }, [retrospectiveId, loadReport])

    if (!isLoadingReport && !retrospectiveReport) {
        return <NotFound message='The retrospective could not be found, are you invited to the team?'/>
    }

    if (isLoadingReport || !retrospectiveReport || commentCategories.length === 0) {
        return null;
    }

    const commentCategoriesById = commentCategories.reduce((acc: { [id: string]: ICommentCategory }, cur) => {
        acc[cur.id] = cur;
        return acc;
    }, {})

    const retrospective = retrospectiveReport.retrospective;
    const retrospectiveIsCompleted = DateHelper.isAfterDate(new Date(retrospective.endDate), new Date());


    const commentsByCategoryAndUser = retrospectiveReport.comments.reduce((acc: ICommentsByCategoryAndUser, comment: IComment) => {
        if (!acc.hasOwnProperty(comment.categoryId)) {
            acc[comment.categoryId] = {
                id: comment.category.id,
                users: {}
            }
        }

        const owner = comment.evaluation!.user!;

        if (!acc[comment.categoryId].users.hasOwnProperty(owner.id)) {
            acc[comment.categoryId].users[owner.id] = {
                user: owner,
                comments: []
            }
        }
        acc[comment.categoryId].users[owner.id].comments = [...acc[comment.categoryId].users[owner.id].comments, comment];

        return acc;
    }, {});

    const canEditRetrospective = teams.some(team => team.id === retrospective.team?.id && team.members.some(m => m.user.id === user?.id && m.role.canManageRetrospective));

    const sortedTopics = [...retrospective.topics].sort((a, b) => a.order - b.order);

    return (
        <Container>
            <Row>
                <Title>Retrospective: {retrospective.name}</Title>
                {canEditRetrospective && <ButtonGroup>
                    {!retrospectiveIsCompleted && <ActionModeButton
                        onClick={() => setActionModeIsActive(!actionModeIsActive)}
                        color='#3B4558'>{actionModeIsActive && <><VisibilityIcon color='white' />&nbsp;</>}Action mode
                    </ActionModeButton>}

                    <RoundedButtonLink data-testid='edit-action'
                                       to={`/retrospectives/${retrospective.id}/edit`}>Edit</RoundedButtonLink>
                </ButtonGroup>}
            </Row>
            <Content>
                <SectionTitle>AGENDA</SectionTitle>
                <table>
                    <tbody>
                    <tr>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Type</th>
                    </tr>
                    {sortedTopics.map((topic, index) => {
                        return <tr key={topic.id}>
                            <td data-testid={`topic-description-by-index-${index}`}>{topic.description}</td>
                            <td data-testid={`topic-duration-by-index-${index}`}>{topic.durationInMinutes} minutes</td>
                            <td>Provided</td>
                        </tr>
                    })}
                    {retrospectiveReport.suggestedTopics.map((topic, index) => {
                        return <tr key={-index} style={{backgroundColor: '#f1f1f1'}}>
                            <td data-testid={`suggested-topic-${index}-description`}>{topic.description}</td>
                            <td data-testid={`suggested-topic-${index}-suggested-by`} colSpan={2}>Suggested
                                (By {topic.suggestedBy.fullName})
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>

                <Spacer/>

                <SectionTitle>ACTIONS</SectionTitle>
                <table>
                    <tbody>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        {actionModeIsActive && <th>Edit</th>}
                        {actionModeIsActive && <th>Complete</th>}
                    </tr>
                    {retrospectiveReport.actions.map(action => {
                        const isInReadMode = actionBeingEdited.id !== action.id;

                        return (
                            <tr key={action.id}>
                                <td data-testid={`action-${action.id}-description`}>{isInReadMode
                                    ? action.description
                                    : <TextInput name='description' value={actionBeingEdited.description}
                                                 onChange={e => setActionBeingEdited({
                                                     ...actionBeingEdited,
                                                     description: e.target.value
                                                 })}/>
                                }</td>
                                <td>{isInReadMode
                                    ? action.responsible
                                    : <TextInput name='responsible' value={actionBeingEdited.responsible}
                                                 onChange={e => setActionBeingEdited({
                                                     ...actionBeingEdited,
                                                     responsible: e.target.value
                                                 })}/>
                                }</td>
                                {actionModeIsActive && <td><TextButton
                                    onClick={() => {
                                        if (!isInReadMode) {
                                            updateAction(retrospectiveId, actionBeingEdited);
                                        }

                                        setActionBeingEdited(isInReadMode ? action : defaultAction);
                                    }}>{isInReadMode ? 'EDIT' : 'SAVE'}</TextButton>
                                </td>}
                                {actionModeIsActive && <td><TextButton color='#3B4558'
                                                onClick={() => completeAction(action.retrospectiveId!, action.id!)}>COMPLETE</TextButton>
                                </td>}
                            </tr>
                        )
                    })}
                    {actionModeIsActive && <tr>
                        <td><TextInput value={newAction.description}
                                                   onChange={e => setNewAction({
                                                       ...newAction,
                                                       description: e.target.value
                                                   })}/>
                        </td>
                        <td><TextInput
                            value={newAction.responsible}
                            onChange={e => setNewAction({...newAction, responsible: e.target.value})}/>
                        </td>
                        <td colSpan={2}>
                            <TextButton disabled={newAction.description.length === 0 || newAction.responsible.length === 0}
                                        onClick={() => {
                                            addAction(retrospectiveId, newAction);
                                            setNewAction(defaultAction);
                                        }}>ADD</TextButton>
                        </td>
                    </tr>}
                    </tbody>
                </table>

                <Spacer/>

                <SectionTitle>TO DISCUSS</SectionTitle>
                {Object.values(commentsByCategoryAndUser).map(categoryGroup => {
                        const category = commentCategoriesById[categoryGroup.id];

                        return <div key={categoryGroup.id}>
                            <TextHeader>{category.description}</TextHeader>
                            <CommentSection>
                                {Object.values(categoryGroup.users).map(userGroup => <CommentGroup key={userGroup.user.id}>
                                    <Text>{userGroup.user.fullName}</Text>
                                    <div>
                                        {userGroup.comments.map(c => <CommentRow key={c.id}><Icon
                                            style={{
                                                backgroundColor: category.iconColor,
                                                marginRight: '5px'
                                            }}>{category.iconLabel}</Icon> <span
                                            data-testid={`comment-${c.id}-value`}>{c.body}</span>
                                        </CommentRow>)}
                                    </div>
                                </CommentGroup>)}
                            </CommentSection>
                        </div>
                    }
                )}

                <Spacer/>

                <SectionTitle>SUGGESTED ACTIONS</SectionTitle>
                <table>
                    <tbody>
                    <tr>
                        <th>Description</th>
                        <th>Suggested by</th>
                        {actionModeIsActive && <th>Action</th>}
                    </tr>
                    {retrospectiveReport.suggestedActions.map((suggestedAction, index) => {
                        return <tr key={index}>
                            <td data-testid={`suggested-action-${index}-description`}>{suggestedAction.description}</td>
                            <td data-testid={`suggested-action-${index}-suggested-by`}>{suggestedAction.suggestedBy.fullName}</td>
                            {actionModeIsActive && <td><TextButton onClick={() => addAction(retrospectiveId, {
                                description: suggestedAction.description,
                                responsible: suggestedAction.suggestedBy.fullName,
                                retrospectiveId: retrospective.id!
                            })}>ADD</TextButton></td>}
                        </tr>
                    })}
                    </tbody>
                </table>

            </Content>
        </Container>
    );
}

export default withRouter(connector(RetrospectiveReport));
