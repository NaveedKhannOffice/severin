import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import { images } from "../../../Assets";
import HeroSection from "./HeroSection";
import NewArrivalsSection from "./NewArrivalsSection";
import AimsSection from "./AimsSection";
import TestimonialSection from "./TestiminialSection";

import {
  homeBannerData,
  aimsData,
  testimonialResponse,
  productsData,
  newArrivalsData,
  heroData,
} from "../../../Config/data";
// import { fetchHeroDataAPI } from "../../../Config/heroData";
import { useAuth } from "../../../Hooks/useAuth";
import { getAll } from "../../../Services/Api";
import "./style.css";
import ProductSection from "./ProductSection";

const Home = () => {
  // Centralized state management
  const [homeData, setHomeData] = useState({
    homeBanner: [],
    hero: null,
    services: [],
    testimonials: [],
    newArrivals: [],
    products: [], // Add this line
    aims: [],
    loading: true,
    error: null,
  });

  const location = useLocation();
  const { token } = useAuth();
  const isProviderPath = location.pathname.includes("provider");
  const [bookings, setBookingData] = useState([]);
  const [counterData2, setCounterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topServiceProviders, setTopServiceProviders] = useState();

  const headerSliderSettings = {
    className: "center",
    centerMode: true,
    slidesToShow:
      topServiceProviders?.length < 3 ? topServiceProviders?.length : 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    centerPadding: topServiceProviders?.length === 1 ? "35%" : "100px",
    arrows: false,
    infinite: topServiceProviders?.length > 1, // Don't loop if only one slide
    responsive: [
      {
        breakpoint: 1667,
        settings: {
          slidesToShow:
            topServiceProviders?.length < 3 ? topServiceProviders?.length : 3,
          slidesToScroll: 1,
          centerPadding: topServiceProviders?.length === 1 ? "35%" : "100px",
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow:
            topServiceProviders?.length < 2 ? topServiceProviders?.length : 2,
          slidesToScroll: 1,
          centerPadding: topServiceProviders?.length === 1 ? "30%" : "100px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow:
            topServiceProviders?.length < 2 ? topServiceProviders?.length : 2,
          slidesToScroll: 1,
          centerPadding: topServiceProviders?.length === 1 ? "25%" : "30px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: topServiceProviders?.length > 1,
          centerPadding: topServiceProviders?.length === 1 ? "20%" : "0px",
        },
      },
    ],
  };

  // Centralized API call for all home data
  const fetchAllHomeData = async () => {
    try {
      setHomeData((prev) => ({ ...prev, loading: true, error: null }));

      // Parallel API calls for better performance
      const [
        homeBannerRes,
        newArrivalsRes,
        heroRes,
        productsRes,
        testimonialsRes,
        aimsRes,
      ] = await Promise.all([
        // getAll("/user/top-services"),
        // getAll("/user/new-arrivals"), // Your new arrivals API
        Promise.resolve(homeBannerData), // Wrap static data in Promise.resolve
        Promise.resolve(newArrivalsData), // Wrap static data in Promise.resolve
        Promise.resolve(heroData), // Wrap static data in Promise.resolve
        Promise.resolve(productsData), // Wrap static data in Promise.resolve
        Promise.resolve(testimonialResponse), // Wrap static data in Promise.resolve
        Promise.resolve(aimsData), // Wrap static data in Promise.resolve
      ]);

      // Debug: Check data before setting
      // console.log("testimonialsRes:", newArrivalsRes);
      // console.log("productsRes:", productsRes);

      setHomeData({
        homeBanner: homeBannerRes.status ? homeBannerRes.data : [],
        hero: heroRes.status ? heroRes.data : [],
        products: productsRes.status ? productsRes.detail.data : [],
        testimonials: testimonialsRes.status ? testimonialsRes.data : [], // This should work now
        newArrivals: newArrivalsRes.status ? newArrivalsRes.detail.data : [],
        aims: aimsRes.detail, // Use static data directly
        loading: false,
        error: null,
      });

      // Debug: Check what we just set
      // console.log("Setting products to:", homeBannerRes.newArrivals.data);
    } catch (error) {
      console.error("Error fetching home data:", error);
      setHomeData((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load home data",
      }));
    }
  };

  useEffect(() => {
    fetchAllHomeData();
  }, []);

  // Add this useEffect to debug aims data changes
  // useEffect(() => {
  //   console.log("homeData.aims changed:", homeData.aims);
  // }, [homeData.aims]);

  const heroSectionRef = useRef(null);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Run the animation only once
      offset: 200, // Trigger animation when 200px in view
    });
    AOS.refresh();

    const handleScroll = () => {
      AOS.refresh(); // Refresh AOS when user scrolls
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log(homeData.homeBanner, "test");
  // Pass data as props to sections
  return (
    <>
      {/* Hero Section */}
      <section className="hero-banner" ref={heroSectionRef}>
        <div className="header-slide position-relative">
          <img
            className="img-fluid banner-image w-100"
            src={images.heroBanner}
            alt="Hero Banner"
            // data-aos="fade-up" // Animation trigger
            // data-aos-offset="200" // Offset from the viewport
          />
          <div className="slide-content-wrap container-fluid">
            <div className="slide-content">
              <h4 className="hero-description">#{homeData.homeBanner.tag}</h4>
              <h2
                className="section-title mb-2 mb-md-3 mb-lg-2 text-white text-capitalize"
                data-aos="fade-up"
                data-aos-offset="100"
                data-aos-delay="200"
              >
                {homeData.homeBanner.title}
              </h2>
              <h3 className="hero-subtitle">{homeData.homeBanner.subtitle}</h3>
              <p className="hero-price">{homeData.homeBanner.price}</p>
              <div className="hero-actions mt-5">
                <Link
                  to={homeData.homeBanner.buttonLink}
                  className="btn btn-primary"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewArrivalsSection
        data={homeData.newArrivals}
        loading={homeData.loading}
        error={homeData.error}
      />

      <HeroSection
        data={homeData.hero}
        loading={homeData.loading}
        error={homeData.error}
      />

      <ProductSection
        data={homeData.products}
        loading={homeData.loading}
        error={homeData.error}
      />

      <TestimonialSection
        data={homeData.testimonials}
        loading={homeData.loading}
        error={homeData.error}
      />

      <AimsSection
        title={homeData.aims.title}
        description={homeData.aims.description}
        giftImage={homeData.aims.image}
      />
      {/*
      <CounterSection data={counterData2} />

        <section className={`section services-sec`}>
          <Container fluid>
            <Row>
              <Col xs={12} className="mb-4">
                <h2 className="section-title fw-bold text-center mb-0" data-aos="flip-up">
                  Top Services
                </h2>
              </Col>

              {services.slice(0, 3).map((item, index) => (
                <Col
                  lg={4}
                  key={index}
                  className="mb-4 mb-lg-0"
                  data-aos={index === 0 ? "fade-right" : index === 1 ? "fade-up" : index === 2 ? "fade-left" : ""}
                >
                  <GeneralCard data={item} serviceCard={true} linkPath="/services" />
                  {/* 
                </Col>
              ))}
            </Row>
          </Container>
        </section> */}

      {/* 

      <JourneySection /> */}

      {/* <section className={`section service-provider-sec pt-0 pb-4`}>
          <Container fluid className="mw-100">
            <Row>
              <Col xs={12} className="mb-2 mb-md-3 mb-lg-4">
                <h2 className="section-title fw-bold text-center mb-0" data-aos="flip-up">
                  Top Service Providers
                </h2>
              </Col>
              <Col xs={12} className="g-0" data-aos="fade-up">
               
                {topServiceProviders?.length >= 1 ? (
                  <Slider {...headerSliderSettings} className="service-provider-slider">
                    {topServiceProviders?.map((item, index) => (
                      <Card className="top-service-card border-0 flex-grow-1" key={index}>
                        <Card.Body className="position-relative p-0">
                          <div className="d-flex px-0 px-md-3">
                            <div className="flex-grow-1 d-flex gap-2 gap-md-3 align-items-center">
                              <div className="flex-shrink-0">
                                <img src={item?.photo} alt={item?.first_name} />
                              </div>
                              <div className="flex-grow-1 align-self-center">
                                <div>
                                  <h5 className="mb-1 fw-semibold">
                                    {item.first_name} {item.last_name}
                                  </h5>
                                  <p
                                    className="d-inline-block mb-0 bio-text text-truncate hr"
                                    style={{
                                      maxWidth: "150px",
                                      cursor: "pointer",
                                      position: "relative",
                                    }}
                                    onMouseEnter={(e) => handleBioMouseEnter(e, item?.bio, item?.id)}
                                    onMouseLeave={handleBioMouseLeave}
                                  >
                                    {item?.bio}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {item?.wishList && (
                              <div className="flex-shrink-0">
                                <button className="wish-btn" onClick={onWishListClick}>
                                  <FontAwesomeIcon icon={faHeart} />
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="sep-bar"></div>
                          <div className="d-flex px-0 px-md-3">
                            <div className="flex-grow-1 align-self-center">
                              <div className="review-rating">
                                <span className="rating fw-normal">
                                  <FontAwesomeIcon icon={faStar} className="me-2" />
                                  {item?.rating_stats?.avg_rating}
                                </span>
                                <span className="review position-relative">{item?.rating_stats?.total_reviews} reviews</span>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <Link className="btn btn-blue" to={token ? `/services-provider/${item?.id}` : "/login"}>
                                Book Now
                              </Link>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </Slider>
                ) : (
                  <p className="text-center">Not Available.</p>
                )}
              </Col>
            </Row>
          </Container>
        </section> */}

      {/* Custom Bio Tooltip */}
      {/* {tooltipState.show && (
        <div
          className="bio-tooltip"
          style={{
            position: "fixed",
            left: tooltipState.x,
            top: tooltipState.y,
            transform: "translateX(-50%) translateY(-100%)",
            zIndex: 9999,
            backgroundColor: "#ffffff",
            color: "#212529",
            border: "1px solid #dee2e6",
            borderRadius: "0.375rem",
            padding: "1rem",
            boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
            width: "350px",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            wordWrap: "break-word",
            whiteSpace: "normal",
            fontFamily: "inherit",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              marginBottom: "0.5rem",
              fontWeight: "600",
              fontSize: "1rem",
              color: "#495057",
              borderBottom: "1px solid #dee2e6",
              paddingBottom: "0.5rem",
            }}
          >
            Bio
          </div>
          <div style={{ color: "#212529" }}>{tooltipState.text || "No bio available"}</div>
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid #ffffff",
            }}
          />
        </div>
      )} */}
    </>
  );
};

export default Home;
