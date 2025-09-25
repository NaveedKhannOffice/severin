import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container, Offcanvas, Button, Row, Col, Dropdown, ListGroup } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faBars, } from '@fortawesome/free-solid-svg-icons';
import { images } from "../../../../Assets";
import { useThemeSettings } from "../../../../Context/ThemeContext";
import useThemeAsset from "../../../../Hooks/useThemeAsset";
import CustomModal from "../../../CustomModal";
import Toast, { showToast } from "../../../Toast";
// import { notifications } from "../../config/data";
// import { NotificationDropDown } from "../../components/notificationDropDown";
import { useAuth } from "../../../../Hooks/useAuth";
import { useLogout } from "../../../../Services/Auth";
import "./style.css";
import { fullName, generateLinks, generateProviderLinks } from "../../../../Utils/helper";
// import HeaderNotification from "../../../HeaderNotification";
import { notificationsData } from "../../../../Config/data";


const UserNavigation = () => {
  const navigate = useNavigate();
  const { theme } = useThemeSettings();
  const primaryLogoSrc = useThemeAsset(theme?.primaryLogo, images.Logo);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dropDown, setDropDown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [notiData, setNotiData] = useState(notifications);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const { role, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loginRequireModal, setLoginRequireModal] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const [isProviderLoggedIn, setIsProviderLoggedIn] = useState(false);

  const location = useLocation();
  const isProviderPath = location.pathname.includes('provider');

  useEffect(() => {
    if (user) {
      setProfilePic(user.photo_path || images.userImage);
    }
  }, [user]);

  useEffect(() => {
    // Check if user is logged in and is a provider
    setIsProviderLoggedIn(!!user && role === "provider");
  }, [user, role]);

  const handleLogout = useLogout();
  const logout = async () => {
    showToast("Logout Successfully", "success");
    await handleLogout(role);
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
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [userRole, setUserRole] = useState({});
  useEffect(() => {
    setUserRole(role);
  }, []);


  let Links = generateLinks(role, isProviderLoggedIn);

  const pageAcces = ["contact-us", "about-us"];

  const handleClick = () => {
    setLoginRequireModal(true);
  };


  const [notificationData, setNotificationData] = useState([]);
  const getNotification = async () => {
    // let url = `/${role}-api/notifications`;
    // const response = await getAll(url);
    const response = notificationsData;
    if (response) {
      setNotificationData(response?.detail?.notifications?.data);
    }
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="me-3">
            <img src={primaryLogoSrc} alt="" />
          </Navbar.Brand>
          <Offcanvas className="main-nav-wrap  123 flex-grow-1 me-0 me-lg-3" show={show} onHide={handleClose} responsive="lg">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body
              id="basic-navbar-nav"
              className="justify-content-between"
            >
              {/* {role ? "login" : "No login" } */}
              {role ? (
                // User Login
                <div className="d-flex scroll-nav-wrapper flex-grow-1 justify-content-start justify-content-lg-end">
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
                    {Links.map((element, index) => (
                      <Nav.Item as="li" key={index}>
                        <NavLink className="nav-link" to={element.path}>{element.label}</NavLink>
                      </Nav.Item>
                    ))}
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
              ) : (
                // Guest Login
                <div className="d-flex scroll-nav-wrapper flex-grow-1 justify-content-start justify-content-lg-end">
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
                    {Links.map((element, index) => {
                      // Determine if the link is accessible
                      const isAccessible =
                        userRole || pageAcces.includes(element.path.replace("/", "").toLowerCase());

                      return (
                        <Nav.Item as="li" key={index}>
                          <NavLink
                            className={({ isActive }) =>
                              `nav-link ${isAccessible && isActive ? 'active' : ''}`
                            }
                            to={isAccessible ? element.path : "#"}
                            onClick={(e) => {
                              if (!isAccessible) {
                                e.preventDefault();
                                handleClick(element.path);
                              }
                            }}
                          >
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
              )}
            </Offcanvas.Body>
          </Offcanvas>
          <Navbar.Collapse id="" className='flex-grow-0 h-100 justify-content-end'>
            {role ? (
              <Nav as="ul" className="gap-3 gap-xxl-4 navbar-login align-items-center">
                <Nav.Item as="li" className=''>
                  <Link to="/wishlist" className="align-self-center"><images.HeartIcon /></Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Link to="/view-cart"><images.CartIcon /></Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Link to="/chat"><images.ChatIcon /></Link>
                </Nav.Item>

                <Nav.Item as="li">
                  {/* <HeaderNotification viewAllLink="/notifications" notificationData={notificationData} getNotification={getNotification} /> */} 
                  {/* <NotificationDropDown viwAllLink="/buyer/notifications" key={notiData.id} notiData={notiData} notiread={"false"} /> */}
                </Nav.Item>
                <Nav.Item as="li">
                  <Dropdown className="dropdown-user">
                    <Dropdown.Toggle className='after-none' variant="" id="dropdown-basic">
                      <images.UserIcon />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      {user && (
                        <Dropdown.Item
                          as="div"
                          className="text-center login-user">
                          <span className="avatar avatar-online">
                            <img src={profilePic ?? images.userImage} alt="avatar" />
                          </span>
                          <span className="user-name fw-semibold">{fullName(user)}</span>
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item
                        as={Link}
                        to="/profile">
                        View Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/my-posts">
                        My Posts
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/order-logs">
                        My Order Logs
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/bookings">
                        My Bookings
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/blocked-users">
                        Block Users
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/subscriptions">
                        Buy Subscription
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/emergency-contacts">
                        Emergency Contacts
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setShowModal(true)}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Item>
              </Nav>
            ) : (
              <Nav
                as="ul"
                className="navbar-right flex-grow-1 flex-lg-grow-0 justify-content-end align-items-center"
              >
                <Nav.Item as="li" className="">
                  <NavLink className="nav-link" to="/signup">Sign up</NavLink>
                </Nav.Item>
                <Nav.Item as="li" className="">
                  <Link to="/login" className="btn btn-blue">
                    Login
                  </Link>
                </Nav.Item>
              </Nav>
            )
            }
            <Button variant="primary" className="menu-toggle mobile-nav d-lg-none ms-3" onClick={handleShow}>
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </Navbar.Collapse>
          { }
        </Container>
      </Navbar>
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
  )
}

export default UserNavigation
