import React, {FC} from 'react';
import styled from 'styled-components'
import UpwardArrow from "../icons/UpwardArrow";
import DownwardArrow from "../icons/DownwardArrow";

const PercentageLabel = styled.span.attrs((props: { isPositive: boolean }) => ({
    isPositive: props.isPositive || false,
}))`
  color: ${props => props.isPositive ? '#5CA845' : '#A8456F'};
  fill: currentColor;
  display: flex;
  align-items: center;
  padding-right: 5px;
`


const ChangeSection = styled.span`
  display: flex;
  align-items: center;
  margin-left: 5px;
  font-size: 15px;
  
  svg {
    height: 15px;
    width: 15px;
  }
`

interface IProps {
    increaseIsPositive: boolean;
    changePercentage: number;
}

const ChangeLabel: FC<IProps> = ({increaseIsPositive, changePercentage}) => {
    return (
        <ChangeSection>(<PercentageLabel
            isPositive={(increaseIsPositive && changePercentage >= 0) || (!increaseIsPositive && changePercentage <= 0)}>
            {changePercentage  >= 0 ? <UpwardArrow/> :
                <DownwardArrow/>} {changePercentage}%
        </PercentageLabel>)</ChangeSection>
    );
}

export default ChangeLabel;
