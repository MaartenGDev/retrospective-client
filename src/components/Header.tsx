import React from 'react';
import styled from 'styled-components'
import {Link} from "react-router-dom";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: #3B4558
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
            <NavLink to="/">Retro</NavLink>
            <div className='flex'>
                <NavLink to="/retrospectives">Retrospectives</NavLink>
                <NavLink to="/overview">Overview</NavLink>
            </div>
        </Wrapper>
    );
}

export default Header;
