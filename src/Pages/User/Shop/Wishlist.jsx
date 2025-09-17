import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { images } from "../../../Assets";
import "./style.css";
import CustomFilters from "../../../Components/CustomFilters";
import CustomButton from "../../../Components/Common/CustomButton";
import { wishListData } from "../../../Config/data";
import { normalStatus } from "../../../Config/TableStatus";
import withFilters from "../../../HOC/withFilters";
import ServicesCard from "../../../Components/UserComponents/ServicesCard";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import CustomPagination from "../../../Components/CustomPagination";
import { usePageTitle } from "../../../Utils/helper";
import GeneralCard from "../../../Components/UserComponents/GeneralCard";
import { getAll, post } from "../../../Services/Api";

const Wishlist = ({ filters, setFilters, pagination, updatePagination }) => {
  usePageTitle("All Services", true);

  const [wishList, setWishList] = useState([]); // Initialize as an array
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const fetchBookings = async () => {
    try {
      startSubmitting(true);
      // const response = wishListData;
      const response = await getAll(
        `/user/wishlist?type=App\\Models\\Service`,
        filters
      );
      if (response) {
        const { data, total, per_page, current_page, to } = response;
        setWishList(data);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      stopSubmitting(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filters]);

  const handleToggleWishList = async (id) => {
    // Find the current item based on the ID
    try {
      let response = await post(`/user/wishlist/add`, {
        wishlistable_id: id,
        wishlistable_type: `App\\Models\\Service`,
      });
      fetchBookings();
      // console.log(response);
      // const currentItem = wishList.find((item) => item?.wishlistable.id === id);
      // // Toggle the wishList state
      // const updatedWishListState = !currentItem?.wishlistable?.is_wishlisted;

      // // Update the videoData state
      // setWishList((prevData) =>
      //     prevData.map((item) =>
      //         item?.wishlistable?.id === id ? { ...item, is_wishlisted: updatedWishListState } : item
      //     )
      // );
    } catch (error) {
      console.log("Add Wishlist error", error);
    }
  };

  return (
    <>
      <section className="page-content all-services">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <div className="d-flex service-header mb-3 mb-xl-4 mb-xxl-5">
                <div className="flex-shrink-0 align-self-center">
                  <h2 className="fw-bold mb-0 page-title">Wishlist</h2>
                </div>
                <div className="flex-grow-1 d-flex justify-content-end gap-3">
                  <CustomFilters
                    filters={filters}
                    setFilters={setFilters}
                    showEntries={false}
                    showFilter={false}
                    // selectOptions={props?.selectOptions}
                    // dateFilters={props?.dateFilters}
                    dateFilters={[
                      {
                        title: "Registration Date",
                        from: "from",
                        to: "to",
                      },
                    ]}
                    selectOptions={[
                      {
                        title: "Status",
                        options: normalStatus,
                      },
                    ]}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            {wishList?.map((item, index) => (
              <Col
                xs={12}
                lg={3}
                xl={4}
                key={index}
                className="mb-3 mb-xl-4 mb-xxl-5"
              >
                <GeneralCard
                  data={item?.wishlistable}
                  serviceCard={true}
                  showWishList={true}
                  // showReviews={true}
                  isWishListed={item?.wishlistable?.is_wishlisted}
                  linkPath="/services"
                  toggleWishList={() =>
                    handleToggleWishList(item?.wishlistable?.id)
                  }
                />
              </Col>
            ))}
          </Row>
          <CustomPagination
            pagination={pagination}
            setFilters={setFilters}

            // showingItem={props.showingItem}
            // totalItems={props.totalItems}
            // currentPage={props.currentPage}
            // totalPages={props.totalPages}
            // setCurrentPage={props.setCurrentPage}
          />
        </Container>
      </section>
    </>
  );
};

// export default Services
export default withFilters(Wishlist);
