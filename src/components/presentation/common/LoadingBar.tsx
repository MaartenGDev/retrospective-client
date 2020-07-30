import React, {FC, useState} from 'react';
import styled from "styled-components";

const LoadingSection = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
`

const LoadBar = styled.div`
    background-color: #4AE6AA;
    height: 4px;
`;

const SavedLabel = styled.span`
  color: #4AE6AA;
  top: 10px;
  right: 10px;
  position: absolute;
  font-weight: bold;
  transition: 100ms linear opacity;
`

interface IProps {
    isLoading: boolean;
    loadingDuration: number;
}

const transition = (isIncreasing: boolean, duration: number) => isIncreasing ? `${duration}ms linear width` : 'none';

const fullWidthPercentage = 100;

export const LoadingBar: FC<IProps> = ({isLoading, loadingDuration}) => {
    const [loadingPercentage, setPercentage] = useState(0);
    const [showSaveMessage, setShowSaveMessage] = useState(false);

    if (isLoading && loadingPercentage !== fullWidthPercentage) {
        setPercentage(fullWidthPercentage);

        setTimeout(() => {
            setShowSaveMessage(true);
        }, loadingDuration - loadingDuration / 3);

        setTimeout(() => {
            setPercentage(0);
            setShowSaveMessage(false);
        }, loadingDuration)
    }


    return (<LoadingSection>
        <div style={{position: 'relative'}}>
            <LoadBar style={{
                width: `${loadingPercentage}%`,
                transition: transition(loadingPercentage > 0, loadingDuration)
            }}/>
            {showSaveMessage && <SavedLabel>SAVED!</SavedLabel>}
        </div>
    </LoadingSection>);
}
