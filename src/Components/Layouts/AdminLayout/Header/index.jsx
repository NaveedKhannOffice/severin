import {
  faBars,
  faDollarSign,
  faEllipsisV,
  faMoneyCheck,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import ChatIconAdmin from "../../../../Assets/images/svg/chatIconAdmin.svg?react";
import { useAuth } from "../../../../Hooks/useAuth";
import { useLogout } from "../../../../Services/Auth";
import CustomModal from "../../../Common/CustomModal/index";
// import HeaderNotification from "../../../HeaderNotification";
import Toast, { showToast } from "../../../Common/Toast/index";
import "./style.css";
import { images } from "../../../../Assets";

const Header = (props) => {
  const navigate = useNavigate();
  const { role, user } = useAuth();
  const handleLogout = useLogout();
  const [showModal, setShowModal] = useState(false);
  const [notificationData, setNotificationData] = useState([]);

  const logout = async () => {
    showToast("Logout Successfully", "success");
    await handleLogout(role);
    setTimeout(() => {
      navigate(`/${role}`);
    }, 1000);
  };

  return (
    <header className={`${props?.className ?? ""}`}>
      <Navbar className="customHeader" expand="md">
        <Navbar.Toggle className="order-4 order-lg-2 notButton ">
          <FontAwesomeIcon className="bell-icon " icon={faEllipsisV} />
        </Navbar.Toggle>
        <div className="logoWrapper px-2 order-2 order-lg-1">
          <Link to={"/admin/dashboard"} className="siteLogo">
            <img src={images.adminAuthLogo} alt="" />
          </Link>
        </div>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="customCollapse order-3"
        >
          <Nav className="ms-auto">
            <Link className="customerSupportIcon me-2" to={"/admin/chat"}>
              {/* <ChatIconAdmin /> */}
            </Link>
            {/* <HeaderNotification
              notificationData={notificationData}
              getNotification={getNotification}
            /> */}
            <Dropdown className="userDropdown">
              <Dropdown.Toggle
                variant="transparent"
                className="notButton toggleButton border-0 px-0"
              >
                <div className="userImage d-flex align-items-center">
                  <img
                    src={user?.photo}
                    alt=""
                    className="img-fluid"
                  />
                  <h6 className="ms-2 mb-0 whiteColor">
                    {user?.first_name}
                  </h6>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="userMenu whiteColor" align="end">
                <Link className="userMenuItem" to={`/${role}/profile`}>
                  <FontAwesomeIcon className="me-2 yellow-text" icon={faUser} />{" "}
                  Profile
                </Link>
                {/* <Link className="userMenuItem" to={`/${role}/mybank-detail`}>
                  <FontAwesomeIcon
                    className="me-2 yellow-text"
                    icon={faMoneyCheck}
                  />
                  My Bank Detail
                </Link>
                <Link className="userMenuItem" to={`/${role}/payment-logs`}>
                  <FontAwesomeIcon
                    className="me-2 yellow-text"
                    icon={faDollarSign}
                  />
                  Payment Logs
                </Link> */}
                <Link
                  onClick={() => setShowModal(true)}
                  className="userMenuItem"
                >
                  <FontAwesomeIcon
                    className="me-1 yellow-text"
                    icon={faSignOut}
                  />{" "}
                  Logout
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
        <button className="notButton ms-md-2 order-lg-4 order-md-4 order-1">
          <FontAwesomeIcon
            className="bell-icon whiteColor d-lg-none d-block"
            onClick={props.sidebarToggle}
            icon={faBars}
          />
        </button>
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
    </header>
  );
};

export { Header };
export default Header;
