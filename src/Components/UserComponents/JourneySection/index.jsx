import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { images } from '../../../Assets'
import "./style.css"

const JourneySection = () => {
  return (
    <section className={`section journey-sec`}>
  <Container fluid>
    <Row>
      <Col xs={12} lg={6} className='mb-3 mb-lg-0'>
        <div className="pe-xxl-5 me-xxl-5">
          <h2 className="section-title fw-bold mt-3 mt-lg-0 mb-3 mb-xl-4 text-capitalize"
          data-aos="fade-up"
          >
            Your journey to  emotional well-being{" "}
          </h2>
          <p
          data-aos="fade-up"
          >
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining
            essentially unchanged.
          </p>
        </div>
      </Col>
      <Col xs={12} md={12} lg={6} className="align-self-center">
        <Row>
          <Col xs={12} lg={6} className='mb-4 mb-lg-0'
          data-aos="fade-right"
          >
            <Card className="journey-card border-0">
              <Card.Img variant="top" src={images.journeyImg1} />
              <Card.Body className="position-relative p-0 mt-3 pb-2 px-2">
                <Card.Title className="mb-3">
                  The role of therapy in mental wellness
                </Card.Title>
                <Card.Link href="#">Read More</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={6} className='mb-4 mb-lg-0'
          data-aos="fade-left">
            <Card className="journey-card border-0">
              <Card.Img variant="top" src={images.journeyImg2} />
              <Card.Body className="position-relative p-0 mt-3 pb-2 px-2">
                <Card.Title className="mb-3">
                  The role of therapy in mental wellness
                </Card.Title>
                <Card.Link href="#">Read More</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="ps-xl-2 ps-xxl-4 pe-xxl-2"></div>
      </Col>
    </Row>
  </Container>
</section>
  )
}

export default JourneySection

