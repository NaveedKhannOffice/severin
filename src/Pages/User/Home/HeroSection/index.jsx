// src/Pages/User/Home/HeroSection/index.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import { images } from "../../../../Assets";

const HeroSection = ({ data, loading, error }) => {
  if (loading) {
    return (
      <section className="hero-section">
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
      <section className="hero-section">
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
  const heroData = data ;

  return (
    <section className="hero-section">
      <div className="hero-background">
        <img
          src={heroData.backgroundImage}
          alt="Bamboo Forest"
          className="hero-bg-image"
        />
      </div>

      <Container fluid className="mw-100">
        <Row className="align-items-center justify-content-end">
          <Col lg={5} md={6} className="hero-content-col">
            <div className="hero-content">
              <div className="hero-text">
                <h2 className="hero-title">
                  <span className="d-block">{heroData.title}</span>
                  {heroData.subtitle}
                </h2>
                <p className="hero-description">{heroData.description}</p>

                <div className="hero-actions">
                  <Link to={heroData.buttonLink} className="btn btn-primary">Our Story</Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
