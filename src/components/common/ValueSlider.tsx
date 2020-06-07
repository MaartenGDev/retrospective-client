import React, {FC} from 'react';
import styled from "styled-components";

const Slider = styled.div`
  width: 100%;
  border-radius: 10px;
  height: 20px;
  position: relative;
`;

const Handle = styled.span`
  position: absolute;
  background-color: white;
  height: 100%;
  padding: 5px;
  top: calc((50% + -5px) * -1);
  border-radius: 100%;
  z-index: 1;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

interface IProps {
    color: string;
    value: number;
}

export const ValueSlider: FC<IProps> = ({color, value}) => {
    return (<Slider style={{backgroundColor: color}}>
        <Handle style={{marginLeft: `${value}%`}}>{value}</Handle>
    </Slider>);
}