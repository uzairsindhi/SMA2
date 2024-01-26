//header component
import React from 'react'
import {schoolName } from './constants';
import './Header.css';
function Header() {
  return (
    <div id='header' className='header'>
      <p align='center'><strong>{schoolName}</strong></p>

      
      
    </div>
  )
}

export default Header;
