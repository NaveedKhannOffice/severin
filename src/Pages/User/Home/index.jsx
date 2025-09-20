import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import { images } from "../../../Assets";
import OurStorySection from "./OurStorySection";
import NewArrivalsSection from "./NewArrivalsSection";
import GiftSection from "./GiftSection";
import TestimonialSection from "./TestimonialSection";

import {
  homeBannerData,
  giftData,
  testimonialResponse,
  productsData,
  newArrivalsData,
  ourStoryData,
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
    ourStory: null,
    services: [],
    testimonials: [],
    newArrivals: [],
    products: [], // Add this line
    gift: [],
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
        ourStoryRes,
        productsRes,
        testimonialsRes,
        giftRes,
      ] = await Promise.all([
        // getAll("/user/top-services"),
        // getAll("/user/new-arrivals"), // Your new arrivals API
        Promise.resolve(homeBannerData), // Wrap static data in Promise.resolve
        Promise.resolve(newArrivalsData), // Wrap static data in Promise.resolve
        Promise.resolve(ourStoryData), // Wrap static data in Promise.resolve
        Promise.resolve(productsData), // Wrap static data in Promise.resolve
        Promise.resolve(testimonialResponse), // Wrap static data in Promise.resolve
        Promise.resolve(giftData), // Wrap static data in Promise.resolve
      ]);

      // Debug: Check data before setting
      // console.log("testimonialsRes:", newArrivalsRes);
      // console.log("productsRes:", productsRes);

      setHomeData({
        homeBanner: homeBannerRes.status ? homeBannerRes.data : [],
        ourStory: ourStoryRes.status ? ourStoryRes.data : [],
        products: productsRes.status ? productsRes.detail.data : [],
        testimonials: testimonialsRes.status ? testimonialsRes.data : [], // This should work now
        newArrivals: newArrivalsRes.status ? newArrivalsRes.detail.data : [],
        gift: giftRes.detail, // Use static data directly
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
              <h4 className="hero-description"
                data-aos="fade-in"
                data-aos-offset="100"
                data-aos-delay="200"
                >#{homeData.homeBanner.tag}</h4>
              <h2
                className="section-title mb-2 mb-md-3 mb-lg-2 text-white text-capitalize"
                data-aos="fade-up"
                data-aos-offset="100"
                data-aos-delay="200"
              >
                {homeData.homeBanner.title}
              </h2>
              <h3 className="hero-subtitle"
                data-aos="fade-up"
                data-aos-offset="100"
                data-aos-delay="230"
                >{homeData.homeBanner.subtitle}</h3>
              <p className="hero-price"
                data-aos="fade-up"
                data-aos-offset="100"
                data-aos-delay="260"
                >{homeData.homeBanner.price}</p>
              <div className="hero-actions mt-5">
                <Link
                  to={homeData.homeBanner.buttonLink}
                  className="btn btn-primary"
                  data-aos="fade-in"
                  data-aos-offset="100"
                  data-aos-delay="200"
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

      <OurStorySection
        data={homeData.ourStory}
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

      <GiftSection
        title={homeData.gift.title}
        description={homeData.gift.description}
        giftImage={homeData.gift.image}
      />
    </>
  );
};

export default Home;
