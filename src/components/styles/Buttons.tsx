import styled from "styled-components";
import {Link} from "react-router-dom";

export const RoundedButton = styled.button`
  background-color: ${props => props.color || '#4A92E6'};
  color: white;
  border-radius: 25px;
  padding: 8px 15px;
  border: none;
  font-size: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
`

export const RoundedButtonLink = styled(Link)`
  background-color: ${props => props.color || '#4A92E6'};
  color: white;
  border-radius: 25px;
  padding: 8px 15px;
  border: none;
  text-decoration: none;
  display: flex;
  align-items: center;
`

export const TextButton = styled.button`
  color: ${props => props.color || '#4A92E6'};
  border: none;
  background: none;
  display: inline-block;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  
  &:disabled{
    color: #c9c9cb;
  }
`