import React, { useEffect , useState} from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import {getAvatarColor} from '../../util/Colors';
import { formatDateTime } from '../../util/Helpers';
import './EditProfile.css';
import {Form, Input, notification, Button, Menu, Dropdown, Divider} from 'antd';
import {post} from 'axios';
import { getCurrentUser, getUserProfile } from '../../util/APIUtils';
import {  checkEditUsernameAvailability, checkEditEmailAvailability, editUserInfo } from '../../util/APIUtils';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH, ACCESS_TOKEN,
    API_BASE_URL
} from '../../constants';

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const FormItem = Form.Item;

function EditProfileImage() {
    // const [images, setImages] =  useState({
    //     value : null,
    // })

    // const onChangedImages = (e) => {
    //     setImages({
    //         ...images,
    //         value : e.target.files[0],
    //         validateStatus : 'success',
    //         errorMsg : null
    //     })
    // }

    // const handleImageSubmit = (e) => {
    //     e.preventDefault();
        
    //     const formData = new FormData();
    //     formData.append('image', images.value);
      
    //     const config = {
    //         headers : {
    //             'Content-Type' : 'multipart/form-data',
    //             'Authorization' : `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    //         }
    //     }

        // return post(API_BASE_URL+'/accounts/edits/image', formData, config)
        //     .then(response => {
        //         notification.success({
        //             message : 'Bloom',
        //             description : 'Successfully edit profile image!'
        //         })
        //     })
        //     .catch(error => {
        //         notification.error({
        //             message : 'Bloom',
        //             description : error.message || 'Sorry Somthing was wrong'
        //         })
        //     })
    // }

    const [fileList, setFileList] = useState([]);

    const handleUpload = (info) => {
      setFileList(info.fileList)
      console.log(info.fileList)
    }
  
    // upload 후에 image를 보여주는 코드
    const onPreview = async file => {
      let src = file.url;
      if (!src) {
        src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    };
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
  
      fileList.forEach((file) => {
        formData.append("image", file.originFileObj);
        console.log(file.originFileObj);
      })
  
      const config = {
        headers : {
          'Content-Type' : 'multipart/form-data',
          'Authorization' : `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
  
      return post(API_BASE_URL+'/accounts/edits/image', formData, config)
      .then(response => {
          notification.success({
              message : 'Bloom',
              description : 'Successfully edit profile image!'
          })
      })
      .catch(error => {
          notification.error({
              message : 'Bloom',
              description : error.message || 'Sorry Somthing was wrong'
          })
      })
  
    }

    return (
        <div style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignContent:"center"
            }}>
            {/* <form >
                <input type="file" onChange={(e) => {onChangedImages(e)}}/>
                <Button 
                        style={{
                            borderStyle: "none",
                            backgroundImage: "linear-gradient(135deg, #FFFABF, #D8DFEC, #D5C6E3)" 
                        }} 
                        type="primary" 
                        block shape ="round" 
                        htmlType="submit"
                        onClick={handleImageSubmit}
                    >
                    Save
                </Button>
            </form> */}
            <ImgCrop
                className="imageUpload-container"
            >
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleUpload}
                    onPreview={onPreview}
                >
                    {fileList.length < 1 && '+ Upload'}
                </Upload>
            </ImgCrop>
            <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                onClick={handleSubmit}
                block shape ="round" 
                style={{
                    marginBottom: "40px",
                    borderStyle: "none",
                    width: "120px",
                    backgroundImage: "linear-gradient(135deg, #fffabf, #d8dfec, #d5c6e3)"
                }}
                >
                save
            </Button>
            
        </div>
    );
}

function EditProfile() {
    // 현재 edit 하고 있는 유저의 username, email을 제외하고 validate를 진행하는 코드를 만들어야함.
    const [user, setUser] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {   
        // 새로 리랜더링하면 에러나는건 react의 특징인가?

        getCurrentUser()
            .then(response => {
                setCurrentUser(response);
            })

        loadUserProfile(currentUser.username)
    }, [])

    const loadUserProfile = (username) => {

        getUserProfile(username)
            .then(response => {
                setUser(response);
            })
    } 

    useEffect(() => {
        console.log(currentUser)
    }, [currentUser])

    useEffect(() => {
        console.log(user.id)
    }, [user])

    const [name, setName] = useState({
        value : '',
    });
    const [username, setUsername] = useState({
        value : '',
    })
    const [email, setEmail] = useState({
        value : '',
    })
    const [bio, setBio] = useState({
        value: '',
    })
    const [phoneNumber, setPhoneNumber] = useState({
        value : '',
    })

    const isFormInvalid = () => {
        return !(
            name.validateStatus === 'success' &&
            username.validateStatus === 'success' &&
            email.validateStatus === 'success' &&
            phoneNumber.validateStatus === 'success' &&
            bio.validateStatus === 'success' 
        )
    }

    const handleEditSubmit = () => {
        const UserEditInfo = {
            userId : currentUser.id,
            name : name.value,
            username : username.value,
            email : email.value,
            bio : bio.value,
            phoneNumber : phoneNumber.value
        };

        const profileURL = "/users/" + user.username;

        editUserInfo(UserEditInfo)
            .then(response => {
                notification.success({
                    message: 'Polling App',
                    description: "Thank you! You're successfully registered. Please Login to continue!",
                }); 
                window.location.replace(profileURL);
            }).catch(error => {
                notification.error({
                    message: 'Polling App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            });
    }

    const onChangedName = (event) => {
        var { value } = event.target;
        setName({
            ...name,
            value : value,
            ...validateName()
        })
    }

    const onChangedUsername = (event) => {
        var { value } = event.target;

        setUsername({
            ...username,
            value : value,
            ...validateUsername()
        })
    }

    const onChangedEmail = (event) => {
        var { value } = event.target;

        setEmail({
            ...email,
            value : value,
            ...validateEmail()
        })
    }

    const onChangedBio = (event) => {
        var { value } = event.target;

        setBio({
            ...bio,
            value : value,
            validateStatus : 'success',
            errorMsg : null
        })
    }

    const onChangedPhoneNumber = (event) => {
        var { value } = event.target;

        setPhoneNumber({
            ...phoneNumber,
            value : value,
            validateStatus : 'success',
            errorMsg : null
        })
    }

    useEffect(() => {
        if(username.validateStatus === null){
            checkEditUsernameAvailability(username.value)
                .then(response => {
                    console.log(response)
                    if(response.available){
                        setUsername({
                            ...username,
                            value : username.value,
                            validateStatus : 'success',
                            errorMsg : null
                        })
                    }
                    else {
                        setUsername({
                            ...username, 
                            value : username.value,
                            validateStatus : 'error',
                            errorMsg : 'Username is already taken'
                        })
                    }
                })
                .catch(error => {
                    setUsername({
                        ...username,
                        value : username.value,
                        validateStatus : 'error',
                        errorMsg : 'Somthing was wrong'
                    })
                })
        }
    },[username])

    useEffect(() => {
        if(email.validateStatus === null) {
            checkEditEmailAvailability(email.value)
                .then(response => {
                    if(response.available) {
                        setEmail({
                            ...email,
                            validateStatus : 'success',
                            errorMsg : null
                        })
                    }
                    else {
                        setEmail({
                            ...email,
                            value : email.value,
                            validateStatus : 'error',
                            errorMsg : 'This Email is already registered'
                        })
                    }
                })   
                .catch(error => {
                    setEmail({
                        ...email,
                        value : email.value,
                        validateStatus : 'error',
                        errorMsg : 'error : '+ error
                    })
                })         
        }

    }, [email])

    const validateName = () => {
        if((name.value !== undefined) && (name.value.length < NAME_MIN_LENGTH)) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if ((name.value !== undefined) && (name.value.length > NAME_MAX_LENGTH)) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              }; 
        }
    }

    const validateUsername = () => {
        if(username.value.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.value.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
           return {
               validateStatus : null,
               errorMsg : null
           }
        }
    }
    
    const validateEmail = () => {
        if(!email.value) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email.value)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if(email.value.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }
    const [editImageState, setEditImageStaate] = useState(false);

    useEffect(() => {
        console.log(editImageState)
    }, [editImageState])

    return (
        <div className="edit-profile-container">
            <div className="edit-profile-base-container">
                <div className="edit-profile-menubar">
                    <div className="edit-profile">
                        <Button
                            style={{
                                border: "none",
                                fontSize:"18px",
                            }}
                            onClick={(e) => setEditImageStaate(false)}
                            
                        >
                            Edit Profile 
                        </Button>
                    </div>
                    <Divider />
                    <div className="edit-profile-image">
                        <Button
                            style={{
                                border: "none",
                                fontSize:"18px"
                            }}
                            onClick={(e) => setEditImageStaate(true)}
                        >
                            Edit Profile Image
                        </Button>
                    </div>
                    <Divider />
                </div>
                
                {
                    !editImageState ? (
                        <div className="edit-profile-info-container">
                            <div className="for-profile-user-details">
                                <div className="user-avatar">
                                    {
                                        user.profileImage !==null ? (
                                            <Avatar  
                                                style={{
                                                    width: "60px",
                                                    height: "60px"
                                                }}
                                                src={`data:image/jpeg;base64,${currentUser.profileImage}`}

                                            >
                                            </Avatar>
                                        ) : (
                                            <Avatar  
                                                style={{
                                                    backgroundColor: getAvatarColor(currentUser.name),
                                                    width: "60px",
                                                    height: "60px"
                                                }}

                                            >
                                            </Avatar>
                                        )
                                    }
                                </div>
                                <div className="user-detail-info">
                                    <div className="user-summary">
                                        <div className="username">{currentUser.username}</div>
                                        <div className="full-name">{currentUser.name}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="edit-profile-info-container">
                                <Form
                                    onFindish
                                    requiredMark="true"
                                    onFinish={handleEditSubmit}
                                >
                                    <FormItem
                                        label="Full Name"
                                        validateStatus={name.validateStatus}
                                        help={name.errorMsg}
                                    >
                                        <Input 
                                            size="large"
                                            name="name"
                                            authoComplete="off"
                                            placeholder={user.name || "Please input your full name!"}
                                            allowClear="true"
                                            onChange={(e) => {onChangedName(e)}}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Username"
                                        validateStatus={username.validateStatus}
                                        help={username.errorMsg}
                                    >
                                        <Input 
                                            size="large"
                                            name="username"
                                            authoComplete="off"
                                            placeholder={user.username || "Please input your username!"}
                                            allowClear="true"
                                            onChange={(e) => {onChangedUsername(e)}}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Email"
                                        validateStatus={email.validateStatus}
                                        help={email.errorMsg}
                                    >
                                        <Input 
                                            size="large"
                                            name="email"
                                            authoComplete="off"
                                            placeholder={user.email || "Please input your email!"}
                                            onChange={(e) => {onChangedEmail(e)}}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Bio"
                                        validateStatus={bio.validateStatus}
                                        help={bio.errorMsg}
                                    >
                                        <Input 
                                            size="large"
                                            name="bio"
                                            authoComplete="off"
                                            placeholder={bio.value || "personal information"}
                                            onChange={(e) => {onChangedBio(e)}}
                                        />
                                    </FormItem>
                                    
                                    <FormItem
                                        label="phoneNumber"
                                        validateStatus={phoneNumber.validateStatus}
                                        help={phoneNumber.errorMsg}
                                    >
                                        <Input 
                                            size="large"
                                            name="phoneNumber"
                                            authoComplete="off"
                                            placeholder={phoneNumber.value || "Please input your phoneNumber"}
                                            onChange={(e) => {onChangedPhoneNumber(e)}}
                                        />
                                    </FormItem>

                                    <FormItem>
                                        <Button 
                                            style={{
                                                width: "100px",
                                                borderStyle: "none",
                                                backgroundImage: "linear-gradient(135deg, #FFFABF, #D8DFEC, #D5C6E3)" 
                                            }} 
                                            type="primary" 
                                            block shape ="round" 
                                            htmlType="submit"
                                            disabled={isFormInvalid()}
                                        >
                                            Save
                                        </Button>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                    ) : (
                        <div className="edit-profile-image-container">
                            <EditProfileImage />
                        </div> 
                    )
                }
            </div>
        </div>
    );
}

export default EditProfile;