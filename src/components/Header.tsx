import React from 'react';
import styled from 'styled-components'
import {Link} from "react-router-dom";
import {Container} from "./shared/Common";
import Logo from "./common/Logo";

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

function Header() {
    return (
        <Wrapper>
            <NavSection>
                <Logo />
                <div className='flex'>
                    <NavLink to="/retrospectives">Retrospectives</NavLink>
                    <NavLink to="/teams">Teams</NavLink>
                    <NavLink to="/insights">Insights</NavLink>
                </div>
            </NavSection>
        </Wrapper>
    );
}

export default Header;
