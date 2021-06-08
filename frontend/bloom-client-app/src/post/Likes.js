import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import {addLike, cancelLike} from '../util/APIUtils';
import "./Like.css"

function Likes({postId, pushedLike, totalLikes}) {
    const [tLike, setTotalLikes] = useState(totalLikes);
    const [pLike, setPushedLike] = useState(pushedLike);

    const handleSaveLike = (e) => {
        e.preventDefault();

        const likeRequest ={
            postId : postId,
            checkedLike : true
        }
        console.log(likeRequest)

        addLike(likeRequest)
            .then(response => {
                console.log(response)
                setTotalLikes(response.totalLikes)
                setPushedLike(response.pushedLike)
                notification.success({
                    message : "Bloom",
                    description : "Successfully registered likes"
                })
            })
            .catch(error => {
                notification.error({
                    message : "Bloom",
                    description : error.message || "Failed registered likes..."
                })
            })
    }


    const handleCancelLike = (e) => {
        e.preventDefault();

        const likeRequest ={
            postId : postId,
            checkedLike : false
        }

        cancelLike(likeRequest)
            .then(response => {
                setTotalLikes(response.totalLikes)
                setPushedLike(response.pushedLike)
                notification.success({
                    message : "Bloom",
                    description : "Successfully canceled likes"
                })
            })
            .catch(error => {
                notification.error({
                    message : "Bloom",
                    description : error.message || "Failed registered likes..."
                })
            })
    }

    return (
        <div>
            {
                pLike ? (
                    // like cancel
                    <div className="like-container">
                        <form 
                            className="like-form"
                            type="submit" 
                            onClick={handleCancelLike}
                        >
                            <HeartFilled
                                style={{
                                    color: "#D5C6E3"
                                }}
                            />
                        </form>
                        <div>{tLike} likes.</div>
                    </div>
                ) : (
                    //like save
                    <div className="like-container">
                        <form 
                            className="like-form"
                            type="submit"
                            onClick={handleSaveLike}
                        >
                            <HeartOutlined 
                                style={{
                                    color: "#D5C6E3"
                                }}  />
                        </form>
                        <div className="like-sentences">
                            {tLike} likes.
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Likes;