import { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import ChangePasswordForm from "../../../Components/ChangePasswordForm";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import withModal from "../../../HOC/withModal";
import "./style.css";
import BackButton2 from "../../../Components/Common/BackButton/BackButton2";
import { showToast } from "../../../Components/Toast";
import { post } from "../../../Services/Api";

const UserChangePassword = ({ showModal }) => {
  const navigate = useNavigate();
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const [errorsData, setErrorsData] = useState({});

  const handleSubmit = async (values, { resetForm }) => {
    startSubmitting();

    // let response = await post("/admin-api/account/change-password", values);
    // if (response.status) {
    //   showModal(
    //     `Password changed successfully`,
    //     null,
    //     true,
    //     () => navigate(`/admin/profile`)
    //   );
    // } else {
    //   setErrorsData({ errors: "current_password" });
    // }
    const updatedValues = {
      old_password: values.current_password,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };

    try {
      const response = await post(`/user/change-password`, updatedValues);
      if (response.status) {
        showModal(
          "Successful",
          `password Has Been changed Successfully!`,
          () => navigate(-1),
          true
        );
        resetForm();
      } else {
        showToast(response?.message, "error");
      }
    } catch (error) {
      console.error("Error pushing notification:", error);
    }

    stopSubmitting();
  };
  return (
    <section className="page-content profile">
      <Container fluid>
        <Row>
          <Col
            sm={12}
            className="gap-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 mb-lg-4"
          >
            <h2 className="page-title fw-bold">
              <BackButton2 />
              Change password
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={10}>
            <div className="profile-card">
              <Row>
                <Col xs={12} lg={7} xxl={5}>
                  <ChangePasswordForm
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    errors={errorsData}
                    btnText="Change Password"
                    btnVariant="btn btn-primary"
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default withModal(UserChangePassword);
