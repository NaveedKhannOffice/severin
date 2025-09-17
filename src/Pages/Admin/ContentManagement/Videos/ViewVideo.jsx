import { useEffect, useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../../Components/Common/BackButton";
import { Select } from "../../../../Components/Common/FormElements/SelectInput";
import { statusOptions } from "../../../../Config/TableStatus";
import withModal from "../../../../HOC/withModal";
import { isNullOrEmpty } from "../../../../Utils/helper";
import { videosData } from "../../../../Config/data";
// import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa6";
import { getDetails, post } from "../../../../Services/Api";

const ViewVideo = ({ showModal }) => {
  const { id } = useParams();
  const [video, setVideo] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const getVideo = async () => {
    const response = await getDetails(`/admin/videos/${id}`);
    if (response) {
      setVideo(response?.data);
    }
  };
  useEffect(() => {
    getVideo();
  }, [id]);

  const handleStatusChange = (e) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `${newStatusValue === "1" ? "Active" : "Inactive"} video`,
      `Are you sure you want to ${
        newStatusValue === "1" ? "Activate" : "Inactivate"
      } this video?`,
      () => onConfirmStatusChange(newStatusValue)
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChange = async (newStatusValue) => {
    const response = await post(`/admin/videos/${id}/status`);
    if (response.status) {
      getVideo();
      showModal(
        "Successful",
        `This video has been ${
          newStatusValue === "1" ? "Activated" : "Inactivated"
        } successfully!`,
        null,
        true
      );
    }
  };

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  if (isNullOrEmpty(video)) {
    return (
      <DashboardLayout pageTitle="View video">
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-12 my-4 d-flex">
              <BackButton url={`/admin/content-management?tab=videos`} />
              <h2 className="mainTitle mb-0">View Video</h2>
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
    <DashboardLayout pageTitle="View video">
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12 my-4 d-flex">
            <BackButton url={`/admin/content-management?tab=videos`} />
            <h2 className="mainTitle mb-0">View Video</h2>
          </div>
          <div className="col-12">
            <div className="dashCard mb-4">
              <div className="row mb-3">
                <div className="col-12 col-sm-8">
                  <h4 className="secondaryLabel">Video Title</h4>
                  <p className="secondaryText wrapText mb-0">{video.title}</p>
                </div>
                <div className="col-12 col-sm-4 d-flex mt-3 mt-sm-0 justify-content-end">
                  <Select
                    className={`tabel-select status${video?.status}`}
                    id={`status${video?.id}`}
                    name="status"
                    label="Status:"
                    value={video?.status}
                    onChange={(e) => handleStatusChange(e)}
                    isInputNeeded={false}
                  >
                    {statusOptions}
                  </Select>
                </div>
                <div className="col-12 col-md-8 col-xl-6 mt-4">
                  <h4 className="secondaryLabel">Description</h4>
                  <p className="secondaryText mb-0">{video.description}</p>
                </div>
                <div className="col-12 my-4 py-3">
                  {video.category === "premium" ? (
                    <div>
                      <IoCheckmarkSharp size={24} color="green" />
                      <p className="ms-2 d-inline secondaryText fw-bold">
                        For Premium
                      </p>
                    </div>
                  ) : (
                    <div>
                      <IoCheckmarkSharp size={24} color="green" />
                      <p className="ms-2 d-inline secondaryText fw-bold">
                        For Free
                      </p>
                    </div>
                  )}
                </div>
                <div className="col-12">
                  <h4 className="secondaryText">Video</h4>
                </div>
                <div style={{ position: "relative" }}>
                  {video?.video && (
                    <>
                      {/* <ReactPlayer
                        height={"100%"}
                        width={"100%"}
                        controls={isPlaying}
                        playing={isPlaying}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        url={video?.video?.media_path}
                      /> */}
                      {/* Conditionally show the FaPlay icon when the video is paused */}
                      {!isPlaying && (
                        <div
                          onClick={handlePlayPause} // Play the video on clicking the icon
                          className="videoPlayButton"
                        >
                          <FaPlay className="ps-2" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="mt-5 d-flex gap-3">
                <Link
                  className="site-btn primary-btn text-decoration-none"
                  to={"edit"}
                >
                  Edit Video
                </Link>
                {/* <CustomButton className="site-btn secondary-btn text-decoration-none" onClick={() => handleRemove(video.id)}>
                  Remove
                </CustomButton> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(ViewVideo);
