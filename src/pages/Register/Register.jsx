import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useUserRegisterMutation } from '../../redux/api/api';
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [userRegister, { isLoading }] = useUserRegisterMutation()
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (data.password === data.cpassword) {
            delete data.cpassword;
            const result = await userRegister(data)

            if (result?.data?.success) {
                toast.success(result?.data?.message, {
                    position: "bottom center"
                })
                toast.success("Please login", {
                    position: "bottom center"
                })
                navigate("/login")
            } else {
                toast.error(result?.error?.data?.message, {
                    position: "bottom center"
                })
            }

        } else {
            toast.error("Password and confirm password did not matched!")
        }
    }

    return (
        <div className="Register py-5">
            <div className="container">
                <div className="register__title mt-5 mx-auto text-center">
                    <h3 className="font-semibold d-inline-block border-2 border-bottom border-dark pb-2">Register</h3>
                </div>
                <div className="login__content w-75 mx-auto mt-5 border border-gray p-4 rounded">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is required!"
                                    }
                                })}
                            />
                            <Form.Text className="text-danger">
                                {errors?.name?.type === "required" && errors?.name?.message}
                            </Form.Text>
                        </Form.Group>

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
                                type="password" placeholder="Enter password"
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

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type="password" placeholder="Re enter password"
                                {...register("cpassword", {
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
                                {errors?.cpassword?.type === "required" && errors?.cpassword?.message}
                                {errors?.cpassword?.type === "pattern" && errors?.cpassword?.message}
                            </Form.Text>
                        </Form.Group>
                        <Button className="w-100 mt-3" variant="primary" type="submit">
                            {isLoading ? (
                                <Spinner animation="border" role="status" size="sm">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) : "Submit"}
                        </Button>
                        <p className="text-center my-3">Already Have account? <Link to="/login">Login</Link></p>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;