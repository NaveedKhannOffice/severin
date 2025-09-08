import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { images } from "../../../Assets";
import AimsSection from "../../../Components/UserComponents/AimsSection";
import CounterSection from "../../../Components/UserComponents/CounterSection/CounterSection";
import JourneySection from "../../../Components/UserComponents/JourneySection";
import { aimsData, counterData } from "../../../Config/data";
import { usePageTitle } from "../../../Utils/helper";
import "./style.css";

const AboutUs = () => {
  usePageTitle("About", true);

  const [aims, setAims] = useState([]); // Initialize as an array

  const getData = async () => {
    try {
      const aimsResponse = aimsData;

      if (aimsResponse.status) {
        const { detail } = aimsResponse;
        setAims(detail);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log(aims, "aims")
  return (
    <>
      {/* <PageTitle pageHeading="About Us" /> */}
      <section className={`page-content about-us about-sec`}>
        <Container fluid>
          <Row>
            <Col xs={12} md={12} lg={6}>
              <div className="d-flex gap-3 align-items-center about-img">
                <img src={images.aboutImg1} alt="About Image 3" className="img-fluid about-img" data-aos="fade-right" data-aos-delay="100" style={{ maxWidth: "50%" }} />
                <img src={images.aboutImg2} alt="About Image 4" className="img-fluid about-img" data-aos="fade-left" data-aos-delay="110" style={{ maxWidth: "50%" }} />
              </div>
            </Col>
            <Col xs={12} md={12} lg={6} className="align-self-center">
              <div className="ps-xl-2 ps-xxl-4 pe-xxl-2 mt-sm-0 mt-4">
                <Row>
                  <Col xs={12}>
                    {/* <h2 className="section-title fw-bold mt-3 mt-lg-0 mb-3 mb-xl-4 text-capitalize">
                      Your journey to emotional well-being.
                    </h2> */}
                    <p>
                      At ConnectMio, our vision is simple: to help families regain a sense of peace, stability, and emotional strength. Whether you're taking
                      your first step or finding your footing again, we're here to walk with you.
                    </p>

                    <div className="sep-bar"></div>
                  </Col>
                  <Col xs={12} lg={12} className="mb-3 mb-lg-0">
                    <h3 className="fw-bold mb-2">About Jennifer Young</h3>
                    <p>
                      Jennifer Young is a devoted mother of three and the founder of ConnectMio, an app designed to empower families affected by alcoholism.
                      Having personally experienced the challenges of loving someone with an alcohol use disorder—her late husband struggled with
                      alcoholism—Jennifer understands the deep emotional, financial, and mental toll it can take. Fueled by her journey, she is passionate about
                      building a community of support for those navigating life with an alcoholic loved one. With over 15 million Americans living with someone
                      who has an alcohol use disorder, Jennifer created ConnectMio to provide practical resources, expert guidance, and a safe space where
                      individuals and families can find the support they need to reclaim peace and stability in their lives. Through her work, Jennifer is
                      committed to breaking the isolation, fostering resilience, and equipping families with the tools to manage their daily challenges with
                      strength and hope. Connect with Jennifer and learn how ConnectMio can help you on your journey.
                    </p>
                  </Col>
                  {/* <Col xs={12} lg={6}>
                    <h3 className="fw-bold mb-2">Our Vision</h3>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                      since the 1500s
                    </p>
                  </Col> */}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <CounterSection data={counterData} />

      {/* <section className={`section counter-sec pb-5`}>
        <Container fluid>
          <Row>
            {counterData.map((item, index) => (
              <Col
                xs={12}
                lg={3}
                key={index}
                className={`${
                  index < counterData.length - 1 ? "border-right" : ""
                }`}
              >
                <CounterCard data={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section> */}

      {/* Aim Section */}
      <AimsSection title={aims.title} subtitle={aims.subtitle} description={aims.description} />

      <JourneySection />
    </>
  );
};

export default AboutUs;
