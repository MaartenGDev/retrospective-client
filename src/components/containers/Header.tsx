import React, {FC} from 'react';
import styled from 'styled-components'
import {Link} from "react-router-dom";
import {Container} from "../styles/Common";
import Logo from "../presentation/common/Logo";
import {RootState} from "../../store/rootReducer";
import {connect, ConnectedProps} from "react-redux";

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

const NavItem = styled.span`
  padding: 20px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  position: relative;
  
  &:hover :first-child{
    display: inline-block;
  } 
`

const DropdownMenu = styled.ul`
  display: none;
  position: absolute;
  padding-left: 0;
  margin-left: 20px;
  background: white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  left: 0;
  top: 30px;
  z-index: 1;
`

const DropdownItem = styled.li`
  padding: 10px 20px;
`

const DropdownLink = styled(Link)`
  text-decoration: none;
  color: #3B4558;
`

const mapState = (state: RootState) => ({
    user: state.authenticationReducer.user
});


const connector = connect(mapState)
type Props = ConnectedProps<typeof connector>;

const Header: FC<Props> = ({user}) => {
    return (
        <Wrapper>
            <NavSection>
                <Logo />
                <div className='flex'>
                    <NavLink to="/retrospectives">Retrospectives</NavLink>
                    <NavLink to="/insights">Insights</NavLink>
                    <NavLink to="/teams">Teams</NavLink>
                    {!user && <NavLink to="/account/login">Login</NavLink>}
                    {user && (
                        <NavItem>{user.fullName}
                            <DropdownMenu>
                                <DropdownItem><DropdownLink to='/account'>My Account</DropdownLink></DropdownItem>
                                <DropdownItem><DropdownLink to='/account/logout'>Logout</DropdownLink></DropdownItem>
                            </DropdownMenu>

                        </NavItem>
                    )}
                </div>
            </NavSection>
        </Wrapper>
    );
}

export default connector(Header);
