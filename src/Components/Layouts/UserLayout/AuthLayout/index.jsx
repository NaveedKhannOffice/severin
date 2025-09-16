import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
import BackButton2 from "../../../Common/BackButton/BackButton2";
import { images } from "../../../../Assets";

export const UserAuthLayout = (props) => {
   return (
      <>
         <section className={`user-login`}>
            <Container fluid className="mw-100 g-0">
               <Row className="justify-content-center g-0">
                  <Col
                     xs={12}
                     lg={6}
                     className="d-flex align-items-stretch d-lg-block d-none left"
                  >
                     <div className="position-relative w-100 h-100">
                        <img
                           src={images.authLeftImg}
                           alt="authLogo"
                           className="img-fluid"
                        />
                     </div>
                  </Col>

                  <Col xs={12} lg={12} xl={6} className="align-self-center">
                     <Row className="row justify-content-start authBox align-items-center">
                        <Col xs={12}>
                           <div className="authFormWrapper">
                              <div className="authForm">
                                 {props?.authBack && <BackButton2 />}
                                 <div className="authFormHeader mb-sm-5 mb-3 text-start">
                                    <h2 className="authTitle">{props?.authTitle}</h2>
                                    {props?.authMain && (
                                       <p className="authPara ">{props?.authPara}</p>
                                    )}
                                    {props?.signUpUser && (
                                       <p className="mt-3 mb-0 fw-light text-start text-capitalize grayLightColor new-account-text">
                                          Don't have an account yet?{" "}
                                          <Link to={"/signup"} className="">
                                             Sign Up
                                          </Link>
                                       </p>
                                    )}
                                    {props?.loginUser && (
                                       <p className="mt-3 mb-0 fw-light text-start text-capitalize grayLightColor new-account-text">
                                          Already have an account?{" "}
                                          <Link to={"/login"} className="">
                                             Sign In
                                          </Link>
                                       </p>
                                    )}
                                 </div>
                                 {props?.children}
                                 {props?.backOption && (
                                    <div className="text-center mt-4">
                                       <Link
                                          to={`/login`}
                                          className="underlineOnHover grayLightColor"
                                       >
                                          Back to <span className="text-dark">Login</span>
                                       </Link>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </Col>
                     </Row>
                  </Col>
               </Row>
            </Container>
         </section>
      </>
   );
};
