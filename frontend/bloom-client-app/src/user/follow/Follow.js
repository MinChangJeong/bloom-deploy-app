import React, { useEffect, useState } from 'react';
import { checkingFollow, followUser, unfollowUser } from '../../util/APIUtils';
import { UserDeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import {Button, notification} from "antd";

function Follow({user, currentUser, totalFollower, totalFollowing}) {  
    const [followState, setFollowState] = useState(false);

    const [tFollower, setTotalFollower] = useState(totalFollower);
    const [tFollowing, setTotalFolwing] = useState(totalFollowing);

    useEffect(() => {
        checkingFollow(user.username)
            .then(response => {
                if(response.result) {
                    console.log("followed")
                    setFollowState(true);
                }
                else {
                    console.log("not followed")
                    setFollowState(false);
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    }, [])

    const handleFollowcChanged = () => {
        setFollowState(!followState);

        if(followState) {
            unfollowUser(user.username)
                .then(response => {
                    setTotalFollower(response.totalFollowers)
                    setTotalFolwing(response.totalFollowings)
                    notification.success({
                        message: "Bloom",
                        description: "Successfully unfollowed"
                    })
                    console.log("success")
                })
                .catch(error => {
                    notification.error({
                        message: "Bloom",
                        description: error.message
                    })
                    
                })
        }
        else {
            followUser(user.username)
                .then(response => {
                    setTotalFollower(response.totalFollowers)
                    setTotalFolwing(response.totalFollowings)
                    notification.success({
                        message: "Bloom",
                        description: "Successfully followed"
                    })
                    console.log("success")
                })
                .catch(error => {
                    notification.error({
                        message: "Bloom",
                        description: error.message
                    })
                })
        }
    }

    return (
        <div>
            {
                followState ? (
                    // follow 되어있음을표시
                    <div className="followed-container">
                        <Button
                            icon={
                                <UserDeleteOutlined className="nav-icon"/>
                            }
                            onClick={handleFollowcChanged}
                        >
                        </Button>
                        <span>Follower : {tFollower}</span>
                        <span>  /  </span>
                        <span>Following : {tFollowing}</span>
                    </div>
                ) : (
                    // follow를 할것임을 표시
                    <div className="not-followed-container">
                        <Button
                            icon={
                                <UserAddOutlined className="nav-icon"/>
                            }
                            onClick={handleFollowcChanged}
                        >
                        </Button>
                        <span>Follower : {tFollower}</span>
                        <span>  /  </span>
                        <span>Following : {tFollowing}</span>
                    </div>
                )
            }
        </div>
    );
}

export default Follow;