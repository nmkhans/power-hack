import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useUserLoginMutation } from '../../redux/api/api';
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from 'react-auth-kit'

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [userLogin, { isLoading }] = useUserLoginMutation();
    const signIn = useSignIn()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const result = await userLogin(data)

        if (result?.data?.success) {
            signIn({
                token: result.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: result.data.data,
            })

            toast.success(result?.data?.message, {
                position: "bottom center"
            })
            navigate("/")
        } else {
            toast.error(result?.error?.data?.message, {
                position: "bottom center"
            })
        }

    }

    return (
        <div className="Login py-5">
            <div className="container">
                <div className="login__title mt-5 mx-auto text-center">
                    <h3 className="font-semibold d-inline-block border-2 border-bottom border-dark pb-2">Login</h3>
                </div>
                <div className="login__content w-75 mx-auto mt-5 border border-gray p-4 rounded">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required!"
                                    },
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: 'Enter valid email!'
                                    }
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors?.email?.type === "required" && errors?.email?.message}
                                {errors?.email?.type === "pattern" && errors?.email?.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password" placeholder="Password"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required!"
                                    },
                                    pattern: {
                                        value: /.{8,}/,
                                        message: "Password must be 8 digit or charecter!"
                                    }
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors?.password?.type === "required" && errors?.password?.message}
                                {errors?.password?.type === "pattern" && errors?.password?.message}
                            </Form.Text>
                        </Form.Group>
                        <Button className="w-100 mt-3" variant="primary" type="submit">
                            {isLoading ? (
                                <Spinner animation="border" role="status" size="sm">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) : "Submit"}
                        </Button>
                        <p className="text-center my-3">Don't have account? <Link to="/register">Register</Link></p>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;