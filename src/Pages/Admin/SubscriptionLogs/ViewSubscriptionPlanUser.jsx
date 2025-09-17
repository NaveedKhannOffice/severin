import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { subscriptionPlansManagementData } from "../../../Config/data";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import { isNullOrEmpty } from "../../../Utils/helper";

const ViewSubscriptionPlanUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscriptionPlan, setSubscriptionPlan] = useState(
    subscriptionPlansManagementData.detail.data[0]
  );
  useEffect(() => {
    setSubscriptionPlan(
      subscriptionPlansManagementData.detail.data.find((blog) => blog.id === id)
    );
  }, [id]);

  if (isNullOrEmpty(subscriptionPlan)) {
    return (
      <DashboardLayout pageTitle="Subscription Detail">
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-12 my-4 d-flex">
              <BackButton />
              <h2 className="mainTitle mb-0">Subscription Detail</h2>
            </div>
            <div className="col-12">
              <div className="dashCard mb-4">loading...</div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout pageTitle="Subscription Detail">
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12 my-4 d-flex">
            <BackButton />
            <h2 className="mainTitle mb-0">Subscription Detail</h2>
          </div>
          <div className="col-12">
            <div className="dashCard mb-4">
              <div className="row mb-3">
                {[
                  {
                    label: "Subscription Title",
                    value: subscriptionPlan?.subscriptionTitle,
                  },
                  { label: "Duration", value: subscriptionPlan?.duration },
                  { label: "Price", value: subscriptionPlan?.price },
                ].map(({ label, value }) => (
                  <div className="col-12 mb-4">
                    <h4 className="secondaryLabel">{label}</h4>
                    {/* <p className="secondaryText wrapText mb-0">{label === "Duration" ? subscriptionDuration.find((d) => d.value == value).text : value}</p> */}
                    <p className="secondaryText wrapText mb-0">{value}</p>
                  </div>
                ))}
                <div className="col-12 col-md-8 col-xl-6">
                  <h4 className="secondaryLabel">Description</h4>
                  <p className="secondaryText mb-0">
                    {subscriptionPlan.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 mb-5 d-flex gap-3">
                <Link
                  style={{ width: 190 }}
                  className="site-btn primary-btn text-decoration-none"
                  to={"edit"}
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewSubscriptionPlanUser;
