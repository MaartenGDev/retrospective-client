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
                    <NavLink to="/teams">Teams</NavLink>
                    <NavLink to="/insights">Insights</NavLink>
                    {!user && <NavLink to="/account/login">Login</NavLink>}
                    {user && <NavItem>{user.fullName}</NavItem>}
                </div>
            </NavSection>
        </Wrapper>
    );
}

export default connector(Header);
