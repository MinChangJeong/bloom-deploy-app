import React, { useEffect, useState } from 'react';
import { Route,  useHistory, useParams } from 'react-router-dom';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import Login from '../user/login/Login';
import NewPost from '../post/NewPost';
import Signup from '../user/signup/Signup';
import PostList from '../post/PostList';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
// import AppHeader from '../common/Header';

import Intro from '../common/Intro';

import 'antd/dist/antd.css';
import LoadingIndicator from '../common/LoadingIndicator';
import {Layout ,Button, notification } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import PrivateRoute from '../common/PrevateRoute';
import EditProfile from '../user/profile/EditProfile';

import "./App.css"

function App() {    
    let history = useHistory();

    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    notification.config({
        placement: 'topRight',
        top: 70,
        duration: 3,
    }); 

    useEffect(() => {
      if(localStorage.getItem(ACCESS_TOKEN) !== null) {
        loadCurrentUser();
      }
      else {
        history.push("/login");
      }
    },[])

    useEffect(() => {
      console.log(currentUser)
    }, [currentUser])

    const loadCurrentUser = () => {
        setIsLoading(true);
        
        getCurrentUser() 
            .then(response => {
                setCurrentUser(response);
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
            });
    }

    const handleLogout = (redirectTo="/", notificationType="success", description="You're successfully logged out.") => {
        localStorage.removeItem(ACCESS_TOKEN);
        
        setCurrentUser(null);
        setIsAuthenticated(false);

        notification[notificationType]({
          message: 'Bloom',
          description: description,
        });
        window.location.replace(redirectTo);
    }  
    if(isLoading) {
      return <LoadingIndicator />
    }

    return (  
      <div className="app-container">
          <AppHeader 
            isAuthenticated={isAuthenticated}
            currentUser={currentUser} 
            onLogout={handleLogout} 
          />
          <Route 
            exact path="/"
            component={Intro}
          />
          {/* /bloom : followed User post */}
          <Route 
            path="/bloom" 
            render = {(props) => 
              <PostList 
                {...props}
                currentUser={currentUser} 
                onLogout={handleLogout}
                type={"FOLLOWING_USER_POST"}
              />}
          />
          {/* /explore : all post */}
          <Route 
            path="/explore" 
            render = {(props) => 
              <PostList 
                {...props}
                currentUser={currentUser} 
                onLogout={handleLogout}
              />}
          />
          <Route 
            path="/login" component={Login}
          />
          <Route 
            path="/signup" component={Signup} 
          />
          <Route 
            path="/users/:username" 
            render ={(props) => 
              <Profile 
                {...props}
                isAuthenticated={isAuthenticated} 
                currentUser={currentUser} 
              />}
          />
          <Route 
            path="/accounts/edit"
            render = {(props) => 
              <EditProfile
                {...props}
                isAuthenticated={isAuthenticated} 
                currentUser={currentUser} 
               />
            }
          />
          <Route  
            path="/post/new" 
            render = {(props) => 
              <NewPost 
                {...props}
                currentUser = {currentUser}
              />
            }
          />
      </div>
    );
}

export default App;