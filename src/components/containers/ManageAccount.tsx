import React, {FC, useState} from 'react';
import styled from 'styled-components'
import {RouteComponentProps, withRouter, Redirect} from "react-router-dom";
import {RootState} from "../../store/rootReducer";
import * as authenticationActions from "../../store/authentication.actions";
import {connect, ConnectedProps} from "react-redux";
import SplitPage from "../presentation/SplitPage";
import {TextInput} from "../styles/Input";
import {ButtonRow, SectionTitle} from "../styles/Common";
import {RoundedButton} from "../styles/Buttons";
import {ICredentials} from "../../models/dto/ICredentials";

const LoginCard = styled.div`
    margin: 20%;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    padding: 30px
`
const LoginHeader = styled.h3`
  margin:0;
`

const LoginSubHeader = styled.p`
  margin-top: 3px;
  color: #a1a1a1;
`

const LoginOptions = styled.div`
  margin-top: 20px;
`

const AlternativeOption = styled.span`
  color: #4A92E6;
  display: inline-block;
  margin-top: 5px;
  cursor: pointer;
`

const mapState = (state: RootState) => ({
    user: state.authenticationReducer.user,
});

const mapDispatch = {
    login: (credentials: ICredentials) => authenticationActions.Login(credentials),
}

const connector = connect(mapState, mapDispatch)
type IProps = ConnectedProps<typeof connector> & RouteComponentProps<{ code: string }>;

const ManageAccount: FC<IProps> = ({user, login, match}) => {
    const [credentials, setCredentials] = useState<ICredentials>({email: '', password: ''})
    const [isLogin, setIsLogin] = useState(true);

    if(user){
        return <Redirect to='/' />
    }

    return (
        <SplitPage>
            <LoginCard>
                <LoginHeader>Let's get you setup!</LoginHeader>
                <LoginSubHeader>Login with your favorite account to get started.</LoginSubHeader>

                <LoginOptions>
                    <SectionTitle>Email</SectionTitle>
                    <TextInput type='email' onChange={e => setCredentials({...credentials, email: e.target.value})}/>
                    <SectionTitle>Password</SectionTitle>
                    <TextInput type='password' onChange={e => setCredentials({...credentials, password: e.target.value})} />
                </LoginOptions>

                <AlternativeOption onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account yet?" : 'Already have an account?'}
                </AlternativeOption>

                <ButtonRow>
                    <RoundedButton onClick={() => login(credentials)}>{isLogin ? 'Login' : 'Register'}</RoundedButton>
                </ButtonRow>
            </LoginCard>
        </SplitPage>
    );
}

export default withRouter(connector(ManageAccount));
