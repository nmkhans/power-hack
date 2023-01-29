import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useBillingListQuery } from '../../redux/api/api';
import { useAuthHeader } from 'react-auth-kit'
import TableRow from './../../components/TableRow/TableRow';

const Home = () => {
    const authHeader = useAuthHeader();
    const [query, setQuery] = useState({
        pageno: 1,
        perpage: 10,
        search: "",
        auth: authHeader()
    })

    const { data, isLoading, error } = useBillingListQuery(query)
    const billings = data?.data[0]?.data;

    const handleSearch = (event) => {
       setQuery((prev) => ({
        ...prev,
        search: event.target.value
       }))
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
                            <Button variant="outline-primary">Add New</Button>
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
                        {billings?.map(bill => <TableRow key={bill._id} bill={bill} />)}
                    </tbody>
                </Table>
            </div>
            <div className="billing__table__pagination">

            </div>
        </main>
    );
};

export default Home;