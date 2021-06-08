import { API_BASE_URL, POST_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            console.log(json)
            return json;
        })
    );



};

export function saveComment(commentRequest) {
    return request({
        url : API_BASE_URL + "/posts/comments",
        method : "POST",
        body : JSON.stringify(commentRequest)
    })   
}

export function deleteComment(commentId) {
    return request({
        url : API_BASE_URL + "/posts/deletecomments?commentId=" + commentId,
        method : "DELETE",
    })
}

export function updateIsDeletedComment(commentId) {
    return request({
        url : API_BASE_URL + "/posts/updateIsDeletedcomments?commentId=" + commentId,
        method : "GET",
    })
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function findUserByUsernameOrName(usernameOrName) {
    return request({
        url: API_BASE_URL + "/users/findUsernameOrName?usernameOrName=" + usernameOrName,
        method: 'GET'
    })
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function checkEditUsernameAvailability(username) {
    return request({
        url : API_BASE_URL + "/user/checkEditUsernameAvailability?username=" +username,
        method: 'GET'
    });
}

export function checkEditEmailAvailability(email) {
    return request({
        url : API_BASE_URL + "/user/checkEditEmailAvailability?email=" +email,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getAllPosts(page, size) {
    page = page || 0;
    size = size || POST_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/posts/explore?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getFollowedUserPosts(page, size) {
    page = page || 0;
    size = size || POST_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/posts?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserCreatedPosts(username, page, size) {
    page = page || 0;
    size = size || POST_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/posts?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function addLike(likeRequest) {
    return request({
        url: API_BASE_URL + "/posts/likes",
        method: 'POST',
        body: JSON.stringify(likeRequest)
    })
}

export function cancelLike(likeRequest) {
    return request({
        url: API_BASE_URL + "/posts/deletelikes",
        method: 'DELETE',
        body: JSON.stringify(likeRequest)
    })
}

export function deletePost(postId) {
    return request({
        url: API_BASE_URL + "/posts?postId=" +postId,
        method: "DELETE"
    })
}

export function followUser(username) {
    return request({
        url: API_BASE_URL + "/users/" + username + "/follow",
        method : "GET"
    })
}

export function unfollowUser(username) {
    return request({
        url: API_BASE_URL + "/users/" + username + "/unfollow",
        method : "GET"
    })
}

export function checkingFollow(username) {
    return request({
        url: API_BASE_URL + "/users/" + username + "/checking",
        method : "GET"
    })
}

export function editUserInfo(UserEditInfo) {
    return request({
        url : API_BASE_URL + "/accounts/edit",
        method : "POST",
        body : JSON.stringify(UserEditInfo)
    })
}

