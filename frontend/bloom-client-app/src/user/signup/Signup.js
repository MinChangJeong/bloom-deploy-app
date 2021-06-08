import React, { useEffect, useState } from 'react';
import "./Signup.css"
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../util/APIUtils';
import {
    NAME_MIN_LENGTH, NAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, ACCESS_TOKEN
} from '../../constants';
import { Link, NavLink, useHistory } from 'react-router-dom';

import { Form, Input, Button, notification } from 'antd';

const FormItem = Form.Item;

function SignupFuction() {
    let history = useHistory();

    const [name, setName] = useState({
        value: '',
    });
    const [username, setUsername] = useState({
        value: '',
    })
    const [email, setEmail] = useState({
        value: '',
    })
    const [password, setPassword] = useState({
        value: '',
    })

    const isFormInvalid = () => {
        return !(
            name.validateStatus === 'success' &&
            username.validateStatus === 'success' &&
            email.validateStatus === 'success' &&
            password.validateStatus === 'success'
        )
    }

    const handleSubmit = () => {
        const signupRequest = {
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value
        };

        signup(signupRequest)
            .then(response => {
                notification.success({
                    message: 'Bloom',
                    description: "Thank you! You're successfully registered. Please Login to continue!",
                });
                history.push("/login");
            }).catch(error => {
                notification.error({
                    message: 'Bloom',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            });
    }

    const onChangedName = (event) => {
        var { value } = event.target;
        setName({
            ...name,
            value: value,
            ...validateName()
        })
    }

    const onChangedUsername = (event) => {
        var { value } = event.target;
        setUsername({
            ...username,
            value: value,
            ...validateUsername()
        })
    }

    const onChangedEmail = (event) => {
        var { value } = event.target;

        setEmail({
            ...email,
            value: value,
            ...validateEmail()
        })
    }

    const onChangedPassword = (event) => {
        var { value } = event.target;
        setPassword({
            ...password,
            value: value,
            ...validatePassword()
        })
    }

    useEffect(() => {
        if (username.validateStatus === null) {
            checkUsernameAvailability(username.value)
                .then(response => {
                    if (response.available) {
                        setUsername({
                            ...username,
                            value: username.value,
                            validateStatus: 'success',
                            errorMsg: null
                        })
                    }
                    else {
                        setUsername({
                            ...username,
                            value: username.value,
                            validateStatus: 'error',
                            errorMsg: 'Username is already taken'
                        })
                    }
                })
                .catch(error => {
                    console.log(error.message)
                    setUsername({
                        ...username,
                        value: username.value,
                        validateStatus: 'error',
                        errorMsg: error.message || 'Somthing was wrong'
                    })
                })
        }
    }, [username])

    useEffect(() => {
        if (email.validateStatus === null) {
            checkEmailAvailability(email.value)
                .then(response => {
                    if (response.available) {
                        setEmail({
                            ...email,
                            validateStatus: 'success',
                            errorMsg: null
                        })
                    }
                    else {
                        setEmail({
                            ...email,
                            value: email.value,
                            validateStatus: 'error',
                            errorMsg: 'This Email is already registered'
                        })
                    }
                })
                .catch(error => {
                    console.log(error.message)
                    setEmail({
                        ...email,
                        value: email.value,
                        validateStatus: 'error',
                        errorMsg: 'error : ' + error.message
                    })
                })
        }

    }, [email])

    const validateName = () => {
        if ((name.value !== undefined) && (name.value.length < NAME_MIN_LENGTH)) {
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
        if (username.value.length < USERNAME_MIN_LENGTH) {
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
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    const validateEmail = () => {
        if (!email.value) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email.value)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if (email.value.length > EMAIL_MAX_LENGTH) {
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

    const validatePassword = () => {
        if (password.value.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.value.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }


    return (
        <Form
            className="signup_body"
            onFinish={handleSubmit}
            // className="signup-form"
            requiredMark="true"
        >
            <Form.Item
                style={{
                    backgroundColor: "white",
                    borderRadius: "10%",
                    marginTop: "20px",
                    paddingTop: "50px",
                    paddingBottom: "50px",
                    paddingLeft: "100px",
                    paddingRight: "100px"
                }}
            >
                <Form.Item
                    style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "40px",
                        paddingTop: "0px",
                        paddingBottom: "20px"
                    }}
                >
                    회원가입
                </Form.Item>

                <FormItem
                    label="Full Name"
                    validateStatus={name.validateStatus}
                    help={name.errorMsg}
                >
                    <Input
                        size="large"
                        name="name"
                        authoComplete="off"
                        placeholder="Please input your full name!"
                        allowClear="true"
                        onChange={(e) => { onChangedName(e) }}
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
                        placeholder="Please input your username!"
                        allowClear="true"
                        onChange={(e) => { onChangedUsername(e) }}
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
                        placeholder="Please input your email!"
                        onChange={(e) => { onChangedEmail(e) }}
                    />
                </FormItem>

                <FormItem
                    label="Password"
                    validateStatus={password.validateStatus}
                    help={password.errorMsg}
                >
                    <Input
                        size="large"
                        type="password"
                        name="password"
                        authoComplete="off"
                        placeholder="Must be between 6 and 20 characters"
                        onChange={(e) => { onChangedPassword(e) }}
                    />
                </FormItem>

                <FormItem>
                    <Button
                        style={{
                            borderStyle: "none",
                            backgroundImage: "linear-gradient(135deg, #FFFABF, #D8DFEC, #D5C6E3)"
                        }}
                        type="primary"
                        block shape="round"
                        htmlType="submit"
                        disabled={isFormInvalid()}
                    >
                        Sign up
                    </Button>
                </FormItem>

                <Form.Item style={{ textAlign: "center" }}>
                    계정이 있으신가요? <Link style={{ color: "#D5C6E3" }} to="/login">Login</Link>
                </Form.Item>
            </Form.Item>
        </Form>
    );

}

export default SignupFuction;
