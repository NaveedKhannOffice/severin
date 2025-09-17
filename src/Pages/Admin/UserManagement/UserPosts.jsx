import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
// import { postData } from "../../../Components/SocialMediaPost/PostData";
// import SocialMediaPost from "../../../Components/SocialMediaPost/SocialMediaPost";
import "./style.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAll } from "../../../Services/Api";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import LoadingSpinner from "../../../Components/Loader";

const UserPosts = () => {
  const { userId } = useParams();
  const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/posts/${userId}`;
      const response = await getAll(url);
      if (response.status) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      stopSubmitting(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, [userId]);

  return (
    <DashboardLayout pageTitle="Post">
      <div className="container-fluid">
        <div className="row my-4">
          <div className="col-12 d-flex">
            <BackButton />
            <h2 className="mainTitle mb-0">Post</h2>
          </div>
        </div>
        {/* {isSubmitting ? (
          <LoadingSpinner />
        ) : posts?.length > 0 ? (
          posts.map((item, index) => (
            <SocialMediaPost postData={item} key={index} getPosts={getPosts} />
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-muted">Posts not available for this user</p>
          </div>
        )} */}
      </div>
    </DashboardLayout>
  );
};

export default UserPosts;
