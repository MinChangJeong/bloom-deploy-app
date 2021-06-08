import React from 'react';
import "./Login.css";
import { login } from '../../util/APIUtils';
import { ACCESS_TOKEN } from '../../constants';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, notification} from 'antd';
import { Link } from 'react-router-dom';
  
function Login() {
    let history = useHistory();

    const onFinish = (values) => {
        const loginRequest = Object.assign({}, values);
        login(loginRequest)
            .then(response => {
		   
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                notification.success({
                    message: 'Bloom',
                    description: "You're successfully logged in.",
                  });
                window.location.replace("/");
            })
            .catch(error => {
                if(error.status === 401) {
                    notification.error({
                        message: 'Bloom',
                        description: 'Your Username or Password is incorrect. Please try again!'
                    });                      
                } else {
                    notification.error({
                        message: 'Bloom',
                        description: error.message || 'Sorry! Something went wrong. Please try again!'
                    });                                         
                }
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        // <div className="login_form">
            <Form
                className="login_body"
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                        Login
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="usernameOrEmail"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            style={{
                                borderStyle: "none",
                                backgroundImage: "linear-gradient(135deg, #FFFABF, #D8DFEC, #D5C6E3)" 
                            }} 
                            type="primary" 
                            block shape ="round" 
                            htmlType="submit"
                        >
                            Login
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: "center" }}>
                        계정이 없으신가요? <Link style={{ color: "#D5C6E3" }} to="/signup">Sign up</Link>
                    </Form.Item>
                </Form.Item>
            </Form>
        // </div>
    );
}

export default Login;
