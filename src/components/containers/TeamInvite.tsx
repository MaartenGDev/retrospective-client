import React, {FC, useEffect} from 'react';
import styled from 'styled-components'
import backgroundPath from '../../assets/background.jpg'
import loginSvg from '../../assets/login.svg'
import Logo from "../common/Logo";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {RootState} from "../../store/rootReducer";
import * as teamActions from "../../store/team.actions";
import {connect, ConnectedProps} from "react-redux";
import Config from "../../Config";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const OnboardingImage = styled.div`
  position: relative;
  width: 30%;
`

const Overlay = styled.div`
  position: absolute;
  height: calc(100% - 40px); 
  width: calc(100% - 120px);
  background-color: rgba(0, 0,0,0.85);
  color: white;
  padding: 20px 60px;
`

const OnboardingSection = styled.div`
margin-top: 10%;
`

const OnboardingForm = styled.div`
  background-color: white;
    flex-grow: 1;
`

const Branding = styled(Logo)`
  align-self: flex-start;
`

const ActionButton = styled.a`
display: inline-block;
  text-decoration: none;
  background-color: white;
  border-radius: 10px;
  font-weight: bold;
  color: black;
  border: none;
  padding: 10px 20px;
  margin-top: 40px;
`

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

const LoginBox = styled.a`
  margin-top: 30px;
  border: 1px solid #dad7d7;
  border-radius: 3px;
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: black;
`

const LoginLogo = styled.img`
  height: 30px;
  width: 30px;
`

const LoginLabel = styled.span`
  margin-left: 10px;
`

const mapState = (state: RootState) => ({
    team: state.teamReducer.teamForInviteCode,
});

const mapDispatch = {
    loadTeam: (inviteCode: string) => teamActions.FindByInviteCode(inviteCode)
}

const connector = connect(mapState, mapDispatch)
type IProps = ConnectedProps<typeof connector> & RouteComponentProps<{ code: string }>;

const TeamInvite: FC<IProps> = ({team, loadTeam, match}) => {

    useEffect(() => {
        loadTeam(match.params.code);
    }, [match.params.code]);

    const loginUrl = Config.TEAM_INVITE_URL(team?.inviteCode!);

    return (
        <Wrapper>
            <OnboardingImage style={{backgroundImage: `url('${backgroundPath}')`}}>
                <Overlay>
                    <Branding />

                    <OnboardingSection>
                        <h1>Let's get you setup for the Retrospective!</h1>

                        <ActionButton href={loginUrl}>Login with Microsoft</ActionButton>
                    </OnboardingSection>
                </Overlay>
            </OnboardingImage>
            <OnboardingForm>
                <LoginCard>
                    <LoginHeader>You have been invited to {team?.name}</LoginHeader>
                    <LoginSubHeader>Login with your favorite account to get started.</LoginSubHeader>

                    <LoginBox href={loginUrl}>
                        <LoginLogo src={loginSvg} /><LoginLabel>Login with Microsoft</LoginLabel>
                    </LoginBox>
                </LoginCard>
            </OnboardingForm>
        </Wrapper>
    );
}

export default withRouter(connector(TeamInvite));
