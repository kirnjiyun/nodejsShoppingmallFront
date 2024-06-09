import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { currencyFormat } from "../utils/number";

const ProductTable = ({ header, data, deleteItem, openEditForm }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteName, setDeleteName] = useState("");

    const handleShowDeleteConfirm = (id, name) => {
        setDeleteId(id);
        setDeleteName(name);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteId) {
            deleteItem(deleteId);
        }
        setShowDeleteConfirm(false);
    };

    return (
        <div className="overflow-x">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {header.map((title, index) => (
                            <th key={index}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <th>{index}</th>
                                <th>{item.sku}</th>
                                <th style={{ minWidth: "100px" }}>
                                    {item.name}
                                </th>
                                <th>{currencyFormat(item.price)}</th>
                                <th>
                                    {Object.keys(item.stock).map(
                                        (size, index) => (
                                            <div key={index}>
                                                {size}:{item.stock[size]}
                                            </div>
                                        )
                                    )}
                                </th>
                                <th>
                                    <img
                                        src={item.image}
                                        width={100}
                                        alt="image"
                                    />
                                </th>
                                <th>{item.status}</th>
                                <th style={{ minWidth: "100px" }}>
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() =>
                                            handleShowDeleteConfirm(
                                                item._id,
                                                item.name
                                            )
                                        }
                                        className="mr-1"
                                    >
                                        -
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => openEditForm(item)}
                                    >
                                        Edit
                                    </Button>
                                </th>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={header.length}>아이템이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal
                show={showDeleteConfirm}
                onHide={() => setShowDeleteConfirm(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {` "${deleteName}"를(을) 삭제하시겠습니까? `}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteConfirm(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductTable;
