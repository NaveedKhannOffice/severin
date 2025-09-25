import { Col, Container, Nav, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { images } from "../../../../Assets";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa6";
import "./style.css";
import TextInput from "../../../Common/FormElements/TextInput";
import CustomButton from "../../../Common/CustomButton";
import { useShopInformation } from "../../../../Hooks/useShopInformation";
import { useThemeSettings } from "../../../../Context/ThemeContext";
import useThemeAsset from "../../../../Hooks/useThemeAsset";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Shop", path: "/shop" },
  { label: "Contact Us", path: "/contact-us" },
];

const informationLinks = [
  { label: "FAQs", path: "/faqs" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms of Service", path: "/terms-of-service" },
];

const SOCIAL_PROVIDERS = [
  { icon: FaFacebookF, label: "Facebook", key: "facebook_link", fallback: "/" },
  { icon: BsTwitterX, label: "Twitter", key: "twitter_link", fallback: "/" },
  { icon: BiLogoInstagramAlt, label: "Instagram", key: "instagram_link", fallback: "/" },
];

export const Footer = () => {
  const { data: shopInfo } = useShopInformation();
  const { theme } = useThemeSettings();
  const primaryLogoSrc = useThemeAsset(theme?.primaryLogo, images.FooterLogo || images.Logo);

  const resolvedSocialLinks = (shopInfo ? SOCIAL_PROVIDERS.map((config) => {
    const href = shopInfo?.[config.key]?.trim();
    if (!href) {
      return null;
    }

    return { ...config, href };
  }).filter(Boolean) : []);

  const socialLinksToRender =
    resolvedSocialLinks.length > 0
      ? resolvedSocialLinks
      : SOCIAL_PROVIDERS.map((config) => ({
          ...config,
          href: config.fallback,
        }));

  const copyRightText =
    shopInfo?.copy_right?.trim() || "Copyright (c) 2025 - HQS. All Rights Reserved.";

  return (
    <>
      <footer id="footer" className="position-relative">
        <Container fluid>
          <Row>
            <Col xs={12} xl={9} className="d-flex">
              <div className="footer-widgets align-self-center flex-grow-1">
                <Row>
                  <Col
                    col={12}
                    md={4}
                    lg={4}
                    className="align-items-center mb-4 mb-md-0 align-items-stretch"
                  >
                    <div className="widget image-widget text-left w-100">
                      <img src={primaryLogoSrc} className="img-fluid" alt="" />
                    </div>
                    <div className="widget social-links">
                      <h3 className="widget-title fw-bold mb-2 mb-lg-2">Follow Us</h3>
                      <Nav as="ul" className="d-flex gap-3">
                        {socialLinksToRender.map((social, index) => {
                          const IconComponent = social.icon;
                          return (
                            <Nav.Item as="li" key={`${social.label}-${index}`}>
                              <a
                                href={social.href}
                                title={social.label}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="social-link"
                              >
                                <IconComponent />
                              </a>
                            </Nav.Item>
                          );
                        })}
                      </Nav>
                    </div>
                  </Col>
                  <Col col={12} md={8}>
                    <Row>
                      <Col xs={12} md={6} xxl={6}>
                        <div className="widget">
                          <h3 className="widget-title fw-bold mb-2 mb-lg-2">Quick Links</h3>
                          <Nav as="ul" className="">
                            {quickLinks.map((link, index) => (
                              <Nav.Item as="li" key={index}>
                                <NavLink to={link.path}>{link.label}</NavLink>
                              </Nav.Item>
                            ))}
                          </Nav>
                        </div>
                      </Col>
                      <Col xs={12} md={6} xxl={6} className="mt-md-0 mt-4">
                        <div className="widget">
                          <h3 className="widget-title fw-bold mb-2 mb-lg-2">Information</h3>
                          <Nav as="ul" className="">
                            {informationLinks.map((link, index) => (
                              <Nav.Item as="li" key={index}>
                                <NavLink to={link.path}>{link.label}</NavLink>
                              </Nav.Item>
                            ))}
                          </Nav>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col
              col={12}
              md={12}
              lg={8}
              xl={3}
              className="mt-lg-0 mt-4 mb-4 mb-lg-0 d-flex mx-auto"
            >
              <div className="widget newsletter-widget align-self-center w-100">
                <h3 className="widget-title text-center mb-3 pb-1">
                  Subscribe To our Newsletter
                </h3>
                <p className="sub-title text-center">
                  Be the first to get exclusive offers and the latest news.
                </p>
                <TextInput
                  id="email"
                  type="text"
                  required
                  placeholder="E-mail Address"
                  labelclass="mainLabel"
                  inputclass="mainInput mainInputLogIn mb-4"
                />
                <CustomButton
                  variant="primary"
                  className="px-0 w-100"
                  text="submit now"
                  loadingText="Loading..."
                  type="submit"
                />
              </div>
            </Col>
          </Row>
        </Container>
        <div className="footer-info py-3">
          <Container fluid>
            <Row>
              <Col
                col={12}
                className="text-center info d-flex flex-column gap-2  flex-sm-row justify-content-between align-items-center"
              >
                <address>{copyRightText}</address>
                <div className="payment-logos">
                  <img src={images.paymentLogo} alt="payment logo" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </>
  );
};

