import {
  faAngleLeft,
  faAngleRight,
  faBars,
  faChevronDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { LuUserRound } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { MdLogin } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa6";
import { BiSearchAlt } from "react-icons/bi";
import {
  Container,
  Dropdown,
  Offcanvas,
  Placeholder,
  Button,
} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { images } from "../../../../Assets";
import { useAuth } from "../../../../Hooks/useAuth";
import { useLogout } from "../../../../Services/Auth";
import { fullName, generateLinks, slugify } from "../../../../Utils/helper";
import CustomModal from "../../../Common/CustomModal";
import Toast, { showToast } from "../../../Common/Toast/index";
import { cartItems } from "../../../../Store/selectors";
import "./style.css";
import CustomButton from "../../../Common/CustomButton";
import TextInput from "../../../Common/FormElements/TextInput";
import { removeItem } from "../../../../Store/actions";

export const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dropDown, setDropDown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [notiData, setNotiData] = useState(notifications);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { role, token, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [profilePic, setProfilePic] = useState(images.userImage);
 
  const cart = useSelector(cartItems);
  console.log("cart", cart);

  // Search functionality
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchResults(false);
      setSearchQuery("");
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchResults(false);
      setSearchQuery("");
    }
  };
  const totalQty = cart?.cartItems?.reduce((sum, item) => sum + item.qty, 0) || 0;


  useEffect(() => {
    if (user) {
      setProfilePic(user.photo_path || images.userImage);
    }
  }, [user]);

  const handleLogout = useLogout();
  const logout = async () => {
    showToast("Logout Successfully", "success");
    await handleLogout(role);
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


  const handleRemoveItem = (cartItemId) => {
    dispatch(removeItem(cartItemId));
    showToast("Item removed from cart", "success");
  };

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
                   <div className="header-search position-relative">
                     <form onSubmit={handleSearchSubmit}>
                       <TextInput 
                         type="text" 
                         placeholder="Search products..." 
                         name="search"
                         value={searchQuery}
                         onChange={handleSearchChange}
                       />
                       <button 
                         type="button" 
                         className="btn-search"
                         onClick={handleSearchClick}
                       >
                         <BiSearchAlt />
                       </button>
                     </form>
                   </div>
                   </Nav.Item>
                  <Nav.Item as="li">
                    <Dropdown className="dropdown-user">
                    {!user ? (
                      <Dropdown.Toggle
                        className="after-none"
                        variant=""
                        id="dropdown-basic"
                         onClick={() => navigate("/login")}
                      >
                        <LuUserRound />
                      </Dropdown.Toggle>
                    ) : (
                      <Dropdown.Toggle
                        className="after-none"
                        variant=""
                        id="dropdown-basic"
                      >
                        <LuUserRound />
                      </Dropdown.Toggle>

                    )}
                      <Dropdown.Menu align="end">
                        {user && (
                          <>
                            <Dropdown.Item className="text-center login-user" onClick={() => navigate("/profile")}>
                              <span className="avatar avatar-online">
                                <img src={user?.photo} alt="avatar" />
                              </span>
                              <span className="user-name fw-semibold">{fullName(user)}</span>
                              <span className="user-name fw-light fst-italic">View Profile</span>
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="logout"
                              onClick={() => setShowModal(true)}
                            >
                              <span>
                                <TbLogout2  />
                              </span>
                              Logout
                            </Dropdown.Item>
                          </>
                        )}
                        {!user && (
                          <>
                            <Dropdown.Item
                              className="logout"
                              onClick={() => navigate("/login")}
                            >
                              <span>
                                <MdLogin />
                              </span>
                              Login
                            </Dropdown.Item>
                          </>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Dropdown className="dropdown-shopping-cart">
                      {cart?.cartItems?.length > 0 ? (
                      <Dropdown.Toggle variant="" id="dropdown-basic">
                        <BsCart3 />
                        {totalQty > 0 && <span className="badge">{totalQty}</span>}
                      </Dropdown.Toggle>
                      ) : (
                        <Dropdown.Toggle variant="" id="dropdown-basic" onClick={() => navigate("/cart")}>
                        <BsCart3 />
                      </Dropdown.Toggle>
                      )}
                      <Dropdown.Menu align="end">
                        {cart?.cartItems?.length > 0 && (
                          <>
                          <div className="dropdown-body">
                                {cart.cartItems.map((item, index) => (
                                  <Dropdown.Item key={index} as="div" className="cart-item">
                                    <div className="product-image">
                                      <img src={item.image || images.placeholder} alt={item.name} />
                                    </div>
                                    <div className="product-meta flex-grow-1 align-self-center">
                                        <div className="product-details mb-1">
                                          <Link to={`/product/${item.id}/${slugify(item.name)}`}>{item.name || `Item ${item.id}`}</Link>
                                        </div>
                                      <div className="product-quantity-price">
                                        <span className="quantity">{item.qty} x <span className="currency-code">CHF</span> {item.price}</span>
                                      </div>
                                    </div>
                                    <div className="product-actions flex-shrink-0 align-self-center">
                                        <Button 
                                          variant="link" 
                                          className="remove-btn text-danger p-0"
                                          onClick={() => handleRemoveItem(item.cartItemId)}
                                        >
                                          <FaTrash size={16} />
                                        </Button>
                                    </div>
                                  </Dropdown.Item>
                                ))}
                          </div>
                          <div className="dropdown-footer px-2 d-flex flex-row justify-content-center mt-0 py-2 gap-2">
                            <CustomButton variant="primary" className="w-50 px-0" onClick={() => navigate("/cart")} text="View Cart" />
                            <CustomButton variant="outline-secondary" className="w-50 px-0" onClick={() => navigate("/cart")} text="Checkout" />
                          </div> 
                          </>
                        )}
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
    </>
  );
};
