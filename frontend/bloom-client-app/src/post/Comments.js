import React, {useState, useEffect } from 'react';
import { Avatar, Input, Button, notification, Form } from 'antd';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import {saveComment, deleteComment, updateIsDeletedComment, getCurrentUser} from '../util/APIUtils';
import HashMap from 'hashmap';
import ArrayList from "arraylist";
import "./Comment.css"

import { DeleteOutlined, MessageOutlined } from '@ant-design/icons';

const FormItem = Form.Item;

function ReplyComments({postId,p_comment_id, sComment, currentUser}) {
    const [commentContents, setCommentContents] = useState({
        value : "",
        validateStatus : "false"
    });
    const [comments, setComments] = useState(sComment);

    const handleCommentChange = (e) => {
        setCommentContents({
            ...commentContents,
            value : e.target.value,
            ...isFormValid()
        });
        
    }

    const isFormValid = () => {
        if(commentContents.value.length<3) {
            return {
                validateStatus : "false"
            }
        }
        else {
            return {
                validateStatus : ""
            }
        }
    }

    const recommentSubmit = (e) => {
        e.preventDefault()

        const commentRequest = {
            postId : postId,
            p_comment_id : p_comment_id,
            text : commentContents.value,
        }

        saveComment(commentRequest)
            .then(response => {
                setComments(comments.concat(response));
                notification.success({
                    message : "Bloom",
                    description : "Successfully registered comments"
                })
            })
            .catch(err => {
                notification.error({
                    message : "Bloom",
                    description : err.message || "Failed registered comments..."
                })
            })
        setCommentContents({
            ...commentContents,
            value : "",
            validateStatus : "false"
        })
    }

    const handleDeleteComment = (e, commentId) => {
        e.preventDefault();
    
        updateIsDeletedComment(commentId) 
            .then(response => {
                for(var i = 0; i< comments.length; i++) {
                    if(comments[i].id === response.id) {
                        setComments(comments.filter(comment => comment !== comments[i])) 
                    }
                }
                notification.success({
                    message : "Bloom",
                    description : "Successfully deleted comments"
                })
            })
            .catch(error => {
                notification.error({
                    message : "Bloom",
                    description : error.message || "Failed deleted commnet..."
                })
            })
    }

    const commentView = [];

    if(comments !== null) {
        comments.forEach((comment) => {
            commentView.push(
                <Comment
                    author={comment.createdBy.username}
                    avatar={
                        <Avatar className="post-creator-avatar"
                            src={`data:image/jpeg;base64,${comment.createdBy.profileImage}`} />  
                    }
                    content={
                        <p>
                            {comment.text}
                        </p>
                    }
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().fromNow()}</span>
                        </Tooltip>
                    }
                >
                    {
                        comment.text !== "Deleted Comment" ? (
                            comment.createdBy.username === currentUser.username ? (
                                <DeleteOutlined 
                                    onClick={(e) => handleDeleteComment(e, comment.id)}
                                />
                            ) : (
                                null
                            )
                        ) : (
                            null
                        )
                    }
                    </Comment>
            )
        })
    }


    return (
        <div className="re-comment-container" id="showRecomments">
            {commentView}
            <form className="comment-form" id="comment-form">
                <input 
                    type="text"
                    onChange={(e) => handleCommentChange(e)}
                    placeholder="Please enter comments.."
                    className="input-container"
                />
                <button
                    disabled={commentContents.validateStatus}
                    onClick={recommentSubmit}
                    className="button-container"
                >
                    Add
                </button>
            </form>
        </div>
    );
}

function Comments({post}) {
    const [commentContents, setCommentContents] = useState({
        value : "",
        validateStatus : "false"
    })
    
    const [comments, setComments] = useState(post.comments);

    const [pComments, setPComments] = useState(comments.filter(comment => comment.p_comment_id === null))
    const [sComments, setSComments] = useState(comments.filter(comment => comment.p_comment_id !== null))

    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        getCurrentUser()
            .then(response => {
                setCurrentUser(response);
            })
            .catch(error => {
                console.log(error.message)
            })
    }, [])

    const handleCommentChange = (e) => {
        setCommentContents({
            ...commentContents,
            value : e.target.value,
            ...isFormValid()
        });
    }

    const isFormValid = () => {
        if(commentContents.value.length<3) {
            return {
                validateStatus : "false"
            }
        }
        else {
            return {
                validateStatus : ""
            }
        }
    }

    const commentSubmit = (e) => {
        e.preventDefault()

        const commentRequest = {
            postId : post.id,
            p_comment_id : null,
            text : commentContents.value,
        }


        saveComment(commentRequest)
            .then(response => {
                setComments(comments.concat(response));
                setPComments(pComments.concat(response))
                notification.success({
                    message : "Bloom",
                    description : "Successfully registered comments"
                })
            })
            .catch(error => {
                notification.error({
                    message : "Bloom",
                    description : "Failed registered commnet..."
                })
            })
        
        setCommentContents({
            ...commentContents,
            value : commentContents.value,
            validateStatus : "false"
        })
    }

    const handleDeleteComment = (e, comment) => {
        e.preventDefault();
    
        let commentId = comment.id;
        console.log(commentId)

        deleteComment(commentId) 
            .then(response => {
                setPComments(pComments.filter((comment) => comment.id !== commentId))
                setSComments(sComments.filter((comment) => comment.p_comment_id !== commentId))

                notification.success({
                    message : "Bloom",
                    description : "Successfully deleted comments"
                })

                // recomment가 바뀌지 않아 임시방편으로 만들어놈..
                window.location.replace(window.location.pathname)
            })
            .catch(error => {
                notification.error({
                    message : "Bloom",
                    description : error.message || "Failed deleted commnet..."
                })
            })
    }

    useEffect(() => {
        console.log(pComments)
    }, [pComments])

    useEffect(() => {
        console.log(sComments)
    }, [sComments])

    const commentView = [];

    pComments.forEach((comment) => {;

        console.log(comment)
        commentView.push(
            <Comment
                author={comment.createdBy.username}
                avatar={
                    <Avatar className="post-creator-avatar"
                        src={`data:image/jpeg;base64,${comment.createdBy.profileImage}`} />  
                }
                content={
                    <p>
                        {comment.text}
                    </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
            >
                {
                    comment.createdBy.username === currentUser.username ? (
                        <DeleteOutlined 
                            onClick={(e) => handleDeleteComment(e, comment)}
                        />
                    ) : (
                        null
                    )
                }
                <ReplyComments 
                    postId={post.id} 
                    p_comment_id={comment.id} 
                    sComment={sComments.filter(sComment => sComment.p_comment_id === comment.id)} 
                    currentUser={currentUser}
                /> 
            </Comment>
        )
    })

    return (
        <div className="comment-container">
            <form className="comment-form">
                <input 
                    type="text"
                    onChange={(e) => handleCommentChange(e)}
                    placeholder="Please enter coments.."
                    className="input-container"
                />
                <button
                    disabled={commentContents.validateStatus}
                    onClick={commentSubmit}
                    className="button-container"
                >
                    Add
                </button>
            </form>
            {commentView}
        </div>
        
    );
}

export default Comments;
