import React, {FC} from 'react';
import {RootState} from "../../store/rootReducer";
import * as authenticationActions from "../../store/authentication.actions";
import {connect, ConnectedProps} from "react-redux";
import {Container} from "../styles/Common";
import Config from "../../Config";

const mapState = (state: RootState) => ({
    user: state.authenticationReducer.user,
});

const mapDispatch = {
    logout: authenticationActions.Logout,
}

const connector = connect(mapState, mapDispatch)
type IProps = ConnectedProps<typeof connector>;

const Logout: FC<IProps> = ({user, logout}) => {

    if (user) {
        logout();
    }

    if (!user) {
        window.location.href = Config.LOGIN_URL;
    }

    return (
        <Container>
            <h3>Logging you out..</h3>
        </Container>
    );
}

export default connector(Logout);
