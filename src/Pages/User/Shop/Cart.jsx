import React, { useEffect, useState } from 'react'
import { images } from '../../../Assets'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import { useFormStatus } from '../../../Hooks/useFormStatus'
import { productData } from '../../../Config/data'
import { useNavigate, useParams } from 'react-router-dom'
import CustomButton from '../../../Components/CustomButton'
import BackButton2 from '../../../Components/BackButton/BackButton2'
import "./style.css"
import { usePageTitle } from '../../../Utils/helper'
import { getAll, post } from '../../../Services/Api'
import { showToast } from '../../../Components/Toast'

const Cart = () => {
    usePageTitle("My Cart", true);

    const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus(); // use your custom hook 
    const [cartData, setCartData] = useState();


    const navigate = useNavigate()
    const handleSubmit = async (values, { resetForm }) => {
        startSubmitting();
        console.log("Form Submit Values", values)
        // navigate('/view-cart')
        stopSubmitting();
        resetForm();
    };


    const fetchData = async () => {
        startSubmitting();
        try {

            const response = await getAll(`/user/cart/get-cart`);

            if (response?.status) {

                setCartData(response?.data);

            } else {
                console.log("Error fetching cart items: ", response);
            }


        } catch (error) {
            console.log("Error fetching cart items: ", error);
        }
        stopSubmitting();

    }


    useEffect(() => {
        fetchData();
    }, []);


    return (
        <section className='page-content product-view'>
            <Container fluid>
                <Row>
                    <Col sm={12} className="d-flex align-items-center mb-4 mb-xxl-5">
                        <BackButton2 className="me-2" /><h2 className="page-title fw-bold mb-0">My Cart</h2>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8}>
                        <Formik
                            initialValues={{
                                quantity: 1, // Default value set to 1
                            }}
                            // validationSchema={ProductValidation}

                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                setFieldValue,
                            }) => {
                                const increaseValue = async (product_id, quantity, price) => {

                                    // setFieldValue('quantity', Number(values.quantity) + 1);
                                    try {
                                        console.log(product_id);
                                        const response = await post(`/user/cart/create`, { product_id, price, quantity: 1 });

                                        if (response.status) {
                                            showToast("Cart updated", "success");
                                            fetchData();
                                        } else {
                                            showToast("Something went wrong", "error");
                                        }


                                    } catch (error) {
                                        console.log("Update cart error: ", error);
                                    }
                                };

                                const decreaseValue = async (product_id, quantity, price) => {
                                    if (quantity > 0) {
                                        // setFieldValue('quantity', Number(values.quantity) - 1);
                                        try {

                                            const response = await post(`/user/cart/create`, { product_id, price, quantity: -1 });

                                            if (response.status) {
                                                showToast("Cart updated", "success");
                                                fetchData();
                                            } else {
                                                showToast("Something went wrong", "error");
                                            }


                                        } catch (error) {
                                            console.log("Update cart error: ", error);
                                        }
                                    }
                                };
                                const removeItem = async (id) => {

                                    try {

                                        const response = await post(`/user/cart/delete-item/${id}`);

                                        if (response.status) {
                                            showToast("Item removed", "success");
                                            fetchData();
                                        } else {
                                            showToast("Something went wrong", "error");
                                        }

                                    } catch (error) {
                                        console.log("Remove item error: ", error);

                                    }

                                }
                                return (
                                    <>
                                        <Form>
                                            <Table responsive className='table-cart'>
                                                <thead>
                                                    <tr>
                                                        <th className="product-remove"><span className="d-none">Remove item</span></th>
                                                        <th className="product-thumbnail"><span className="d-none">Thumbnail image</span></th>
                                                        <th className="product-name">Product</th>
                                                        <th className="product-name">Delivery Type</th>
                                                        <th className="product-price">Price</th>
                                                        <th className="product-quantity">Quantity</th>
                                                        <th className="product-subtotal">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartData?.products?.map((item, index) => (
                                                        <tr className="cart-item">
                                                            <td className="product-remove">
                                                                <a href="#" className="remove" onClick={() => { removeItem(item?.id) }}>×</a>
                                                            </td>
                                                            <td className="product-thumbnail">
                                                                <a className="img-box" href="#">
                                                                    <img alt="img-product" src={item?.media?.[0]?.media_path} />
                                                                </a>
                                                            </td>
                                                            <td className="product-name" cart-data-title="Product">
                                                                <a className="cart-title" href="#">{item?.name}</a>
                                                                <div className="cart-meta-category">{item?.category?.category_title}</div>
                                                            </td>
                                                            <td className="product-price" cart-data-title="Price">
                                                                <div className="cart-price">{item?.delivery_type}</div>
                                                            </td>
                                                            <td className="product-price" cart-data-title="Price">
                                                                <div className="cart-price">${item?.price}</div>
                                                            </td>
                                                            <td className="product-quantity" cart-data-title="Quantity">
                                                                <div className="quantity-picker">
                                                                    <span className="btn-quantity minus-btn" onClick={() => { decreaseValue(item?.product_id, item?.quantity - 1, item?.price) }}>-</span>
                                                                    <Field
                                                                        name="quantity"
                                                                        type="number"
                                                                        className="form-control"
                                                                        value={item?.quantity}
                                                                        onChange={handleChange}
                                                                        min="1"
                                                                    />
                                                                    <span className="btn-quantity plus-btn" onClick={() => { increaseValue(item?.product_id, item?.quantity + 1, item?.price) }}>+</span>
                                                                </div>
                                                                {/* {touched.product_quantity && errors.product_quantity && (
                            <div className="text-danger">{errors.product_quantity}</div>
                          )} */}
                                                            </td>
                                                            <td className="product-total" cart-data-title="Total">
                                                                <div className="cart-total">${item?.total_price}</div>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </Table>
                                        </Form>
                                    </>
                                );
                            }}
                        </Formik>
                    </Col>

                    <Col lg={4}>
                        <div className="cart-checkout">
                            <div className="checkout-item sub-total">
                                <h3 className="item-title">Subtotal</h3>
                                <span className="item-value">${cartData?.subtotal}</span>
                            </div>
                            <div className="checkout-item delivery-charges">
                                <h3 className="item-title">Delivery Charges</h3>
                                <span className="item-value">${cartData?.delivery_charges}</span>
                            </div>
                            <div className="checkout-item cart-total">
                                <h3 className="item-title">Total</h3>
                                <span className="item-value">${cartData?.total}</span>
                            </div>
                            <div className="checkout-buttons d-flex gap-3 px-lg-3">
                                {

                                    cartData?.products?.length > 0 && <CustomButton
                                        variant="btn-primary"
                                        className="btn"
                                        onClick={() => navigate('/checkout')}
                                    >
                                        Checkout
                                    </CustomButton>

                                }

                                {/* <CustomButton
                                    variant="btn-outline-primary"
                                    className="btn"
                                    onClick={() => navigate('/')}
                                >
                                    Continue Shopping
                                </CustomButton> */}
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </section>
    )
}

export default Cart
