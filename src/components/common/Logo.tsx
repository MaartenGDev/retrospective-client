import React from 'react';
import styled from 'styled-components'
import {Link} from "react-router-dom";

const NavLink = styled(Link)`
  padding: 20px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
`;

const LogoLink = styled(NavLink)`
  padding-left: 10px;
`

const LogoSection = styled.div`
display: flex;
align-items: center;
`

const LogoText = styled(Link)`
  background-color: white;
  color: #4A92E6;
  font-weight: bold;
  height: 30px;
  width: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`

function Logo() {
    return (
        <LogoSection>
            <LogoText to='/'>R</LogoText>
            <LogoLink to="/">Retro</LogoLink>
        </LogoSection>
    );
}

export default Logo;
