import React, {FC} from "react";
import styled from "styled-components";
import DownwardLeftArrow from "./common/icons/DownwardLeftArrow";
import UpwardLeftArrow from "./common/icons/UpwardLeftArrow";
import {IMetric} from "../../models/IMetric";

interface IProps {
    metric: IMetric;
}

const Card = styled.div`
  border-radius: 3px;
  border: 1px solid #C6C6C6;
  background-color: white;
`

const CardBody = styled.div`
  padding: 10px;
`

const CardTitle = styled.h3`
  color: #494D49;
  margin: 0;
  font-weight: 600;
`
const CardValue = styled.h1`
  color: ${props => props.color || '#4A92E6'} ;
  font-weight: normal;
  margin: 0;
`

const CardFooter = styled.div`
  border-top: 1px solid #C6C6C6;
  padding: 5px 10px;
  color: #A4A7A4;
  display: flex;
  align-items: center;
`

const ChartSection = styled.span.attrs((props: {isPositive: boolean}) => ({
    isPositive: props.isPositive || false,
}))`
  color: ${props => props.isPositive ? '#5CA845' : '#A8456F'};
  fill: currentColor;
  display: flex;
  align-items: center;
  padding-right: 5px;
`



const Tile: FC<IProps> = ({metric}) => {
    const {name, color, formattedValue, increaseIsPositive, changePercentage} = metric;
    return (
        <Card>
            <CardBody>
                <CardTitle>{name}</CardTitle>
                <CardValue color={color}>{formattedValue}</CardValue>
            </CardBody>
            <CardFooter>
                    <ChartSection isPositive={(increaseIsPositive && changePercentage >= 0) || (!increaseIsPositive && changePercentage <= 0)}>
                        {changePercentage >= 0 ? <UpwardLeftArrow /> : <DownwardLeftArrow />} {changePercentage}%
                    </ChartSection>
                    <span>Since last sprint</span>
            </CardFooter>
        </Card>
    );
}

export default Tile;
