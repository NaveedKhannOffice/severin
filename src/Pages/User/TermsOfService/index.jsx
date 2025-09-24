import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import PageHeader from "../../../Components/Common/PageHeader";
import LoadingSpinner from "../../../Components/Common/Loader";
import { useShopInformation } from "../../../Hooks/useShopInformation";

const TermsOfService = () => {
  const breadcrumbPaths = [["Home", "/"], ["Terms of Service"]];
  const { data: shopInfo, isLoading, error } = useShopInformation();

  const termsHtml = shopInfo?.terms_of_service?.trim();

  let content;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (error) {
    content = (
      <p className="text-danger mb-0">
        Unable to load the terms of service right now. Please try again later.
      </p>
    );
  } else if (termsHtml) {
    content = (
      <div
        className="rich-text-content"
        dangerouslySetInnerHTML={{ __html: termsHtml }}
      />
    );
  } else {
    content = (
      <p className="text-muted mb-0">
        Terms of service details will be available soon.
      </p>
    );
  }

  return (
    <>
      <PageHeader
        pageHeading="Terms of Service"
        breadcrumb
        breadcrumbPaths={breadcrumbPaths}
      />
      <section className="page-content terms-of-service-page">
        <Container fluid>
          <Row>
            <Col xs={12}>{content}</Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TermsOfService;
