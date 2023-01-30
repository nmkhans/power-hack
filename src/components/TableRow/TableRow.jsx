import React from 'react';
import Button from "react-bootstrap/Button";

const TableRow = ({ bill, handleDelete }) => {
    
    return (
        <tr>
            <td>{bill._id}</td>
            <td>{bill.name}</td>
            <td>{bill.email}</td>
            <td>{bill.phone}</td>
            <td>{bill.paidAmount}</td>
            <td>
                <Button className="btn btn-sm btn-warning text-white">Edit</Button>
                <Button
                onClick={() => handleDelete(bill._id)}
                className="btn btn-sm btn-danger text-white ms-2">Delete</Button>
            </td>
        </tr>
    );
};

export default TableRow;