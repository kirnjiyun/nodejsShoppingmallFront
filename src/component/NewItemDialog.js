import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { CATEGORY, STATUS, SIZE } from "../constants/product.constants";
import "../style/adminProduct.style.css";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";

const InitialFormData = {
    name: "",
    sku: "",
    stock: {},
    image: "",
    description: "",
    category: [],
    status: "active",
    price: 0,
};

const NewItemDialog = ({ mode, showDialog, setShowDialog }) => {
    const { selectedProduct } = useSelector((state) => state.product);
    const { error } = useSelector((state) => state.product);
    const [formData, setFormData] = useState(
        mode === "new" ? { ...InitialFormData } : selectedProduct
    );
    const [stock, setStock] = useState([]);
    const dispatch = useDispatch();
    const [stockError, setStockError] = useState(false);

    const handleClose = () => {
        setFormData({ ...InitialFormData });
        setStock([]);
        setStockError(false);
        setShowDialog(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (stock.length === 0) {
            setStockError(true);
            return;
        }
        const stockObject = Object.fromEntries(stock);
        const updatedFormData = { ...formData, stock: stockObject };

        if (mode === "new") {
            dispatch(productActions.createProduct(updatedFormData));
        } else {
            //edit일때
            dispatch(
                productActions.updateProduct(
                    updatedFormData,
                    selectedProduct._id
                )
            );
        }
        handleClose();
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const addStock = () => {
        setStock([...stock, []]);
    };

    const deleteStock = (idx) => {
        const newStock = stock.filter((item, index) => index !== idx);
        setStock(newStock);
    };

    const handleSizeChange = (value, index) => {
        const newStock = [...stock];
        newStock[index][0] = value;
        setStock(newStock);
    };

    const handleStockChange = (value, index) => {
        const newStock = [...stock];
        newStock[index][1] = value;
        setStock(newStock);
    };

    const onHandleCategory = (event) => {
        const value = event.target.value;
        let newCategory;

        if (formData.category.includes(value)) {
            newCategory = formData.category.filter((item) => item !== value);
            setFormData({ ...formData, category: newCategory });
        } else {
            newCategory = [...formData.category, value];
            setFormData({ ...formData, category: newCategory });
        }
    };

    const uploadImage = (url) => {
        setFormData({ ...formData, image: url });
    };

    useEffect(() => {
        if (showDialog) {
            if (mode === "edit") {
                console.log(selectedProduct);
                setFormData(selectedProduct);
                const stockArray = Object.keys(selectedProduct.stock).map(
                    (size) => [size, selectedProduct.stock[size]]
                );
                setStock(stockArray);
            } else {
                setFormData({ ...InitialFormData });
                setStock([]);
            }
        }
    }, [showDialog, mode, selectedProduct]);

    return (
        <Modal show={showDialog} onHide={handleClose}>
            <Modal.Header closeButton>
                {mode === "new" ? (
                    <Modal.Title>Create New Product</Modal.Title>
                ) : (
                    <Modal.Title>Edit Product</Modal.Title>
                )}
            </Modal.Header>

            <Form className="form-container" onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="sku">
                        <Form.Label>Sku</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            type="string"
                            placeholder="Enter Sku"
                            required
                            value={formData.sku}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            type="string"
                            placeholder="Name"
                            required
                            value={formData.name}
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="string"
                        placeholder="Description"
                        as="textarea"
                        onChange={handleChange}
                        rows={3}
                        value={formData.description}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="stock">
                    <Form.Label className="mr-1">Stock</Form.Label>
                    {stockError && (
                        <span className="error-message">
                            재고를 추가해주세요
                        </span>
                    )}
                    <Button size="sm" onClick={addStock}>
                        Add +
                    </Button>
                    <div className="mt-2">
                        {stock.map((item, index) => (
                            <Row key={index}>
                                <Col sm={4}>
                                    <Form.Select
                                        onChange={(event) =>
                                            handleSizeChange(
                                                event.target.value,
                                                index
                                            )
                                        }
                                        required
                                        value={item[0] ? item[0] : ""}
                                    >
                                        <option value="" disabled hidden>
                                            Please Choose...
                                        </option>
                                        {SIZE.map((item, index) => (
                                            <option
                                                key={index}
                                                value={item}
                                                disabled={stock.some(
                                                    (size) => size[0] === item
                                                )}
                                            >
                                                {item}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col sm={6}>
                                    <Form.Control
                                        onChange={(event) =>
                                            handleStockChange(
                                                event.target.value,
                                                index
                                            )
                                        }
                                        type="number"
                                        placeholder="number of stock"
                                        value={item[1]}
                                        required
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => deleteStock(index)}
                                    >
                                        -
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <CloudinaryUploadWidget uploadImage={uploadImage} />
                    {formData.image && (
                        <img
                            id="uploadedimage"
                            src={formData.image}
                            className="upload-image mt-2"
                            alt="uploadedimage"
                        ></img>
                    )}
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            value={formData.price}
                            required
                            onChange={handleChange}
                            type="number"
                            placeholder="0"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="category">
                        <Form.Label>Category</Form.Label>
                        <select
                            className="form-control"
                            multiple
                            onChange={onHandleCategory}
                            value={formData.category}
                            required
                        >
                            {CATEGORY.map((item, idx) => (
                                <option key={idx} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            {STATUS.map((item, idx) => (
                                <option key={idx} value={item}>
                                    {item}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Row>
                {mode === "new" ? (
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                ) : (
                    <Button variant="primary" type="submit">
                        Edit
                    </Button>
                )}
            </Form>
        </Modal>
    );
};

export default NewItemDialog;
