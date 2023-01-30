import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useAddBillingMutation } from '../../redux/api/api';
import { useAuthHeader } from 'react-auth-kit'
import { toast } from "react-hot-toast"

const AddModal = ({ show, setModal }) => {
    const authHeader = useAuthHeader();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [addBill] = useAddBillingMutation()
    const auth = authHeader()

    const onSubmit = async (data) => {
        const response = await addBill({ data, auth })

        if (response?.data?.success) {
            reset()
            toast.success(response.data.message, {
                position: "bottom center"
            })
            setModal(prev => ({
                ...prev,
                addModal: false
            }))
        } else {
            toast.error(response.error?.data?.message, {
                position: "bottom center"
            })
        }
    }

    return (
        <Modal
            show={show}
            onHide={() => setModal(prev => ({
                ...prev,
                addModal: false
            }))}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Billing
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="px-3"
                    onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Name is required"
                                }
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors?.name?.type === "required" && errors?.name?.message}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email is required"
                                }
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors?.email?.type === "required" && errors?.email?.message}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone"
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: "Phone is required"
                                },
                                minLength: {
                                    value: 11,
                                    message: "Phone number has to be 11 digit"
                                }
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors?.phone?.type === "required" && errors?.phone?.message}
                            {errors?.phone?.type === "minLength" && errors?.phone?.message}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label>Paid Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter paid amount"
                            {...register("paidAmount", {
                                required: {
                                    value: true,
                                    message: "Amount is required"
                                },
                                min: {
                                    value: 100,
                                    message: "Minimum amount is 100"
                                }
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors?.paidAmount?.type === "required" && errors?.paidAmount?.message}
                            {errors?.paidAmount?.type === "min" && errors?.paidAmount?.message}
                        </Form.Text>
                    </Form.Group>

                    <Button className="w-100" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            </Modal.Body>
        </Modal>
    );
};

export default AddModal;