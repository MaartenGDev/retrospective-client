import React, {FC} from 'react';
import styled from 'styled-components'
import backgroundPath from '../../assets/background.jpg';
import Logo from "../presentation/common/Logo";

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

const SplitPage: FC = ({children}) => {
    return (
        <Wrapper>
            <OnboardingImage style={{backgroundImage: `url('${backgroundPath}')`}}>
                <Overlay>
                    <Branding/>

                    <OnboardingSection>
                        <h1>Let's get you setup for the Retrospective!</h1>
                    </OnboardingSection>
                </Overlay>
            </OnboardingImage>
            <OnboardingForm>
                {children}
            </OnboardingForm>
        </Wrapper>
    );
}

export default SplitPage;
