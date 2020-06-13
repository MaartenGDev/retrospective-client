import styled from "styled-components";
import {Link} from "react-router-dom";

export const RoundedButton = styled.button`
  background-color: #4A92E6;
  color: white;
  border-radius: 25px;
  padding: 10px 20px;
  border: none;
  display: inline-block;
`

export const RoundedButtonLink = styled(Link)`
  background-color: #4A92E6;
  color: white;
  border-radius: 25px;
  padding: 10px 20px;
  border: none;
  display: inline-block;
  text-decoration: none;
`