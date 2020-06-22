import React, {FC, useEffect} from 'react';
import styled from "styled-components";
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import * as retrospectiveActions from "../../store/retrospective.actions";
import {IComment} from "../../models/IComment";
import {ICommentCategory} from "../../models/ICommentCategory";
import {Icon} from "../Styling/Icons";

const Content = styled.div`
  padding: 20px;
  background-color: #ffffff;
`

const CommentSection = styled.div`
  border: 1px solid gray;
  border-radius: 3px;
  
  div:last-of-type {
      border: none;
  }
`

const CommentGroup = styled.div`
  padding: 10px;
  border-bottom: 1px solid gray;
`

const CommentRow = styled.div`
display: flex;
margin-top: 5px;
align-items: center;
`

const mapState = (state: RootState) => ({
    commentCategories: state.commentCategoryReducer.commentCategories,
    retrospectiveReport: state.retrospectiveReducer.retrospectiveReport
});

const mapDispatch = {
    loadReport: (retrospectiveId: number) => retrospectiveActions.LoadReport(retrospectiveId)
}

type ICommentsByCategoryAndUser = { [categoryId: number]: { id: number, users: { [userId: string]: { id: string, comments: IComment[] } } } };

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps<{ id: string }>


const Retrospective: FC<PropsFromRedux> = ({commentCategories, match, retrospectiveReport, loadReport}) => {
    const retrospectiveId = parseInt(match.params.id);


    useEffect(() => {
        loadReport(retrospectiveId)
    }, [retrospectiveId])

    if (!retrospectiveReport || commentCategories.length === 0) {
        return <main>Loading</main>
    }

    const commentCategoriesById = commentCategories.reduce((acc: { [id: string]: ICommentCategory }, cur) => {
        acc[cur.id] = cur;
        return acc;
    }, {})

    const retrospective = retrospectiveReport.retrospective;

    const commentsByCategoryAndUser = retrospectiveReport.comments.reduce((acc: ICommentsByCategoryAndUser, comment: IComment) => {
        if (!acc.hasOwnProperty(comment.categoryId)) {
            acc[comment.categoryId] = {
                id: comment.categoryId,
                users: {}
            }
        }
        const ownerId = comment.evaluation!.userId!;

        if (!acc[comment.categoryId].users.hasOwnProperty(ownerId)) {
            acc[comment.categoryId].users[ownerId] = {
                id: ownerId,
                comments: []
            }
        }

        acc[comment.categoryId].users[ownerId].comments = [...acc[comment.categoryId].users[ownerId].comments, comment];

        return acc;
    }, {});

    return (
        <main>
            <h1>Retrospective: {retrospective.name}</h1>
            <Content>
                <p>AGENDA</p>
                <table>
                    <tbody>
                    <tr>
                        <th>Description</th>
                        <th>Duration</th>
                    </tr>
                    {retrospective.topics.map(topic => {
                        return <tr key={topic.id}>
                            <td>{topic.description}</td>
                            <td>{topic.durationInMinutes}</td>
                        </tr>
                    })}
                    </tbody>
                </table>

                <hr/>
                <p>ACTIONS LAST SPRINT</p>
                <table>
                    <tbody>
                    <tr>
                        <th>Done</th>
                        <th>Description</th>
                        <th>Responsible</th>
                    </tr>
                    {retrospective.actions.map(event => {
                        return <tr key={event.id}>
                            <td><input readOnly type='checkbox' checked={event.isCompleted}/></td>
                            <td>{event.description}</td>
                            <td>{event.responsible}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
                <hr/>
                <p>TO DISCUSS</p>
                {Object.values(commentsByCategoryAndUser).map(categoryGroup => {
                        const category = commentCategoriesById[categoryGroup.id];

                        return <div>
                            {category.name}
                            <CommentSection>
                                {Object.values(categoryGroup.users).map(user => <CommentGroup>
                                    <b>{user.id}</b>
                                    <div>
                                        {user.comments.map(c => <CommentRow><Icon
                                            style={{
                                                backgroundColor: category.iconColor,
                                                marginRight: '5px'
                                            }}>{category.iconLabel}</Icon> {c.body}
                                        </CommentRow>)}
                                    </div>
                                </CommentGroup>)}
                            </CommentSection>
                        </div>
                    }
                )}
            </Content>
        </main>
    );
}

export default withRouter(connector(Retrospective));
