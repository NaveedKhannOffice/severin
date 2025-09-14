import React from 'react'
import "./style.css"
import { Col, Container, Row } from 'react-bootstrap'
import PageHeader from '../../../Components/Common/PageHeader';

const Faqs = () => {
  const breadcrumbPaths = [["Home", "/"], ["Faqs"]];

  return (
    <>
    <PageHeader
      pageHeading="FAQ'S"
      breadcrumb={true}
      breadcrumbPaths={breadcrumbPaths}
    />
    <section className="page-content faqs-page">
      <Container fluid>
        <Row>
          <Col xs={12}>
            <h1>Faqs</h1>
          </Col>
        </Row>
      </Container>
    </section>
  </>
  ) 
}

export default Faqs