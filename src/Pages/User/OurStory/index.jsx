import React from 'react'
import "./style.css"
import { Col, Container, Row } from 'react-bootstrap'
import PageHeader from '../../../Components/Common/PageHeader';

const OurStory = () => {
  const breadcrumbPaths = [["Home", "/"], ["Our Story"]];

  return (
    <>
    <PageHeader
      pageHeading="Our Story"
      breadcrumb={true}
      breadcrumbPaths={breadcrumbPaths}
    />
    <section className="page-content our-story-page">
      <Container fluid>
        <Row>
          <Col xs={12}>
            <h1>Our Story</h1>
          </Col>
        </Row>
      </Container>
    </section>
  </>
  ) 
}

export default OurStory