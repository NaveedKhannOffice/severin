// src/Pages/User/Home/OurStorySection/index.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import { images } from "../../../../Assets";

const OurStorySection = ({ data, loading, error }) => {
  if (loading) {
    return (
      <section className="our-story-section">
        <Container fluid>
          <Row>
            <Col xs={12} className="text-center">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="our-story-section">
        <Container fluid>
          <Row>
            <Col xs={12} className="text-center">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  // Default data if API doesn't return data
  const storyData = data ;

  return (
    <section className="our-story-section">
      <div className="story-background">
        <img
          src={storyData.backgroundImage}
          alt="Our Story Background"
          className="story-bg-image"
        />
      </div>

      <Container fluid className="mw-100">
        <Row className="align-items-center justify-content-end">
          <Col lg={5} md={6} className="story-content-col">
            <div className="story-content">
              <div className="story-text">
                <h2 className="story-title">
                  <span className="d-block">{storyData.title}</span>
                  {storyData.subtitle}
                </h2>
                <p className="story-description">{storyData.description}</p>

                <div className="story-actions">
                  <Link to={storyData.buttonLink} className="btn btn-primary">Our Story</Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OurStorySection;
