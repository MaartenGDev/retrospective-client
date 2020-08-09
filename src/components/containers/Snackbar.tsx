import React, {FC, useEffect} from 'react';
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import styled from "styled-components";
import * as notificationActions from "../../store/notification.actions";

const mapState = (state: RootState) => ({
    showNotification: state.notificationReducer.showNotification,
    message: state.notificationReducer.message,
});

const mapDispatch = (dispatch: any) => ({
    dismiss: () => dispatch(new notificationActions.Dismiss()),
})

const Toast = styled.div`
  color: #fff;
  font-weight: 500;
  background-color: #f44336;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20px;
  opacity: 0;
  margin: auto;
  padding: 20px;
  min-width: 200px;
  max-width: 300px;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 5px;
`

const connector = connect(mapState, mapDispatch)
type IProps = ConnectedProps<typeof connector>;

const Snackbar: FC<IProps> = ({showNotification, message, dismiss}) => {
    useEffect(() => {
        if (showNotification) {
            setTimeout(() => {
                dismiss();
            }, 5000)
        }
    }, [showNotification, dismiss]);

    return (
        <Toast style={{opacity: showNotification ? 1 : 0}}>
            <span>{message}</span>
        </Toast>
    );
}

export default connector(Snackbar);
