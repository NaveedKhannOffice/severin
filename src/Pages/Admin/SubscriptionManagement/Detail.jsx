import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import { subscriptionManagementData } from "../../../Config/data";
import withModal from "../../../HOC/withModal";
import CustomButtonLink from "../../../Components/Common/CustomButtonLink";

const SubscriptionDetail = ({ showModal }) => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const response = subscriptionManagementData.detail.data.find(
        (e) => e.id === Number(id)
      );

      // const response = await getDetails(`/admin-api/users/${id}`);
      if (response) {
        // setDetailData(response.detail);
        setDetailData(response);
      }
    };
    getUser();
  }, [id]);

  const handleStatusChange = (id, status) => {
    showModal(
      `mark as  ${detailData.status ? "Inactive " : "active "}`,
      ` Are you sure you want to ${
        detailData.status ? "Inactivate" : "Activate"
      } this Subscription plan?`,
      () => updateStatus(status, id)
    );
  };

  // Second Modal
  const updateStatus = async (status, id) => {
    showModal(
      "Succesful",
      `Subscription plan has been ${
        detailData.status ? "inactivated" : "activated"
      } successfully!`,
      null,
      true
    );
  };

  const {
    status,
    status_detail,
    subscription_title,
    subscription_type,
    total_amount,
    description,
  } = detailData;

  return (
    <DashboardLayout pageTitle="Subscription details">
      <div className="row my-3">
        <div className="col-12 ">
          <h2 className="mainTitle">
            <BackButton />
            Subscription details
          </h2>
        </div>
      </div>
      <div className="dashCard ">
        <div className="row ">
          <div className="col-12">
            <div className="d-flex gap-4 justify-content-between flex-md-nowrap flex-wrap-reverse ">
              <div>
                {[
                  { label: "subscription title:", value: subscription_title },
                  { label: "subscription type:", value: subscription_type },
                  { label: "amount:", value: total_amount },
                  { label: "description:", value: description },
                ].map(({ label, value }, i) => (
                  <div className={`row ${i == 0 ? "" : "my-4"}`} key={label}>
                    <div className="col-12 col-md-10 col-xl-8 col-xxl-7">
                      <h4 className="secondaryLabel">{label}</h4>
                      <p className="secondaryText mb-0">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-shrink-0 profile-status-wrapper">
                <div className="profile-status d-flex flex-column gap-3 align-items-end">
                  <div className="status-primary">
                    <label className="blackColor font-medium">Status : </label>
                    <span
                      className={`ms-1 fw-bold ${
                        status ? "greenColor" : "redColor"
                      }`}
                    >
                      {status_detail === "Active" ? "Active " : "Inactive"}
                    </span>
                  </div>
                  <div className="status-action">
                    <CustomButton
                      type="button"
                      className={`site-btn ${
                        status_detail === "Active"
                          ? "secondary-btn"
                          : " secondary-btn"
                      }`}
                      onClick={handleStatusChange}
                    >
                      <span>Mark As </span>
                      {status_detail === "Active" ? "Inactive" : "Active"}
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
            <CustomButton variant="site-btn primary-btn">
              <CustomButtonLink
                linkPath={`/admin/subscription-management/edit/${detailData.id}`}
                className="site-btn primary-btn px-5"
                text="Edit"
              />
            </CustomButton>{" "}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(SubscriptionDetail);
