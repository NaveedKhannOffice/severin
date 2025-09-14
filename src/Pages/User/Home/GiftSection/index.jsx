import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import "./styles.css"

const GiftSection = ({ title, description, giftImage }) => {
  return (
    <section className="section gift-sec">
      <Container fluid>
        <Row>
          <Col xs={12} xl={11} className='mx-auto'>
            <Row>    
              <Col xs={12} xl={8} className='align-self-center'>
                <h2 className="fw-normal mb-2 text-capitalize"
                data-aos="flip-up"
                data-aos-delay="150"
                >
                  {title}
                </h2>
                <div className="discription-wrapper">
                  <p>{description}</p>
                </div>  
              <Button className="btn btn-primary">Gift a Card</Button>
              </Col>
              <Col xs={12} xxl={4} className='align-self-end'>
                <img src={giftImage} alt="Gift Image" className="img-fluid" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GiftSection;
