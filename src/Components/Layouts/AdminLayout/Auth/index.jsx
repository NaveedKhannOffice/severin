import { Link, useLocation } from "react-router-dom";
import "./style.css";
import { images } from "../../../../Assets";
import { Col, Container, Row } from "react-bootstrap";

export const AuthLayout = (props) => {
  const location = useLocation();
  const pathname = location?.pathname;
  const [, firstSegment] = pathname.split("/");
  console.log(firstSegment, "firstSegment");

  return (
    <>
      <section className={`admin-login-wrap ${props?.authClasMain}`}>
        <Container fluid>
          <Row>
            <Col xs={12} xl={10} className="mx-auto">
              <div className="login-card p-0">
                <Row className="justify-content-center g-0">
                  <Col xs={12} lg={6} className="d-flex align-items-stretch d-lg-block d-none">
                    <div className="left position-relative w-100 h-100">
                      <img
                        src={images.authLeftImg}
                        alt="authLogo"
                        className="img-fluid"
                      />
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <img src={images.adminAuthLogo} alt="authLogo" className="adminAuthLogo" />
                      </div>
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    lg={6}
                    className="d-flex flex-column justify-content-center"
                  >
                    <div className="right px-xxl-5">
                      <div className="authFormWrapper">
                        <div className="authForm">
                          <div className="authFormHeader mb-sm-5 mb-3 text-center">
                            <h2 className="authTitle">{props?.authTitle}</h2>
                            {props?.authMain && (
                              <p className="authPara ">{props?.authPara}</p>
                            )}
                          </div>
                          {props?.children}
                          {props?.backOption && (
                            <div className="text-center mt-5">
                              <Link
                                to={`/${firstSegment}`}
                                className="fw-normal text-decoration-underline grayColor"
                              >
                                <button className="notButton underlineOnHover fw-medium">
                                  <span className="lightGrayColor">Back To</span> Login
                                </button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
