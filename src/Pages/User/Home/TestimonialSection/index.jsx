// src/Components/UserComponents/TestimonialSection/index.jsx
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const TestimonialSection = ({ data, loading, error }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Use data from props instead of internal state
  const testimonials = data || [];

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    // prevArrow: <CustomPrevArrow />,
    // nextArrow: <CustomNextArrow />,
    centerPadding: "200px",
  };

  // Custom arrow components
  function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
      <button
        className="testimonial-nav-btn testimonial-nav-prev"
        onClick={onClick}
        aria-label="Previous testimonial"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    );
  }

  function CustomNextArrow(props) {
    const { onClick } = props;
    return (
      <button
        className="testimonial-nav-btn testimonial-nav-next"
        onClick={onClick}
        aria-label="Next testimonial"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    );
  }

  // Handle share experience
  const handleShareExperience = () => {
    console.log("Share experience clicked");
    // Implement share experience functionality
  };

  if (loading) {
    return (
      <section className="testimonial-section">
        <Container fluid>
          <Row>
            <Col xs={12} className="text-center">
              <div className="spinner-border" role="status">
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
      <section className="testimonial-section">
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

  return (
    <section className="testimonial-section">
      <Container fluid>
        <Row>
          <Col xs={12}>
            <div className="testimonial-container">
              {/* Section Title */}
              <h2 className="section-title text-center mb-4 pb-3">
                What Our Clients Say
              </h2>

              {/* Testimonial Slider */}
              <div className="testimonial-slider-wrapper">
                <Slider {...sliderSettings}>
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial-slide">
                      <div className="testimonial-content">
                        {/* Opening Quote
                        <div className="quote-mark quote-mark-left">
                          <FontAwesomeIcon icon={faQuoteLeft} />
                        </div> */}

                        {/* Testimonial Text */}
                        <blockquote className="testimonial-text">
                          {testimonial.text}
                        </blockquote>

                        {/* Closing Quote
                        <div className="quote-mark quote-mark-right">
                          <FontAwesomeIcon icon={faQuoteRight} />
                        </div> */}

                        {/* Author Info */}
                        <div className="testimonial-author">
                          <span className="author-name">
                            {testimonial.author} - {testimonial.product}
                          </span>
                        </div>

                        {/* Rating
                        <div className="testimonial-rating">
                          {[...Array(5)].map((_, index) => (
                            <span
                              key={index}
                              className={`star ${
                                index < testimonial.rating ? "filled" : ""
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div> */}
                      </div>
                    </div>
                  ))}
                </Slider>

                {/* Navigation Arrows */}
                {/* <div className="testimonial-navigation">
                  <CustomPrevArrow />
                  <CustomNextArrow />
                </div> */}
              </div>

              {/* Share Experience Link */}
              <div className="testimonial-actions text-center">
                <button
                  className="btn btn-link"
                  onClick={handleShareExperience}
                >
                  Share Your Experience
                </button>
              </div>

              {/* Slide Indicators */}
              {/* <div className="testimonial-indicators">
                {testimonials.map((_, index) => (
                  <span
                    key={index}
                    className={`indicator ${
                      index === currentSlide ? "active" : ""
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialSection;
