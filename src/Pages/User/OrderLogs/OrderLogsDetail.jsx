import React, { useEffect, useState } from 'react'
import { images } from '../../../Assets'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import { useFormStatus } from '../../../Hooks/useFormStatus'
import { orderLogsData, productData } from '../../../Config/data'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CustomButton from '../../../Components/CustomButton'
import BackButton2 from '../../../Components/BackButton/BackButton2'
import { dateFormat, usePageTitle } from '../../../Utils/helper'
import CustomModal from '../../../Components/CustomModal'
import { addOtpSchema, ratingValidationSchema } from '../../../Config/Validations'
import CustomInput from '../../../Components/CustomInput'
import Rating from "react-rating";
import { FaRegStar, FaStar } from 'react-icons/fa6'
import withModal from '../../../HOC/withModal'
import "./style.css"
import { getDetails, post } from '../../../Services/Api'

const OrderLogsDetail = ({ showModal }) => {
    usePageTitle("Order Details", true);

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [ratingModal, setRatingModal] = useState(false);
    const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
    const [rating, setRating] = useState(0); // State to store the rating value
    const [ratingProduct, setRatingProduct] = useState();

    const fetchlogs = async () => {
        // const response = orderLogsData.detail.data.find((e) => e.id === Number(id));
        const response = await getDetails(`/user/order/${id}/details`);
        // const response = await getDetails(`/admin-api/users/${id}`);
        if (response) {
            setData(response);
        }
    };
    useEffect(() => {
        fetchlogs();
    }, [id]);

    const handleRatingModal = async (productId) => {
        // console.log(productId);
        setRatingProduct(productId);
        setRatingModal(true);
    };

    const handleSubmit = async (values) => {
        startSubmitting();

        const updatedPayload = {
            rateable_type: "App\\Models\\Product",
            rateable_id: ratingProduct,
            rating: values?.rating,
            review: values?.review_text
        };

        try {

            const response = await post('/user/post-review', updatedPayload);

            if (response?.message == 'Review submitted successfully.') {
                setRatingModal(false);
                await updateReview("Approved", ratingProduct);
            } else {
                console.log("Error in posting review: ", response);
            }


        } catch (error) {
            console.log("Error in posting review: ", error);
        }

        // console.log("Review:", values);


        // setRatingModal(false);
        // await updateReview("Approved", 13);
        stopSubmitting();
    }
    const updateReview = async (status, id) => {
        showModal(
            `successful`,
            `Review has been submitted`,
            null,
            true
        );
    };
    const handleRatingChange = (value, setFieldValue) => {
        setRating(value); // Update the local rating state
        setFieldValue("rating", value); // Update the rating value in Formik's form values
        console.log("Selected Rating:", value); // Log the selected rating
    };

    return (
        <>
            <section className='page-content order-detail'>
                <Container fluid>
                    <Row>
                        <Col sm={12} className="d-flex align-items-center mb-4 mb-xxl-5">
                            <div className="flex-grow-1 d-flex align-items-center">
                                <BackButton2 className="me-2" /><h2 className="page-title fw-bold mb-0">Order Details</h2>
                            </div>
                            <div className="flex-shrink-0">
                                <div className={`status-rounded text-capitalize ${data?.order?.status?.toLowerCase() == "delivered" ? 'bg-green' :
                                    data?.order?.status?.toLowerCase() == "cancelled" ? 'bg-red' :
                                        data?.order?.status?.toLowerCase() == "pending" ? 'bg-yellow'
                                            : ''}`}
                                >
                                    {data?.order?.status}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={8}>
                            <Row>
                                <Col xs={12} sm={6} md={4} lg={3} xxl={3} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                    <h5 className="mb-2 fw-semibold">Order ID</h5>
                                    <p className="fw-normal">#{data?.order?.order_id}</p>
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={3} xxl={3} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                    <h5 className="mb-2 fw-semibold">Order Date:</h5>
                                    <p className="fw-normal">{dateFormat(data?.order?.created_at)}</p>
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={3} xxl={3} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                    <h5 className="mb-2 fw-semibold">Shop Name</h5>
                                    <p className="fw-normal">{data?.order?.shop?.name}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <Table responsive className='table-cart'>
                                        <thead>
                                            <tr>
                                                {/* <th className="product-remove"><span className="d-none">Remove item</span></th> */}
                                                <th className="product-thumbnail"><span className="d-none">Thumbnail image</span></th>
                                                <th className="product-name">Product</th>
                                                <th className="product-price">Delivery Type</th>
                                                <th className="product-price">Price</th>
                                                <th className="product-quantity">Quantity</th>
                                                <th className="product-subtotal">Total</th>
                                                {data?.order?.status?.toLowerCase() == "delivered" && (
                                                    <th className="product-subtotal">Rating</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {console.log(data?.order?.details)} */}
                                            {data?.order?.details?.map((item, index) => (
                                                <tr className="cart-item">
                                                    {/* <td className="product-remove">
                                                    <a href="#" className="remove">×</a>
                                                </td> */}
                                                    <td className="product-thumbnail">
                                                        <a className="img-box">
                                                            <img alt="img-product" src={item?.product?.medias?.[0]?.media_path} />
                                                        </a>
                                                    </td>
                                                    <td className="product-name" cart-data-title="Product">
                                                        <a className="cart-title">{item?.product?.title}</a>
                                                        <div className="cart-meta-category">{item?.product?.category?.category_title}</div>
                                                    </td>
                                                    <td className="product-price" cart-data-title="Price">
                                                        <div className="cart-price">{item?.product?.delivery_option}</div>
                                                    </td>
                                                    <td className="product-price" cart-data-title="Price">
                                                        <div className="cart-price">${item?.price}</div>
                                                    </td>
                                                    <td className="product-quantity" cart-data-title="Quantity">
                                                        {item?.quantity}
                                                    </td>
                                                    <td className="product-total" cart-data-title="Total">
                                                        <div className="cart-total">${item?.total}</div>
                                                    </td>
                                                    {data?.order?.status?.toLowerCase() == "delivered" && (
                                                        <td className="product-rating">
                                                            <Link onClick={() => { handleRatingModal(item?.product?.id) }}>Rate Product</Link>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}

                                            {/* <tr className="cart-item">
                                                <td className="product-remove">
                                                    <a href="#" className="remove">×</a>
                                                </td>
                                                <td className="product-thumbnail">
                                                    <a className="img-box" href="/product-detail/30">
                                                        <img alt="img-product" src={images.productImage} />
                                                    </a>
                                                </td>
                                                <td className="product-name" cart-data-title="Product">
                                                    <a className="cart-title" href="/product-detail/30">Cotton jersey top</a>
                                                    <div className="cart-meta-category">Abc  Category</div>
                                                </td>
                                                <td className="product-price" cart-data-title="Price">
                                                    <div className="cart-price">$8.00</div>
                                                </td>
                                                <td className="product-quantity" cart-data-title="Quantity">
                                                </td>
                                                <td className="product-total" cart-data-title="Total">
                                                    <div className="cart-total">$8.00</div>
                                                </td>
                                                {data.status?.toLowerCase() == "delivered" && (
                                                    <td className="product-rating">
                                                        <Link onClick={handleRatingModal}>Rate Product</Link>
                                                    </td>
                                                )}
                                            </tr> */}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Col>

                        <Col lg={4}>
                            <div className="cart-checkout">
                                <div className="checkout-item sub-total">
                                    <h3 className="item-title">Subtotal</h3>
                                    <span className="item-value">${data?.order?.sub_total}</span>
                                </div>
                                <div className="checkout-item delivery-charges">
                                    <h3 className="item-title">Delivery Charges</h3>
                                    <span className="item-value">${data?.order?.delivery_charges}</span>
                                </div>
                                <div className="checkout-item cart-total">
                                    <h3 className="item-title">Total</h3>
                                    <span className="item-value">${data?.order?.total}</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} lg={10}>
                            {data?.order?.addresses?.[0] && (
                                <>
                                    <Row className='mt-3'>
                                        <Col xs={12}>
                                            <h4 className='fw-bold text-black mb-4'>Contact Information</h4>
                                        </Col>

                                        <Col xs={12} sm={6} md={4} lg={3} xxl={3} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">User Name</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[0]?.first_name + " " + data?.order?.addresses?.[0]?.last_name}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={3} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Phone  Number</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[0]?.phone}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={3} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Email</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[0]?.email ?? "-"}</p>
                                        </Col>
                                    </Row>
                                </>
                            )}
                            {data?.order?.addresses?.[1] && (
                                <>
                                    <Row className='mt-3'>
                                        <Col xs={12}>
                                            <h4 className='fw-bold text-black mb-4'>Shipping Address</h4>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">User Name</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.first_name + " " + data?.order?.addresses?.[1]?.last_name}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Phone Number</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.phone}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Address:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.address}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Country:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.country}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">State:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.state}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">City:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.city}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Zip Code:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.zip_code}</p>
                                        </Col>
                                    </Row>
                                </>
                            )}
                            {data?.order?.addresses?.[2] ? (
                                <>
                                    <Row className='mt-3'>
                                        <Col xs={12}>
                                            <h4 className="fw-bold text-black mb-4">Billing Address</h4>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">User Name</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[2]?.first_name + " " + data?.order?.addresses?.[2]?.last_name}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Phone  Number</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[2]?.phone}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Address:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[2]?.address}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Country:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[2]?.country}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">State:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[2]?.state}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">City:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[2]?.city}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Zip Code:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[2]?.zip_code}</p>
                                        </Col>
                                    </Row>
                                </>
                            ) : (

                                <>
                                    <Row className='mt-3'>
                                        <Col xs={12}>
                                            <h4 className="fw-bold text-black mb-4">Billing Address</h4>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">User Name</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.first_name + " " + data?.order?.addresses?.[1]?.last_name}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Phone  Number</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.phone}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Address:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.address}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Country:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.country}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">State:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.state}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">City:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.city}</p>
                                        </Col>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Zip Code:</h5>
                                            <p className="fw-normal">{data?.order?.addresses?.[1]?.zip_code}</p>
                                        </Col>
                                    </Row>
                                </>
                            )}

                            {
                                data?.order?.cancellation_reason ? (
                                    <Row>
                                        <Col xs={12} sm={6} md={4} lg={3} xxl={4} className="mb-2 mb-md-3 mb-lg-3 mb-xxl-4 detail-card">
                                            <h5 className="mb-2 fw-semibold">Cancellation Reason:</h5>
                                            <p className="fw-normal">{data?.order?.cancellation_reason}</p>
                                        </Col>
                                    </Row>
                                ) : null
                            }


                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Rating Modal */}
            <CustomModal
                show={ratingModal}
                hideClose={false}
                close={() => {
                    setRatingModal(false);
                }}
                className="rating-modal"
            >
                <Formik
                    initialValues={{
                        review_text: "",
                        rating: 0, // Initialize rating in form values
                    }}
                    validationSchema={ratingValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <h4 className="modalHeading text-start">Rate Product</h4>
                            <div className="mb-3">
                                <Rating
                                    className="rating-star"
                                    emptySymbol={<FaRegStar color="#E9D225" size={24} />}
                                    fullSymbol={<FaStar size={24} color="#E9D225" />}
                                    initialRating={values.rating} // Bind the rating to Formik's values
                                    onChange={(value) => handleRatingChange(value, setFieldValue)} // Update both state and Formik value
                                />
                                {errors.rating && touched.rating && (
                                    <div className="text-danger">{errors.rating}</div> // Show error message for rating
                                )}
                            </div>
                            <div className="mb-3">
                                <CustomInput
                                    type="textarea"
                                    required
                                    placeholder="Write Review"
                                    inputclass="mainInput"
                                    id="review_text"
                                    rows="5"
                                    value={values.review_text}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.review_text && errors.review_text}
                                />
                            </div>
                            <div className="text-center">
                                <CustomButton
                                    variant="btn-user-primary"
                                    className="btn-user"
                                    text="Submit"
                                    loadingText="Submitting..."
                                    isPending={isSubmitting}
                                    type="submit"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </CustomModal>
        </>
    )
}

export default withModal(OrderLogsDetail)
