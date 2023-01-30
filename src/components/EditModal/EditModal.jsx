import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useGetSingleBillingQuery, useUpdateBillingMutation } from '../../redux/api/api';
import { useAuthHeader } from 'react-auth-kit'
import { toast } from "react-hot-toast"

const EditModal = ({ show, setModal, id }) => {
    const authHeader = useAuthHeader();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const auth = authHeader()
    const { data: existData } = useGetSingleBillingQuery(id)
    const defaultvalue = existData?.data;

    const [updateBilling] = useUpdateBillingMutation()

    const onSubmit = async (data) => {
        const newData = {
            name: data.name ? data.name : defaultvalue.name,
            email: data.email ? data.email : defaultvalue.email,
            phone: data.phone ? data.phone : defaultvalue.phone,
            paidAmount: data.paidAmount ? data.paidAmount : defaultvalue.paidAmount
        }

        const response = await updateBilling({ newData, id, auth })

        if (response?.data?.success) {
            reset()
            toast.success(response.data.message, {
                position: "bottom center"
            })
            setModal(prev => ({
                ...prev,
                updateModal: false
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
                updateModal: false
            }))}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Billing
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
                            defaultValue={defaultvalue?.name}
                            {...register("name")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            defaultValue={defaultvalue?.email}
                            {...register("email")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone"
                            defaultValue={defaultvalue?.phone}
                            {...register("phone")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label>Paid Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter paid amount"
                            defaultValue={defaultvalue?.paidAmount}
                            {...register("paidAmount")}
                        />
                    </Form.Group>

                    <Button className="w-100" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            </Modal.Body>
        </Modal>
    );
};

export default EditModal;