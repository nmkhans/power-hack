import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useBillingListQuery, useDeleteBillingMutation } from '../../redux/api/api';
import { useAuthHeader } from 'react-auth-kit'
import TableRow from './../../components/TableRow/TableRow';
import { useSignOut } from 'react-auth-kit'
import { toast } from 'react-hot-toast';
import AddModal from './../../components/AddModal/AddModal';
import EditModal from '../../components/EditModal/EditModal';

const Home = () => {
    const authHeader = useAuthHeader();
    const signOut = useSignOut();
    const [query, setQuery] = useState({
        pageno: 1,
        perpage: 10,
        search: "",
        active: 1,
        auth: authHeader()
    })
    const [modal, setModal] = useState({
        addModal: false,
        updateModal: false,
        updateId: ""
    });

    const { data, isLoading, error: billError } = useBillingListQuery(query)

    const [deleteBilling] = useDeleteBillingMutation()


    if (billError?.status === 403) {
        signOut()
    }

    const billings = data?.data[0]?.data;

    const handleSearch = (event) => {
        setQuery((prev) => ({
            ...prev,
            search: event.target.value
        }))
    }

    const handlePagination = (index) => {
        setQuery((prev) => ({
            ...prev,
            pageno: index,
            active: index
        }))
    }

    const handleDelete = async (id) => {
        const { auth } = query;
        const response = await deleteBilling({ id, auth })

        if (response?.data?.success) {
            toast.success(response?.data?.message)
        }
    }

    const handleUpdate = (id) => {
        setModal(prev => ({
            ...prev,
            updateId: id,
            updateModal: true
        }))
    }

    const calculateBtn = () => {
        const totalData = data?.data[0]?.count[0]?.count;
        const perPage = query.perpage;
        const totalAmount = Math.ceil(totalData / perPage)
        const totalBtn = [];
        for (let i = 0; i <= totalAmount; i++) {
            totalBtn.push(i + 1)
        }
        return totalBtn;
    }

    return (
        <main className="container my-5">
            <div className="billing__table__header">
                <Navbar bg="dark">
                    <Container className="flex align-items-center py-2">
                        <div>
                            <p className="text-white ms-3 mb-0">Showing {data?.data[0]?.data?.length} of {data?.data[0]?.count[0]?.count} Billings</p>
                        </div>
                        <div>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={handleSearch}
                                />
                            </Form>
                        </div>
                        <div className="me-3">
                            <Button onClick={() => setModal(prev => ({
                                ...prev,
                                addModal: true
                            }))}variant="outline-primary">Add New</Button>
                        </div>
                    </Container>
                </Navbar>
            </div>
            <div className="billing__table__content mt-4">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Billing Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Paid Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billings?.map(bill => (
                            <TableRow
                                key={bill._id}
                                bill={bill}
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="billing__table__pagination text-center">
                {calculateBtn().map(index => <Button
                    onClick={() => handlePagination(index)} className="mx-2"
                    variant={`${index === query.active ? "primary" : "outline-primary"}`}
                >{index}</Button>)}
            </div>
            <div className="billing__modal">
                <AddModal show={modal.addModal} setModal={setModal} />
                <EditModal show={modal.updateModal} setModal={setModal} id={modal.updateId} />
            </div>
        </main>
    );
};

export default Home;