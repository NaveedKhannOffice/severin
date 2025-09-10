import { React, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { fullName, usePageTitle } from "../../../Utils/helper";
import CustomButton from "../../../Components/CustomButton";
import { useAuth } from "../../../Hooks/useAuth";
import { getCountryFlag } from "../../../Utils/helper";
import "./style.css";
import withModal from "../../../HOC/withModal";
import { useLogout } from "../../../Services/Auth";
import { images } from "../../../Assets";
import { post } from "../../../Services/Api";

const UserProfile = ({ showModal, props }) => {
  usePageTitle("My Profile", true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState();
  const handleLogout = useLogout();

  useEffect(() => {
    setProfilePic(user.photo);
  }, []);

  const handleAcountDelete = async (values) => {
    showModal(
      "Delete Account",
      `Are you sure you want to delete your account?`,
      // null,
      () => deleteAccount()
    );
  };

  const deleteAccount = async (values) => {
    try {
      const response = await post("/service-provider/delete-account");
      if (response.message == "Account deleted successfully") {
        await handleLogout();
        showModal(
          "successful",
          `Account deleted Successfuly`,
          // null,
          () => navigate(`/login`),
          true
        );
      } else {
        showModal("successful", response.message, null, true);
      }
    } catch (error) {
      console.error("Error delete account:", error);
    }
  };

  return (
    <section className="page-content profile-page">
      <Container fluid>
        <Row>
          <Col
            sm={12}
            className="gap-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 mb-lg-4"
          >
            <h2 className="page-title fw-bold">My Profile</h2>
            {/* <Link className="btn btn-primary" to="/subscriptions/subscriptions-logs/">Delete Account</Link> */}
            <button className="btn btn-primary" onClick={handleAcountDelete}>
              Delete Account
            </button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={10} className="mx-auto">
            <div className="profile-card">
              <div className="px-lg-4 px-xxl-5">
                {user ? (
                  <>
                    <Row>
                      <Col
                        xs={12}
                        className="d-flex justify-content-center mb-3 mb-lg-4 mb-xxl-5"
                      >
                        <div className="profile-image">
                          <img
                            src={profilePic ?? images.userImage}
                            alt="User"
                          />
                        </div>
                      </Col>
                      <Col xs={12} lg={4} className="mb-3 mb-lg-4 mb-xxl-5">
                        <h5 className="mb-0 fw-medium text-capitalize mb-2">
                          user Name:
                        </h5>
                        <p className="text-black text-capitalize fw-semibold">
                          {fullName(user)}
                        </p>
                      </Col>
                      <Col xs={12} lg={4} className="mb-3 mb-lg-4 mb-xxl-5">
                        <h5 className="mb-0 fw-medium text-capitalize mb-2">
                          Email Address:
                        </h5>
                        <p className="text-black fw-semibold">{user?.email}</p>
                      </Col>
                      <Col xs={12} lg={4} className="mb-3 mb-lg-4 mb-xxl-5">
                        <h5 className="mb-0 fw-medium text-capitalize mb-2">
                          Phone no:
                        </h5>
                        <p className="text-black text-capitalize fw-semibold">
                          <span className="me-1">
                            {getCountryFlag(
                              !user?.dialing_code
                                ? user?.phone
                                : user?.dialing_code + user?.phone
                            ) ?? "N/a"}
                          </span>
                          {user?.phone}
                        </p>
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                      <Col xs={12} lg={4} className="mb-3 mb-lg-4 mb-xxl-5">
                        <h5 className="mb-0 fw-medium text-capitalize mb-2">
                          Language
                        </h5>
                        <p className="text-black text-capitalize fw-semibold">
                          {user?.language ?? "N/a"}
                        </p>
                      </Col>
                      <Col xs={12} lg={4} className="mb-3 mb-lg-4 mb-xxl-5">
                        <h5 className="mb-0 fw-medium text-capitalize mb-2">
                          Your Relationship
                        </h5>
                        <p className="text-black text-capitalize fw-semibold">
                          {user?.relation ?? "N/a"}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        xs={12}
                        className="d-flex gap-3 flex-wrap justify-content-center"
                      >
                        <CustomButton
                          type="button"
                          variant="btn btn-primary px-0"
                          className="px-5"
                          text="Edit Profile"
                          onClick={() => {
                            navigate("/edit-profile");
                          }}
                        />
                        <CustomButton
                          type="button"
                          className="btn btn-outline-primary px-0"
                          text="Change Password"
                          onClick={() => {
                            navigate("/change-password");
                          }}
                        />
                      </Col>
                    </Row>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

// export default UserProfile
export default withModal(UserProfile);
