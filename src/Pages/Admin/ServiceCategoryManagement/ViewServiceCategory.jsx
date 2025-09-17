import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { statusOptions } from "../../../Config/TableStatus";
import { serviceCategoryData } from "../../../Config/data";
import withModal from "../../../HOC/withModal";
import { isNullOrEmpty } from "../../../Utils/helper";
import { Link } from "react-router-dom";
import { getDetails, post } from "../../../Services/Api";

const ViewServiceCategory = ({ showModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({});
  const getCategory = async () => {
    const response = await getDetails(`/admin/categories/${id}`);
    if (response) {
      setCategory(response?.data);
    }
  };
  useEffect(() => {
    getCategory();
  }, [id]);

  if (isNullOrEmpty(category)) {
    return (
      <DashboardLayout pageTitle="Add Service Category">
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-12 my-4 d-flex">
              <BackButton />
              <h2 className="mainTitle mb-0">View Service Category</h2>
            </div>
            <div className="col-12">
              <div className="dashCard mb-4">loading...</div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  // Handle status change
  const handleStatusChange = (e, id) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `${newStatusValue === "1" ? "Active" : "Inactive"} Category`,
      `Are you sure you want to ${
        newStatusValue === "1" ? "Activate" : "Inactivate"
      } this category?`,
      () => onConfirmStatusChange(id, newStatusValue)
    );
  };
  const onConfirmStatusChange = async (row, newStatusValue) => {
    const response = await post(`/admin/categories/${row}/status`);
    if (response.status) {
      getCategory();
      showModal(
        "Successful",
        `This category has been ${
          newStatusValue === "1" ? "Activated" : "Inactivated"
        } successfully!`,
        null,
        true
      );
    }
  };

  return (
    <DashboardLayout pageTitle="View Service Category">
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12 my-4 d-flex">
            <BackButton />
            <h2 className="mainTitle mb-0">View Service Category</h2>
          </div>
          <div className="col-12">
            <div className="dashCard mb-4">
              <div className="row mb-3">
                <div className="col-12 col-sm-8">
                  <h4 className="secondaryLabel">Category Title</h4>
                  <p className="secondaryText wrapText mb-0">
                    {category?.category_title}
                  </p>
                </div>
                <div className="col-12 col-sm-4 d-flex mt-3 mt-sm-0 justify-content-end">
                  <Select
                    className={`tabel-select status${category?.status}`}
                    id={`status${category?.id}`}
                    name="status"
                    label="Status:"
                    value={category?.status}
                    onChange={(e) => handleStatusChange(e, category?.id)}
                    isInputNeeded={false}
                  >
                    {statusOptions}
                  </Select>
                </div>
              </div>
              <div className="row">
                <div className="col-12 my-4">
                  {category?.photo && (
                    <img
                      className="w-50 containedImg roundedBorders"
                      src={category.photo}
                    />
                  )}
                </div>
              </div>
              <div className="mt-4 mb-5">
                <Link
                  className="site-btn primary-btn text-decoration-none"
                  to={"edit"}
                >
                  Edit Category
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(ViewServiceCategory);
