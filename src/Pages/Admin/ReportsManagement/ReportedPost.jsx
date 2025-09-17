import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
// import SocialMediaPost from "../../../Components/SocialMediaPost/SocialMediaPost";
import { getDetails } from "../../../Services/Api";

const ReportedPost = () => {
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPost = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getDetails(`/admin/posts/get/${id}`);
      if (response.status) {
        setPost(response.data);
      } else {
        setError("Failed to load post.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);

  return (
    <DashboardLayout pageTitle="Post">
      <div className="container-fluid">
        <div className="row my-4">
          <div className="col-12 d-flex align-items-center">
            <BackButton />
            <h2 className="mainTitle mb-0 ms-3">Post</h2>
          </div>
        </div>

        {/* {loading ? (
          <div className="text-center my-5">
            <p>Loading...</p>
          </div>
        {/* ) : error ? (
          <div className="text-center text-danger my-5">
            <p>{error}</p>
          </div>
        ) : (
          // <SocialMediaPost postData={post} />
        )} */}
      </div>
    </DashboardLayout>
  );
};

export default ReportedPost;
