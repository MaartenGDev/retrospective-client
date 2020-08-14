import React, {FC, useEffect} from 'react';
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
import {RoundedButtonLink} from "../styles/Buttons";
import {parseId} from "../../helpers/Uri";
import {NotFound} from "../presentation/NotFound";

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

const mapState = (state: RootState) => ({
    commentCategories: state.commentCategoryReducer.commentCategories,
    retrospectiveReport: state.retrospectiveReducer.retrospectiveReport,
    isLoadingReport: state.retrospectiveReducer.isLoadingReport,
    teams: state.teamReducer.teams,
    user: state.authenticationReducer.user,
});

const mapDispatch = {
    loadReport: (retrospectiveId: number | string) => retrospectiveActions.LoadReport(retrospectiveId)
}

type ICommentsByCategoryAndUser = { [categoryId: number]: { id: number, users: { [userId: string]: { user: IUser, comments: IComment[] } } } };

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps<{ id: string }>

const RetrospectiveReport: FC<PropsFromRedux> = ({commentCategories, teams, user, match, retrospectiveReport, loadReport, isLoadingReport}) => {
    const retrospectiveId = parseId(match.params.id);

    useEffect(() => {
        if(retrospectiveId){
            loadReport(retrospectiveId)
        }
    }, [retrospectiveId, loadReport])

    if(!isLoadingReport && !retrospectiveReport){
        return <NotFound message='The retrospective could not be found, are you invited to the team?' />
    }

    if (isLoadingReport || !retrospectiveReport || commentCategories.length === 0) {
        return null;
    }

    const commentCategoriesById = commentCategories.reduce((acc: { [id: string]: ICommentCategory }, cur) => {
        acc[cur.id] = cur;
        return acc;
    }, {})

    const retrospective = retrospectiveReport.retrospective;

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
                {canEditRetrospective &&
                <RoundedButtonLink data-testid='edit-action' to={`/retrospectives/${retrospective.id}/edit`}>Edit</RoundedButtonLink>}
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
                            <td data-testid={`suggested-topic-${index}-suggested-by`} colSpan={2}>Suggested (By {topic.suggestedBy.fullName})</td>
                        </tr>
                    })}
                    </tbody>
                </table>

                <Spacer/>

                {retrospective.actions.length > 0 && <>
                    <SectionTitle>ACTIONS PREVIOUS SPRINT</SectionTitle>
                    <table>
                        <tbody>
                        <tr>
                            <th>Done</th>
                            <th>Description</th>
                            <th>Responsible</th>
                        </tr>
                        {retrospective.actions.map(event => {
                            return <tr key={event.id}>
                                <td><input data-testid={`action-${event.id}-completed`} readOnly type='checkbox' checked={event.isCompleted}/></td>
                                <td data-testid={`action-${event.id}-description`}>{event.description}</td>
                                <td data-testid={`action-${event.id}-responsible`}>{event.responsible}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>

                    <Spacer/>
                </>}

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
                                            }}>{category.iconLabel}</Icon> <span data-testid={`comment-${c.id}-value`}>{c.body}</span>
                                        </CommentRow>)}
                                    </div>
                                </CommentGroup>)}
                            </CommentSection>
                        </div>
                    }
                )}

                <Spacer/>

                <SectionTitle>ACTIONS NEXT SPRINT</SectionTitle>
                <table>
                    <tbody>
                    <tr>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Suggested by</th>
                    </tr>
                    {retrospectiveReport.suggestedActions.map((action, index) => {
                        return <tr key={index}>
                            <td data-testid={`suggested-action-${index}-description`}>{action.description}</td>
                            <td data-testid={`suggested-action-${index}-suggested-by`}>{action.suggestedBy.fullName}</td>
                            <td>Suggested</td>
                        </tr>
                    })}
                    </tbody>
                </table>

            </Content>
        </Container>
    );
}

export default withRouter(connector(RetrospectiveReport));
