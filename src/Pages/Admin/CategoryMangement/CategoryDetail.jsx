import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import CustomButton from "../../../Components/Common/CustomButton";
import { categoryManagementData } from "../../../Config/data";
import withModal from "../../../HOC/withModal";
import CustomButtonLink from "../../../Components/Common/CustomButtonLink";

const CategoryDetail = ({ showModal }) => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const response = categoryManagementData.detail.data.find(
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
      ` ${detailData.status ? "Inactive category" : "active category"}`,
      ` Are you sure you want to ${
        detailData.status ? "Inactivate" : "Activate"
      } this Category?`,
      () => updateStatus(status, id)
    );
  };

  // Second Modal
  const updateStatus = async (status, id) => {
    showModal(
      "Succesful",
      `Profile has been ${
        detailData.status ? "inactivated" : "activated"
      } successfully!`,
      null,
      true
    );
  };

  const { status, status_detail, category_name, total_words, total_pharas } =
    detailData;

  return (
    <DashboardLayout pageTitle="Category details">
      <div className="row my-3">
        <div className="col-12 ">
          <h2 className="mainTitle">
            <BackButton />
            Category details
          </h2>
        </div>
      </div>
      <div className="dashCard ">
        <div className="row ">
          <div className="col-12 col-sm-6 order-2 order-sm-1">
            {[
              { label: "category name:", value: category_name },
              { label: "total words:", value: total_words },
              { label: "total phrase:", value: total_pharas },
            ].map(({ label, value }, i) => (
              <div className={`row ${i == 0 ? "" : "my-4"}`} key={label}>
                <div className="col-12">
                  <h4 className="secondaryLabel">{label}</h4>
                </div>
                <div className="col-12">
                  <p className="secondaryText mb-0">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-12 col-sm-6 order-1 order-sm-2 mb-4 ">
            <div className="profile-status d-flex  flex-column gap-3 align-items-end ">
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
            linkPath={`/admin/category-management/edit/${detailData.id}`}
            className="site-btn primary-btn"
            text="Edit"
          />
        </CustomButton>
      </div>
    </DashboardLayout>
  );
};

export default withModal(CategoryDetail);
