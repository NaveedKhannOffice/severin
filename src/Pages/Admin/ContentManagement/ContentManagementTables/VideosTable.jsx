import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomTable from "../../../../Components/CustomTable";
import { Select } from "../../../../Components/Common/FormElements/SelectInput";
import { videosData } from "../../../../Config/data";
import { contentManagementVideoHeaders } from "../../../../Config/TableHeaders";
import { normalStatus, statusOptions } from "../../../../Config/TableStatus";
import withFilters from "../../../../HOC/withFilters";
import withModal from "../../../../HOC/withModal";
import { useFormStatus } from "../../../../Hooks/useFormStatus";
import { dateFormat, serialNum } from "../../../../Utils/helper";
import { getAll, post } from "../../../../Services/Api";

const VideosTable = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  const [videos, setVideos] = useState([]);
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();
  const fetchVideos = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/videos`;
      const response = await getAll(url, filters);
      if (response.status) {
        const { total, per_page, current_page, to } = response.meta;
        setVideos(response?.data);
        updatePagination({
          showData: to,
          currentPage: current_page,
          totalRecords: total,
          totalPages: Math.ceil(total / per_page),
        });
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      stopSubmitting(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [filters]);

  // Handle status change
  const handleStatusChange = (e, rowId) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `${newStatusValue === "1" ? "Active" : "Inactive"} Video`,
      `Are you sure you want to ${
        newStatusValue === "1" ? "Activate" : "Inactivate"
      } this Video?`,
      () => onConfirmStatusChange(rowId, newStatusValue)
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChange = async (rowId, newStatusValue) => {
    const response = await post(`/admin/videos/${rowId}/status`);
    if (response.status) {
      fetchVideos();
      showModal(
        "Successful",
        `This Video has been ${
          newStatusValue === "1" ? "Activated" : "Inactivated"
        } successfully!`,
        null,
        true
      );
    }
  };

  return (
    <div className="dashCard mt-4">
      <div className="row mb-3">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h4 className="dashTitle d-inline">Videos</h4>
            <Link
              to={"add-video"}
              className="site-btn primary-btn text-decoration-none"
            >
              Add Video
            </Link>
          </div>
          <CustomTable
            filters={filters}
            setFilters={setFilters}
            loading={isSubmitting}
            headers={contentManagementVideoHeaders}
            pagination={pagination}
            dateFilters={[
              {
                title: "Added Date",
                from: "from",
                to: "to",
              },
            ]}
            selectOptions={[
              {
                title: "Status",
                key: "status",
                options: normalStatus,
              },
            ]}
          >
            <tbody>
              {videos?.map((item, index) => (
                <tr key={item?.id}>
                  <td>
                    {serialNum(
                      (filters.page - 1) * filters.per_page + index + 1
                    )}
                  </td>
                  <td>{item?.title}</td>
                  <td>{dateFormat(item?.created_at)}</td>
                  <td>
                    <Select
                      className={`tabel-select status${item?.status}`}
                      required
                      id={`status${item?.id}`}
                      name="status"
                      value={item?.status}
                      onChange={(e) => handleStatusChange(e, item?.id)}
                      isInputNeeded={false}
                    >
                      {statusOptions}
                    </Select>
                  </td>
                  <td>
                    <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
                      <span className="tooltip-toggle" aria-label="View">
                        <Link to={`videos/${item.id}`}>
                          <FaEye size={20} color="#1819ff" />
                        </Link>
                      </span>
                      <span className="tooltip-toggle" aria-label="Edit">
                        <Link to={`videos/${item.id}/edit`}>
                          <FaEdit size={20} color="#1819ff" />
                        </Link>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        </div>
      </div>
    </div>
  );
};

export default withModal(withFilters(VideosTable));
