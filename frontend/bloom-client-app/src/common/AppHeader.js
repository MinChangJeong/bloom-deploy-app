import React, { useEffect, useState } from 'react';
import {Link, useLocation } from 'react-router-dom';
import { Menu, Dropdown, Input, Avatar } from 'antd';
import { HomeOutlined, UserOutlined,EditOutlined, SearchOutlined, CaretDownOutlined ,GlobalOutlined } from '@ant-design/icons';
import logo from '../img/Bloom_logo.png';
import {getAvatarColor} from '../util/Colors';

import './AppHeader.css';
import { findUserByUsernameOrName } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

const {Search} = Input;

function SearchUserDropdownMenu({users}) {
  const dropdownMenu = (
    <Menu className="profile-dropdown-menu">
      {
        users.map((user) => 
          <Menu.Item key="user-info" className="dropdown-item">
            <div className="user-container">
                <Link to={`/users/${user.username}`}>
                  <Avatar 
                    className="user-avatar-circle" 
                    style={{ backgroundColor: getAvatarColor(user.name)}} 
                    src={`data:image/jpeg;base64,${user.profileImage}`}
                  >
                  </Avatar>
                </Link>
              <div className="user-username">
                <Link to={`/users/${user.username}`}>
                  {user.username}
                </Link>
              </div>  
              <div className="user.name">
                {user.name}
              </div>
            </div>            
          </Menu.Item>
        )
      }
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} >
      <a className="ant-dropdown-link">
        <CaretDownOutlined  className="nav-icon" onClick={(e) => e.preventDefault()} style={{marginTop:"12px", fontSize:"25px"}} /> 
      </a>
    </Dropdown>
  );
}

function ProfileDropdownMenu(props) {
  useEffect(() => {
    // console.log(props.currentUser);
  },[])

    const dropdownMenu = (
      <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
        <Menu.Item key="user-info" className="dropdown-item" disabled>
          <div className="user-full-name-info">
            {props.currentUser.name}
          </div>
          <div className="username-info">
            @{props.currentUser.username}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="profile" className="dropdown-item">
          <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" className="dropdown-item">
          Logout
        </Menu.Item>
      </Menu>
    );
  
    return (
      <Dropdown 
        overlay={dropdownMenu} >
        <a className="ant-dropdown-link">
           <UserOutlined className="nav-icon" onClick={(e) => e.preventDefault()} /> 
        </a>
      </Dropdown>
    );
  }

function AppHeader(props) {
    const location = useLocation();

    const handleMenuClick = ({key}) => {
        if(key === "logout") {
            props.onLogout();
        }
    };

    const [usernameOrName, setUsernameOrName] = useState('')
    const [users, setUsers] = useState([])
    const [searchCheck, setSearchCheck] = useState(false);

    useEffect(() => {
      if(localStorage.getItem(ACCESS_TOKEN) !== null) {
        findUserByUsernameOrName(usernameOrName)
          .then(response => {
            setUsers(response);
          })
          .catch(error => {
            console.log(error.message);
          })
      }
    }, [usernameOrName])

    let menuItems;
    if(props.currentUser !== null) {
        menuItems = [
            <Menu.Item>
              <Link to="/bloom">
                  <HomeOutlined  />
              </Link>
            </Menu.Item>,
            <Menu.Item>
              <Link to="/explore">
                <GlobalOutlined />
              </Link>
            </Menu.Item>,
            <Menu.Item>
              <Link to='/post/new'>
                <EditOutlined />
              </Link>
            </Menu.Item>,
            <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu 
                  currentUser={props.currentUser} 
                  handleMenuClick={handleMenuClick}
                />
            </Menu.Item>
        ];
    }
    else {
        menuItems = [
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>,
            <Menu.Item key="/signup">
              <Link to="/signup">Signup</Link>
            </Menu.Item>
        ]
    }

    let searchItems;
    searchItems = [
      <SearchUserDropdownMenu 
        users={users}
      />
    ]

    return (
      <div className="nav">
        <Link to="/bloom">
          <img
            src={logo}
            className="logo_size"
          />
        </Link>
        <Menu 
          className="search-menu"
          mode="horizontal"
        >
          <Search 
            placeholder="searh" 
            enterButton={false}
            onChange={(e) => {setUsernameOrName(e.target.value)}}
            style={{ 
              width: 200, 
              marginTop:"8px",
            }} 
          />
          {searchItems}

        </Menu>
        <Menu
          className="app-menu"
          mode="horizontal"
          selectedKeys={[location.pathname]}
            >
            {menuItems}
        </Menu>
    </div>
    );
}


export default AppHeader;