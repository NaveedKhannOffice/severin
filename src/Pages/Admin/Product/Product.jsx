import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import ImageGallery from "../../../Components/ImageGallery/ImageGallery";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { productsData } from "../../../Config/data";
import { statusOptions } from "../../../Config/TableStatus";
import withModal from "../../../HOC/withModal";
import Styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import CustomButton from "../../../Components/Common/CustomButton";
import { isNullOrEmpty } from "../../../Utils/helper";
import { getDetails, post } from "../../../Services/Api";

const ProductDetails = ({ showModal }) => {
  const { productId } = useParams();

  const [productDetails, setProductDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [reviewsFilter, setReviewsFilter] = useState("All");
  const getproductDetails = async () => {
    const response = await getDetails(
      `/admin/providers/shop/product/${productId}`
    );
    if (response) {
      setProductDetails(response?.data);
    }
  };
  const getproductRatings = async () => {
    const response = await getDetails(
      `/admin/providers/shop/product/${productId}/ratings?ratingFilter=${reviewsFilter}`
    );
    if (response.status) {
      setReviews(response?.data);
    }
  };

  useEffect(() => {
    getproductDetails();
  }, [productId]);

  useEffect(() => {
    getproductRatings();

    setFilteredReviews(
      reviews.comments?.filter((c) => {
        if (reviewsFilter === "All") return c;
        else {
          return Number(c.rating) === Number(reviewsFilter);
        }
      })
    );
  }, [reviewsFilter]);

  // Handle status change
  const handleStatusChange = (e, id) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `${newStatusValue === "1" ? "Active" : "Inactive"} Product`,
      `Are you sure you want to ${
        newStatusValue === "1" ? "Activate" : "Inactivate"
      } this Product?`,
      () => onConfirmStatusChange(id, newStatusValue)
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChange = async (row, newStatusValue) => {
    // Update the status in the appointmentLogs state
    const response = await post(
      `/admin/providers/product/${row}/toggle-status`
    );
    if (response.status) {
      getproductDetails();
      showModal(
        "Successful",
        `This Product has been ${
          newStatusValue === "1" ? "Activated" : "Inactivated"
        } successfully!`,
        null,
        true
      );
    }
    setProductDetails({ ...productDetails, status_detail: newStatusValue });
  };

  if (isNullOrEmpty(productDetails)) {
    return (
      <DashboardLayout pageTitle="Product Details">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 ">
              <div className="row my-4">
                <div className="col-12 d-flex">
                  <BackButton />
                  <h2 className="mainTitle mb-0">Product Details</h2>
                </div>
              </div>
              <div className="dashCard ">
                <div className="row ">
                  <div className="col-12">loading...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Product Details">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="row my-4">
              <div className="col-12 d-flex">
                <BackButton />
                <h2 className="mainTitle mb-0">Product Details</h2>
              </div>
            </div>
            <div className="dashCard ">
              <div className="row ">
                <div className="col-12">
                  <div className="col-12 d-flex flex-column flex-sm-row mb-4 col-12  gap-3">
                    <h4 className="secondaryTitle">{productDetails?.title}</h4>
                    <div className="flex-grow-1 d-flex flex-column align-items-start align-items-sm-end justify-content-end justify-content-sm-start gap-3">
                      <div className="profile-status d-flex  align-items-end flex-column gap-3">
                        <div className="status-action">
                          <Select
                            className={`tabel-select status${productDetails?.status_detail}`}
                            id={`status${productDetails?.id}`}
                            name="status"
                            label="Status:"
                            value={productDetails?.status}
                            onChange={(e) =>
                              handleStatusChange(e, productDetails?.id)
                            }
                            isInputNeeded={false}
                          >
                            {statusOptions}
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      {productDetails?.medias?.length && (
                        <ImageGallery
                          images={productDetails.medias}
                          borderRadius={10}
                          fullWidth={true}
                          gap={4}
                        />
                      )}
                    </div>
                    <div className="col-md-10 mt-2">
                      <div className="my-4">
                        <h4 className="secondaryLabel">Description</h4>
                        <p className="secondaryText mb-0">
                          {productDetails.description}
                        </p>
                      </div>
                      <div className="row my-4">
                        {[
                          {
                            label: "Quantity",
                            value: productDetails?.quantity,
                          },
                          {
                            label: "Price",
                            value: "$" + productDetails?.price,
                          },
                          {
                            label: "Category",
                            value: productDetails?.category?.category_title,
                          },
                          {
                            label: "Product Type",
                            value: productDetails?.category?.type,
                          },
                        ].map(({ label, value }) => (
                          <div className="col-lg-4 col-md-6 mb-3" key={label}>
                            <h4 className="secondaryLabel">{label}</h4>
                            <p className="secondaryText wrapText mb-0">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashCard mt-4 mb-5">
              <div className="row mb-3">
                <div className="col-12">
                  <h2 className="secondaryTitle">Reviews</h2>
                </div>
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-4">
                  <div className="d-flex flex-column align-items-start">
                    <div className="d-flex gap-4 align-items-baseline">
                      <div>
                        <h2 className={`${Styles.rating} d-inline`}>
                          {productDetails.average_rating}
                        </h2>
                        <h4 className="d-inline">/5</h4>
                      </div>
                      <p className={Styles.totalReviewCount}>
                        {productDetails?.ratings?.length} Reviews
                      </p>
                    </div>
                    <Rating
                      className="mt-3"
                      emptySymbol={<FaRegStar color="#FFC83D" size={40} />}
                      fullSymbol={<FaStar size={40} color="#FFC83D" />}
                      initialRating={parseFloat(
                        productDetails.average_rating
                      ).toFixed(1)}
                      readonly
                    />
                  </div>

                  <div>
                    <div className="d-flex align-items-center gap-4 w-100">
                      <label htmlFor="rating1">
                        <p className={Styles.ratingBarNumber}>5 Star</p>
                      </label>
                      <div className={Styles.ratingBar}>
                        <ProgressBar
                          variant="warning"
                          now={
                            (productDetails.rating_5 /
                              productDetails?.ratings?.length) *
                            100
                          }
                        />
                      </div>
                      <p className={Styles.ratingBarNumber}>
                        {productDetails.rating_5}{" "}
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-4 w-100">
                      <label htmlFor="rating2">
                        <p className={Styles.ratingBarNumber}>4 Star</p>
                      </label>
                      <div className={Styles.ratingBar}>
                        <ProgressBar
                          variant="warning"
                          now={
                            (productDetails.rating_4 /
                              productDetails?.ratings?.length) *
                            100
                          }
                        />
                      </div>
                      <p className={Styles.ratingBarNumber}>
                        {productDetails.rating_4}
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-4 w-100">
                      <label htmlFor="rating3">
                        <p className={Styles.ratingBarNumber}>3 Star</p>
                      </label>
                      <div className={Styles.ratingBar}>
                        <ProgressBar
                          variant="warning"
                          now={
                            (productDetails.rating_3 /
                              productDetails?.ratings?.length) *
                            100
                          }
                        />
                      </div>
                      <p className={Styles.ratingBarNumber}>
                        {productDetails.rating_3}
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-4 w-100">
                      <label htmlFor="rating4">
                        <p className={Styles.ratingBarNumber}>2 Star</p>
                      </label>
                      <div className={Styles.ratingBar}>
                        <ProgressBar
                          variant="warning"
                          now={
                            (productDetails.rating_2 /
                              productDetails?.ratings?.length) *
                            100
                          }
                        />
                      </div>
                      <p className={Styles.ratingBarNumber}>
                        {productDetails.rating_2}
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-4 w-100">
                      <label htmlFor="rating5">
                        <p className={Styles.ratingBarNumber}>1 Star</p>
                      </label>
                      <div className={Styles.ratingBar}>
                        <ProgressBar
                          variant="warning"
                          now={
                            (productDetails.rating_1 /
                              productDetails?.ratings?.length) *
                            100
                          }
                        />
                      </div>
                      <p className={Styles.ratingBarNumber}>
                        {productDetails.rating_1}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3">
                  <div className="d-flex flex-wrap gap-3">
                    <CustomButton
                      onClick={() => {
                        setReviewsFilter("All");
                      }}
                      className={`site-btn ${
                        reviewsFilter === "All"
                          ? "primary-btn"
                          : "seconadry-btn"
                      } px-5 mb-2 mt-3`}
                      text="All"
                    />
                    <CustomButton
                      onClick={() => {
                        setReviewsFilter("5");
                      }}
                      className={`site-btn ${
                        reviewsFilter === "5" ? "primary-btn" : "seconadry-btn"
                      } px-5 mb-2 mt-3`}
                    >
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning" />
                        <p style={{ marginTop: 2 }} className="mb-0">
                          5
                        </p>
                      </div>
                    </CustomButton>
                    <CustomButton
                      onClick={() => {
                        setReviewsFilter("4");
                      }}
                      className={`site-btn ${
                        reviewsFilter === "4" ? "primary-btn" : "seconadry-btn"
                      } px-5 mb-2 mt-3`}
                    >
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning" />
                        <p style={{ marginTop: 2 }} className="mb-0">
                          4
                        </p>
                      </div>
                    </CustomButton>
                    <CustomButton
                      onClick={() => {
                        setReviewsFilter("3");
                      }}
                      className={`site-btn ${
                        reviewsFilter === "3" ? "primary-btn" : "seconadry-btn"
                      } px-5 mb-2 mt-3`}
                    >
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning" />
                        <p style={{ marginTop: 2 }} className="mb-0">
                          3
                        </p>
                      </div>
                    </CustomButton>
                    <CustomButton
                      onClick={() => {
                        setReviewsFilter("2");
                      }}
                      className={`site-btn ${
                        reviewsFilter === "2" ? "primary-btn" : "seconadry-btn"
                      } px-5 mb-2 mt-3`}
                    >
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning" />
                        <p style={{ marginTop: 2 }} className="mb-0">
                          2
                        </p>
                      </div>
                    </CustomButton>
                    <CustomButton
                      onClick={() => {
                        setReviewsFilter("1");
                      }}
                      className={`site-btn ${
                        reviewsFilter === "1" ? "primary-btn" : "seconadry-btn"
                      } px-5 mb-2 mt-3`}
                    >
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning" />
                        <p style={{ marginTop: 2 }} className="mb-0">
                          1
                        </p>
                      </div>
                    </CustomButton>
                  </div>
                  <hr style={{ color: "#bbb" }} className="my-5" />
                  {reviews?.length > 0 ? (
                    reviews?.map((data, i) => (
                      <div key={i} className="d-flex gap-3 mt-4">
                        <img
                          className={Styles.commentsProfilePicture}
                          src={data.user?.photo}
                          alt="user_photo"
                        />
                        <div className="d-flex flex-column flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <h6 className="mb-1">
                              {data.user?.first_name +
                                " " +
                                data?.user?.last_name}
                            </h6>
                            <p className="mb-0" style={{ color: "#ADB5BD" }}>
                              {data.created_at}
                            </p>
                          </div>
                          <div className="d-flex gap-1">
                            {Array.from({ length: data.rating }).map((_, j) => (
                              <FaStar
                                key={`${i}-${j}`}
                                className="text-warning"
                              />
                            ))}
                          </div>
                          <div className="mt-2">
                            <p>{data.review}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No {reviewsFilter} star review</p>
                  )}
                </div>
                <div className="col-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(ProductDetails);
