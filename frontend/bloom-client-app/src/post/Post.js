
import React, {useState, useEffect, createElement } from 'react';
import { Avatar, Input, Button, notification, Form } from 'antd';
import { Link, Route, useHistory } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import { DeleteOutlined,MessageOutlined,RightCircleOutlined,LeftCircleOutlined  } from '@ant-design/icons';

import './Post.css'
import Comments from './Comments';
import Likes from "./Likes";
import Profile from "../user/profile/Profile";
import {deletePost, getCurrentUser} from "../util/APIUtils";
const FormItem = Form.Item;

function Post({post}) {
    // delte 후 response로 post들의 정보를 받고 state로 관리해야할것 같음..

    let history = useHistory();
    const profileURL ="/users/" + post.createdBy.username;

    const [currentUser, setCurrentUser] = useState([]);
    const [setting, setSetting] = useState(false);
    const [showComment, setShowComment] = useState(false);


    useEffect(() => {
        console.log(post)
        getCurrentUser()
            .then(response => {
                setCurrentUser(response)
            })
            .catch(error => {
                console.log(error.message)
            })
    }, [])


    useEffect(() => {
        if(currentUser.username == post.createdBy.username) {
            setSetting(true)
        }
    }, [currentUser])

    const deltePostSubmit = () => {    
        deletePost(post.id)
            .then(response => {
                notification.success({
                    message : "Bloom",
                    description: "Successfully deleted post"
                })
                window.location.replace("/");
            }) 
            .catch(error => {
                notification.error({
                    message: "Bloom",
                    description: error.message
                })
            })
    }

    const [postIdx, setPostIdx] = useState(0);

    return (
        <div className="post-content">
            <div className="post-header">
                <div className="post-creator-info">
                    <div className="post-creator-profile-image">
                        <Link className="creator-link">
                            <Avatar className="post-creator-avatar"
                                src={`data:image/jpeg;base64,${post.createdBy.profileImage}`}>  
                            </Avatar>
                        </Link>
                        <div className="post-creator-detail">
                            <span className="post-creator-username">
                                <Link to={profileURL}>
                                    {post.createdBy.username}
                                </Link>
                            </span>
                        </div>
                    </div>

                    <div className="post-setting-container">
                        {
                            setting ? (
                                <div className="deleteButton" onClick={deltePostSubmit}>
                                    <DeleteOutlined style={{fontSize:"20px"}} />
                                </div>
                            ) : (
                                null
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="post-body">
                <div className="post-image-container">
                    {
                        post.images.length >1 ? (
                            <div className="image-list">                          
                                <img src={`data:image/jpeg;base64,${post.images[postIdx].data}`} className= "post-image" />
                                {
                                    postIdx !== 0 ? (
                                        <LeftCircleOutlined 
                                            className="left-btn" 
                                            style={{
                                                fontSize:"30px", 
                                                marginLeft:"10px",
                                                color: "#d5c6e3"
                                            }}
                                            onClick={() => setPostIdx(postIdx-1)}    
                                        />
                                    ) : (
                                        null
                                    )
                                }
                                {
                                    postIdx !== post.images.length-1 ? (
                                        <RightCircleOutlined 
                                            className="right-btn" 
                                            style={{
                                                fontSize:"30px", 
                                                marginRight:"10px",
                                                color: "#d5c6e3"
                                            }}
                                            onClick={() => setPostIdx(postIdx+1)}    
                                        />  
                                    ) : null
                                }
                            </div>
                        ) : (
                            <img src={`data:image/jpeg;base64,${post.images[postIdx].data}`} className= "post-image"/>
                        )
                    }
                </div>
                <div className="post-text">
                    {post.content}
                </div>
                <div className="post-like-container">
                    <Likes postId={post.id} pushedLike={post.pushedLike} totalLikes={post.totalLikes} />
                </div>
                <div className="show-comment-btn">
                    <MessageOutlined
                        style={{
                            cursor: "pointer",
                            marginLeft: "10px",
                            
                        }}
                        onClick={(e) => setShowComment(!showComment)}
                    />
                    </div>
                <div className="post-comment-container">
                    {
                        showComment ? (
                            <Comments post={post} />
                        ) : (
                            null
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Post;
