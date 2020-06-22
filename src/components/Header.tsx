import React from 'react';
import styled from 'styled-components'
import {Link} from "react-router-dom";
import {Container} from "./Styling/Common";

const Wrapper = styled.header`
  color: white;
  background-color: #3B4558
`;

const NavSection = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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

const Logo = styled(Link)`
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

function Header() {
    return (
        <Wrapper>
            <NavSection>
                <LogoSection>
                    <Logo to='/'>R</Logo>
                    <LogoLink to="/">Retro</LogoLink>
                </LogoSection>
                <div className='flex'>
                    <NavLink to="/retrospectives">Retrospectives</NavLink>
                    <NavLink to="/teams">Teams</NavLink>
                </div>
            </NavSection>
        </Wrapper>
    );
}

export default Header;
