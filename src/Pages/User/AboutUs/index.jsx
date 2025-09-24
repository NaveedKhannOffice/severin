import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { images } from "../../../Assets";
import { usePageTitle } from "../../../Utils/helper";
import "./style.css";
import LoadingSpinner from "../../../Components/Common/Loader";
import { useShopInformation } from "../../../Hooks/useShopInformation";

const AboutUs = () => {
  usePageTitle("About", true);

  const {
    data: shopInfo,
    isLoading: shopInfoLoading,
    error: shopInfoError,
  } = useShopInformation();

  const aboutHtml = shopInfo?.about_us?.trim();

  const renderAboutContent = () => {
    if (shopInfoLoading) {
      return <LoadingSpinner />;
    }

    if (shopInfoError) {
      return (
        <p className="text-danger mb-3">
          Unable to load About Us content right now. Please try again later.
        </p>
      );
    }

    if (aboutHtml) {
      return (
        <div
          className="rich-text-content"
          dangerouslySetInnerHTML={{ __html: aboutHtml }}
        />
      );
    }

    return (
      <>
        <p>
          At ConnectMio, our vision is simple: to help families regain a sense
          of peace, stability, and emotional strength. Whether you're taking your
          first step or finding your footing again, we're here to walk with you.
        </p>
        <div className="sep-bar"></div>
        <h3 className="fw-bold mb-2">About Jennifer Young</h3>
        <p>
          Jennifer Young is a devoted mother of three and the founder of
          ConnectMio, an app designed to empower families affected by
          alcoholism. Having personally experienced the challenges of loving
          someone with an alcohol use disorder - her late husband struggled with
          alcoholism - Jennifer understands the deep emotional, financial, and
          mental toll it can take. Fueled by her journey, she is passionate about
          building a community of support for those navigating life with an
          alcoholic loved one. With over 15 million Americans living with
          someone who has an alcohol use disorder, Jennifer created ConnectMio
          to provide practical resources, expert guidance, and a safe space where
          individuals and families can find the support they need to reclaim
          peace and stability in their lives. Through her work, Jennifer is
          committed to breaking the isolation, fostering resilience, and
          equipping families with the tools to manage their daily challenges with
          strength and hope. Connect with Jennifer and learn how ConnectMio can
          help you on your journey.
        </p>
      </>
    );
  };

  return (
    <>
      <section className={`page-content about-us about-sec`}>
        <Container fluid>
          <Row>
            <Col xs={12} md={12} lg={6}>
              <div className="d-flex gap-3 align-items-center about-img">
                <img
                  src={images.aboutImg1}
                  alt="About Image 3"
                  className="img-fluid about-img"
                  data-aos="fade-right"
                  data-aos-delay="100"
                  style={{ maxWidth: "50%" }}
                />
                <img
                  src={images.aboutImg2}
                  alt="About Image 4"
                  className="img-fluid about-img"
                  data-aos="fade-left"
                  data-aos-delay="110"
                  style={{ maxWidth: "50%" }}
                />
              </div>
            </Col>
            <Col xs={12} md={12} lg={6} className="align-self-center">
              <div className="ps-xl-2 ps-xxl-4 pe-xxl-2 mt-sm-0 mt-4">
                <Row>
                  <Col xs={12}>{renderAboutContent()}</Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutUs;
