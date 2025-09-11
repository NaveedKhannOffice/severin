import {
  faAngleLeft,
  faAngleRight,
  faBars,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { LuUserRound } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { MdLogin, MdLogout } from "react-icons/md";
import {
  Button,
  Container,
  Dropdown,
  Offcanvas,
  Placeholder,
} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { images } from "../../../../Assets";
import { useAuth } from "../../../../Hooks/useAuth";
import { useLogout } from "../../../../Services/Auth";
import { fullName, generateLinks } from "../../../../Utils/helper";
import CustomModal from "../../../CustomModal";
import Toast, { showToast } from "../../../Toast";
import "./style.css";

export const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dropDown, setDropDown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [notiData, setNotiData] = useState(notifications);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const { role, token, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loginRequireModal, setLoginRequireModal] = useState(false);
  const [profilePic, setProfilePic] = useState();

  useEffect(() => {
    if (user) {
      setProfilePic(user.photo_path || images.userImage);
    }
  }, [user]);

  const handleLogout = useLogout();
  const logout = async () => {
    showToast("Logout Successfully", "success");
    await handleLogout(role);
    isProviderPath &&
      setTimeout(() => {
        navigate(`/provider`);
      }, 1000);

    !isProviderPath &&
      setTimeout(() => {
        navigate(`/`);
      }, 1000);
  };

  const hideDropdown = () => setDropDown(false);
  const navbarRef = useRef(null);

  const checkScrollButtons = () => {
    if (navbarRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navbarRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (navbarRef.current) {
      navbarRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (navbarRef.current) {
      navbarRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };
  useEffect(() => {
    checkScrollButtons();
  }, [checkScrollButtons]);

  useEffect(() => {
    window.addEventListener("resize", checkScrollButtons);
    return () => {
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pageAcces = ["", "about-us", "contact-us"];

  const [userRole, setUserRole] = useState({});
  useEffect(() => {
    setUserRole(role);
  }, []);

  let currentLinks = generateLinks(role);
  const location = useLocation();

  return (
    <>
      <header
        id="header"
        className={`w-100 z-inxed-2 w-100 user-header ${
          location.pathname == "/" && "home_header"
        }`}
      >
        <div className="top-bar d-flex gap-2 justify-content-center align-items-center px-3">
          <div>
            <Link to="/shop">SHOP</Link> |{" "}
            <Link to="/our-story">OUR STORY</Link> |{" "}
            <Link to="/customer-care">CUSTOMER CARE</Link>
          </div>
        </div>
        <Navbar expand={"md"} bg="light" variant="light" className={``}>
          <Container fluid className="">
            <Navbar.Brand as={Link} to={"/"} className="me-3">
              <img src={images.Logo} alt="" />
            </Navbar.Brand>
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              className="main-nav-wrap flex-grow-1 me-0 me-lg-3"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body
                id="basic-navbar-nav"
                className="justify-content-between"
              >
                <div
                  className={`d-flex scroll-nav-wrapper flex-grow-1 justify-content-start  justify-content-md-center justify-content-lg-end`}
                >
                  {showLeftButton && (
                    <button
                      className="scroll-button d-lg-inline-block d-none left"
                      onClick={scrollLeft}
                    >
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                  )}
                  <Nav
                    className="mx-0 scrollable-nav"
                    ref={navbarRef}
                    onScroll={checkScrollButtons}
                    onMouseLeave={hideDropdown}
                  >
                    {currentLinks.map((element, index) => {
                      return (
                        <Nav.Item as="li" key={index}>
                          <NavLink className={`nav-link`} to={element.path}>
                            {element.label}
                          </NavLink>
                        </Nav.Item>
                      );
                    })}
                  </Nav>
                  {showRightButton && (
                    <button
                      className="scroll-button d-lg-inline-block d-none right"
                      onClick={scrollRight}
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                  )}
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <div className="d-flex gap-3">
              <Nav
                as="ul"
                className="gap-3 gap-xxl-3 navbar-right align-items-center ms-lg-5 d-sm-flex flex-row"
              >
                <>
                  <Nav.Item as="li">
                    <Dropdown className="dropdown-user">
                      <Dropdown.Toggle
                        className="after-none"
                        variant=""
                        id="dropdown-basic"
                      >
                        {/* {user && (
                            <Dropdown.Item as="div" className="text-center login-user">
                              <span className="avatar avatar-online">
                                <img src={user?.photo_path} alt="avatar" />
                              </span>
                              <span className="user-name fw-semibold">{fullName(user)}</span>
                            </Dropdown.Item>
                          )} */}
                        <LuUserRound />
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end">
                        {user && (
                          <>
                            <Dropdown.Item as={Link} to="/profile">
                              <span>
                                <LuUserRound />
                              </span>{" "}
                              My Profile
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="logout"
                              onClick={() => setShowModal(true)}
                            >
                              <span>
                                <MdLogout />
                              </span>
                              Logout
                            </Dropdown.Item>
                          </>
                        )}
                        {!user && (
                          <>
                            <Dropdown.Item
                              className="logout"
                              onClick={() => setShowModal(true)}
                            >
                              <span>
                                <MdLogin />
                              </span>
                              Login
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="logout"
                              onClick={() => setShowModal(true)}
                            >
                              <span>
                                <MdLogin />
                              </span>
                              Sign up
                            </Dropdown.Item>
                          </>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Dropdown className="dropdown-cart">
                      <Dropdown.Toggle variant="" id="dropdown-basic">
                        <BsCart3 />
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end">
                        <Dropdown.Item as={Link} to="/cart">
                          Cart Empty
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Item>
                </>
              </Nav>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
            </div>
          </Container>
        </Navbar>
        <div className="top-bar bg-dark text-white py-2">
          <Marquee speed={50} gradient={false}>
            SALE: 15% off &nbsp; | &nbsp; SHOP &nbsp; | &nbsp; OUR STORY &nbsp;
            | &nbsp; CUSTOMER CARE &nbsp; | &nbsp; SHIPPING WORLDWIDE
          </Marquee>
        </div>
      </header>

      <Toast />
      <CustomModal
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
        action={() => {
          logout();
          setShowModal(false);
        }}
        heading="Logout?"
        para="Are you sure you want to logout?"
      />
      <CustomModal
        show={loginRequireModal}
        close={() => {
          setLoginRequireModal(false);
        }}
        action={() => {
          setLoginRequireModal(false);
          navigate(`login`);
        }}
        heading="Login Required"
        para=""
        alert
      />
    </>
  );
};
