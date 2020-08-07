import React, {FC} from 'react';
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";
import {InputDescription, InputLabel} from "../styles/Input";
import {Container, Content} from "../styles/Common";

const mapState = (state: RootState) => ({
    user: state.authenticationReducer.user,
});

const connector = connect(mapState)
type IProps = ConnectedProps<typeof connector>;

const Account: FC<IProps> = ({user}) => {
    return (
        <Container>
            <h3>My Account</h3>
            <Content>
                <InputLabel isFirstLabel={true}>NAME</InputLabel>
                <InputDescription>{user?.fullName}</InputDescription>

                <InputLabel>EMAIL</InputLabel>
                <InputDescription>{user?.email}</InputDescription>
            </Content>
        </Container>
    );
}

export default connector(Account);
