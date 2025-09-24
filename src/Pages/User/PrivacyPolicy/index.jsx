import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import PageHeader from "../../../Components/Common/PageHeader";
import LoadingSpinner from "../../../Components/Common/Loader";
import { useShopInformation } from "../../../Hooks/useShopInformation";

const PrivacyPolicy = () => {
  const breadcrumbPaths = [["Home", "/"], ["Privacy Policy"]];
  const { data: shopInfo, isLoading, error } = useShopInformation();

  const policyHtml = shopInfo?.privacy_policy?.trim();

  let content;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (error) {
    content = (
      <p className="text-danger mb-0">
        Unable to load the privacy policy right now. Please try again later.
      </p>
    );
  } else if (policyHtml) {
    content = (
      <div
        className="rich-text-content"
        dangerouslySetInnerHTML={{ __html: policyHtml }}
      />
    );
  } else {
    content = (
      <p className="text-muted mb-0">
        Privacy policy details will be available soon.
      </p>
    );
  }

  return (
    <>
      <PageHeader
        pageHeading="Privacy Policy"
        breadcrumb
        breadcrumbPaths={breadcrumbPaths}
      />
      <section className="page-content privacy-policy-page">
        <Container fluid>
          <Row>
            <Col xs={12}>{content}</Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PrivacyPolicy;
