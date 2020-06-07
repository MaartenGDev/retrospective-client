import React, {FC} from 'react';
import styled from "styled-components";

const Bar = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  border-radius: 10px;
  
  div:first-of-type {
    border-radius: 5px 0 0 5px;
  }
  div:last-of-type {
      border-radius: 0 5px 5px 0;
  }
`;

const Section = styled.div`
  position: relative;
  color: white;
  padding: 10px;
`;

const SlidingHandle = styled.span`
 position: absolute;
 right: -5px;
 top: 5px;
 height: calc(100% - 10px);
 width: 10px;
 background-color: white;
 border-radius: 5px;
 z-index: 1;
 cursor: grab;
 box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

interface IProps {
    categories: { name: string, value: number, color: string }[]
}

export const CategorySlider: FC<IProps> = ({categories}) => {
    return (<Bar>
        {categories.map((category, index) => {
            const showHandle = index !== (categories.length - 1);

            return (<Section style={{width: `${category.value}%`, backgroundColor: category.color}}>
                <span>Meetings</span> {showHandle ? <SlidingHandle /> : null}
            </Section>);
        })}
    </Bar>);
}