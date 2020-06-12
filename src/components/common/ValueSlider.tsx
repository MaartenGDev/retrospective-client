import React, {FC} from 'react';
import styled from "styled-components";

const Slider = styled.input`
    -webkit-appearance: none;
    width: 100%;
    border-radius: 10px;
    height: 20px;
    background-color: ${props => props.color};
    
    &:hover {
      opacity: 1;
    }
    
    &::-webkit-slider-thumb{
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        cursor: pointer;
        background: white;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        border-radius: 100%;
    }
    
    
    .slider::-moz-range-thumb {
        width: 25px; /* Set a specific slider handle width */
        height: 25px; /* Slider handle height */
        cursor: pointer; /* Cursor on hover */
        background: white;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        border-radius: 100%;
    }
`;


interface IProps {
    color: string;
    value: number;
    onChange: (value: number) => void
}

export const ValueSlider: FC<IProps> = ({color, value, onChange}) => {
    return (<Slider color={color} type="range" min="1" max="100" value={value} onChange={e => onChange(parseInt(e.target.value))}/>);
}
