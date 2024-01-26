import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEdit, faList, faIdCard, faSearch, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const NavigationBar = () => {
  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <NavLink to="/">
            <FontAwesomeIcon icon={faHome} />
            <NavText className="NavText">Home</NavText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/enter-data">
            <FontAwesomeIcon icon={faEdit} />
            <NavText className="NavText">Enter Data</NavText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/student-list">
            <FontAwesomeIcon icon={faList} />
            <NavText className="NavText">Student List</NavText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/student-card">
            <FontAwesomeIcon icon={faIdCard} />
            <NavText className="NavText">Student Card</NavText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/search">
            <FontAwesomeIcon icon={faSearch} />
            <NavText className="NavText">Search</NavText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="delete-by-ID">
            <FontAwesomeIcon icon={faDeleteLeft} />
            <NavText className="NavText">Delete By ID</NavText>
          </NavLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const NavText = styled.span`
  @media (max-width: 768px) {
    display: none;
    padding: 50px;
    margin: 5px;
  }
`;

export default NavigationBar;
