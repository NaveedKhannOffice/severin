// import { useEffect, useState } from "react";
// import { FaXmark } from "react-icons/fa6";
// import { FiUploadCloud } from "react-icons/fi";
// import "./index.css";

// const VideoUploader = ({
//   label = "Video",
//   onChange,
//   errorFromParent,
//   name,
//   setFieldValue,
//   video,
// }) => {
//   const [videoPreview, setVideoPreview] = useState(null);

//   useEffect(() => {
//     if (video && typeof video === "string") {
//       setVideoPreview(video); // Preload existing video
//     }
//   }, [video]);

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideoPreview(URL.createObjectURL(file));
//       if (setFieldValue) {
//         setFieldValue(name, file);
//       } else {
//         onChange && onChange(e); // Fallback if setFieldValue not used
//       }
//     }
//   };

//   const handleRemove = () => {
//     setVideoPreview(null);
//     if (setFieldValue) {
//       setFieldValue(name, "");
//     }
//   };

//   return (
//     <div className="mb-3 position-relative">
//       {label && <label className="form-label fw-medium">{label}</label>}

//       <div
//         className={`video-upload-box ${
//           videoPreview ? "p-0 lh-1 border-0" : "p-3"
//         } ${errorFromParent ? "border-danger" : ""}`}
//         style={{
//           border: `1px solid ${errorFromParent ? "#dc3545" : "#dbdbdb"}`,
//           borderRadius: "15px",
//           textAlign: "center",
//           position: "relative",
//           cursor: "pointer",
//         }}
//       >
//         {videoPreview ? (
//           <>
//             <video
//               className="p-0"
//               controls
//               style={{ width: "100%", borderRadius: "10px" }}
//             >
//               <source src={videoPreview} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <button
//               type="button"
//               className="videoRemoveButton"
//               onClick={handleRemove}
//             >
//               <FaXmark className="me-1" />
//             </button>
//           </>
//         ) : (
//           <>
//             <label htmlFor={name} style={{ cursor: "pointer" }}>
//               <div>
//                 <div
//                   style={{
//                     width: "50px",
//                     height: "50px",
//                     margin: "0 auto",
//                     background: "#d9efff",
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <FiUploadCloud size={24} color="#2196f3" />
//                 </div>
//                 <p className="mt-2 mb-0 fw-medium">Upload Video</p>
//               </div>
//             </label>
//             <input
//               type="file"
//               id={name}
//               name={name}
//               accept="video/*"
//               style={{ display: "none" }}
//               onChange={handleVideoChange}
//             />
//           </>
//         )}
//       </div>

//       {errorFromParent && (
//         <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
//           {errorFromParent}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoUploader;

import { useEffect, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { FiUploadCloud } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import "./index.css";

const VideoUploader = ({
  label = "Video",
  onChange,
  errorFromParent,
  name,
  setFieldValue,
  video,
  poster,
}) => {
  const [videoPreview, setVideoPreview] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (video && typeof video === "string") {
      setVideoPreview(video);
    }
  }, [video]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      if (setFieldValue) {
        setFieldValue(name, file);
      } else {
        onChange && onChange(file);
      }
    }
  };

  const handleRemove = () => {
    setVideoPreview(null);
    setIsPlaying(false);
    if (setFieldValue) {
      setFieldValue(name, "");
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="mb-3 position-relative">
      {label && <label className="form-label fw-medium">{label}</label>}

      <div
        className={`video-upload-box ${videoPreview ? "p-0" : "p-3"} ${
          errorFromParent ? "border-danger" : ""
        }`}
        style={{
          border: `1px solid ${errorFromParent ? "#dc3545" : "#dbdbdb"}`,
          borderRadius: "15px",
          textAlign: "center",
          position: "relative",
          cursor: "pointer",
        }}
      >
        {videoPreview ? (
          <>
            <div className="custom-video-wrapper">
              <video
                ref={videoRef}
                src={videoPreview}
                poster={poster}
                className="custom-video"
                controls={isPlaying}
                onEnded={() => setIsPlaying(false)}
                onPause={(e) => {
                  if (e.target.currentTime !== e.target.duration) {
                    setIsPlaying(false);
                  }
                }}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              {!isPlaying && (
                <>
                  <div className="video-overlay" />
                  <button
                    type="button"
                    className="play-button"
                    onClick={handlePlay}
                  >
                    <FaPlay size={32} color="#fff" />
                  </button>
                </>
              )}
              <button
                type="button"
                className="videoRemoveButton"
                onClick={handleRemove}
              >
                <FaXmark className="me-1" />
              </button>
            </div>
          </>
        ) : (
          <>
            <label htmlFor={name} style={{ cursor: "pointer" }}>
              <div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    margin: "0 auto",
                    background: "#d9efff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FiUploadCloud size={24} color="#2196f3" />
                </div>
                <p className="mt-2 mb-0 fw-medium">Upload Video</p>
              </div>
            </label>
            <input
              type="file"
              id={name}
              name={name}
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleVideoChange}
            />
          </>
        )}
      </div>

      {errorFromParent && (
        <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
          {errorFromParent}
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
