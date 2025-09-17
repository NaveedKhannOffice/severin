import { useNavigate } from "react-router";
import "./style.css";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomButton from "../../../Components/Common/CustomButton";
import { useAuth } from "../../../Hooks/useAuth";
import { fullName, getCountryFlag } from "../../../Utils/helper";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <DashboardLayout pageTitle="My Profile">
        <div className="row mt-3">
          <div className="col-12">
            <h2 className="mainTitle">My Profile</h2>
          </div>
        </div>
        <div className="dashCard my-4">
          <div className="row mb-3">
            {user ? (
              <div className="col-12">
                <div className="mx-width">
                  <div className="row text-xl-center mb-5">
                    <div className="col-12">
                      <div className="profileImage ">
                        <img src={user?.photo} alt="User" />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-xl-4 col-lg-6 mb-3">
                      <h4 className="secondaryLabel">User Name</h4>
                      <p className="secondaryText">{fullName(user)}</p>
                    </div>

                    <div className="col-xl-4 col-lg-6 mb-3">
                      <h4 className="secondaryLabel">Email Address</h4>
                      <p className="secondaryText">{user?.email}</p>
                    </div>
                    <div className="col-xl-4 col-lg-6 mb-3">
                      <h4 className="secondaryLabel">Phone No</h4>
                      <p className="secondaryText">
                        <span>{getCountryFlag(user.phone)}</span>
                        {user?.phone}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-3 flex-wrap">
                    <CustomButton
                      type="button"
                      variant="site-btn primary-btn "
                      className="px-5"
                      text="Edit Profile"
                      onClick={() => {
                        navigate("/admin/edit-profile");
                      }}
                    />
                    <CustomButton
                      type="button"
                      className="site-btn secondary-btn"
                      text="Change Password"
                      onClick={() => {
                        navigate("/admin/change-password");
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Profile;
