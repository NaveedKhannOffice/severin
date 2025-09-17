// import React, { useEffect, useState } from "react";
// import { BiCheck, BiCheckDouble } from "react-icons/bi";
// import { FaBars, FaMicrophone, FaSearch } from "react-icons/fa";
// import { FaPaperPlane, FaXmark } from "react-icons/fa6";
// import { IoIosCamera } from "react-icons/io";
// import InputEmoji from "react-input-emoji";
// import ScrollToBottom from "react-scroll-to-bottom";
// import Styles from "./chat.module.css";
// import TextInput from "../../../Components/Common/FormElements/TextInput/index";
// import { chat_box, loginCredentials, sidebar } from "../../../Config/data";
// import { usePageTitle } from "../../../Utils/helper";
// import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
// import CustomButton from "../../../Components/Common/CustomButton";

// // Add this css in global styles to change emoji picker icon color
// // .react-input-emoji--button__show svg {
// //   fill: var(--gradient15) !important;
// // }
// const Chat = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [messageInput, setMessageInput] = useState("");
//   const [sideData, setSideData] = useState([]);
//   const [chatBox, setChatBox] = useState([]);
//   const [currentUserData, setCurrentUserData] = useState({});
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [files, setFiles] = useState([]); // State for handling file uploads
//   const [chatFilter, setChatFilter] = useState("all");

//   useEffect(() => {
//     setSideData(sidebar);
//     setChatBox(chat_box);
//     setCurrentUserData(loginCredentials);
//   }, []);
//   usePageTitle("Chat");
//   const handleUserClick = (user) => {
//     // Handle user click logic
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleFileChange = (e) => {
//     // Handle file selection
//     // setFile(e.target.files[0]);
//     const selectedFiles = Array.from(e.target.files);
//     setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
//   };

//   const deleteFile = (index) => {
//     const updatedFiles = [...files];
//     updatedFiles.splice(index, 1);
//     setFiles(updatedFiles);
//   };
//   const handlePressEnter = (e) => {
//     if (e.key === "Enter") {
//       handleSend();
//     }
//   };
//   const handleSend = () => {
//     if (!messageInput && files.length < 1) {
//       return;
//     }
//     // Handle sending message with file
//     // Example logic to send message and reset input states
//     const newMessage = {
//       "user-id": currentUserData["user-id"],
//       name: currentUserData["full-name"],
//       message: messageInput,
//       picture: currentUserData["photo-path"],
//       time: new Date().toLocaleTimeString(),
//       date: new Date().toLocaleDateString(),
//       files: files, // Use 'files' state to include files in the message object
//     };

//     // Update chatBox state with new message
//     setChatBox((prevChatBox) => [...prevChatBox, newMessage]);

//     // Clear messageInput and file state
//     setMessageInput(``);
//     setFiles([]);
//   };

//   return (
//     <DashboardLayout>
//       <section className={"container-fluid my-4"}>
//         <div className={`d-flex justify-content-between align-items-center mb-xl-0 mb-3`}>
//           <h2 className={`mainTitle mb-xl-4 mb-0`}>Customer Support</h2>
//           <button className={`${Styles[`sidebar-toggle`]} ${Styles[`chatToggleButton`]}`} onClick={toggleSidebar}>
//             <FaBars />
//           </button>
//         </div>
//         <div className={`${Styles[`chat-module`]}`}>
//           <div className={`${Styles[`chat-sidebar`]} ${isSidebarOpen ? `${Styles.open}` : ``}`}>
//             <button className={`d-xl-none d-block ${Styles.sidebarCloseBtn}`} onClick={() => setIsSidebarOpen(false)}>
//               <FaXmark />
//             </button>
//             <div className="px-4">
//               <TextInput
//                 labelclass="mainLabel flex-shrink-0 mb-0"
//                 type="text"
//                 wrapperClass="mb-0 flex-grow-1 "
//                 placeholder="Search Here..."
//                 inputclass="mainInput"
//                 id="search"
//                 rightIcon={FaSearch}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <div className="d-flex justify-content-center flex-wrap gap-3 my-2">
//               <CustomButton
//                 style={{ minWidth: 90 }}
//                 onClick={() => {
//                   setChatFilter("all");
//                 }}
//                 className={`site-btn ${chatFilter === "all" ? "primary-btn-2" : "secondary-btn-2"} px-3 py-2 mt-3`}
//                 text="All"
//               />
//               <CustomButton
//                 style={{ minWidth: 90 }}
//                 onClick={() => {
//                   setChatFilter("read");
//                 }}
//                 text="Read"
//                 className={`site-btn ${chatFilter === "read" ? "primary-btn-2" : "secondary-btn-2"} px-3 py-2 mt-3`}
//               />
//               <CustomButton
//                 style={{ minWidth: 90 }}
//                 onClick={() => {
//                   setChatFilter("unread");
//                 }}
//                 text="Unread"
//                 className={`site-btn ${chatFilter === "unread" ? "primary-btn-2" : "secondary-btn-2"} px-3 py-2 mt-3`}
//               />
//             </div>
//             <ul>
//               {sideData?.map((user, i) => (
//                 <div className={`${Styles.sidebarChat} my-3 ${user.isOpen ? `isOpen` : `close`}`} key={i} onClick={() => handleUserClick(user)}>
//                   <div className={`flex-shrink-0`}>
//                     <img src={user["photo-path"]} alt={`asdas`} className={Styles.chatHeaderImg} />
//                   </div>
//                   <div className={`flex-grow-1`}>
//                     <h6 className={`mb-0`}>{user.name}</h6>
//                     <p className={`mb-0`}>{user.message}</p>
//                   </div>
//                   <div>
//                     <p className={`img-fluid ${Styles["noti-tag-time"]} mb-0`}>{user.time}</p>
//                     {user.delivered && <span className={`${Styles.chatBadge} ms-auto`}>{user.notification}</span>}
//                   </div>
//                 </div>
//               ))}
//             </ul>
//           </div>

//           <div className={`${Styles["chat-area"]}`}>
//             {chatBox ? (
//               <div className={`${Styles["chat-window"]}`}>
//                 <div className={`${Styles.chatHeader} gap-3`}>
//                   <p>Athalia Putri</p>
//                 </div>

//                 <div className={Styles.messages}>
//                   <ScrollToBottom className={Styles.messages}>
//                     {chatBox.map((message, index) => (
//                       <div
//                         key={index}
//                         className={`${Styles.message} ${message["user-id"] !== currentUserData?.["user-id"] ? Styles["other-message"] : Styles["my-message"]}`}
//                       >
//                         {message.message && <p className={``}>{message?.message}</p>}
//                         {message.files &&
//                           message.files.map((file, index) => (
//                             <div className={`my-3 ${Styles.uploadImg}`} key={index}>
//                               <img src={URL.createObjectURL(file)} alt={`Uploaded File`} className={`img-fluid`} />
//                             </div>
//                           ))}
//                         <div className={`d-flex justify-content-end align-items-center flex-wrap gap-3`}>
//                           {
//                             <div className={`d-flex gap-2 align-items-center flex-wrap`}>
//                               <div className={`d-flex align-items-center gap-2`}>
//                                 <p className={`mb-0`}>{message?.time}</p>
//                                 {message["user-id"] == currentUserData?.["user-id"] && (
//                                   <p className={`mb-0`}>{message?.seen ? <BiCheckDouble size={25} color="#53A6EC" /> : <BiCheck size={24} color="#666" />}</p>
//                                 )}{" "}
//                               </div>
//                             </div>
//                           }
//                         </div>
//                       </div>
//                     ))}
//                   </ScrollToBottom>
//                 </div>

//                 {files.length > 0 && (
//                   <div className={files ? Styles.uploadedFiles : ``}>
//                     {files.map((item, index) => (
//                       <div className={`${Styles.isFileVisible}`}>
//                         <div className={`${Styles.fileVisible}`} key={index}>
//                           <img src={URL.createObjectURL(item)} alt={`Uploaded File`} className={`img-fluid`} />
//                           <button onClick={() => deleteFile(index)} className={`${Styles.deleteBtn}`}>
//                             <FaXmark />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//                 <div className={`${Styles["input-area"]}`}>
//                   <div className={`${Styles.fileUpload}`}>
//                     {/* <label htmlFor={`uploader`}>
//                       <IoIosCamera size={32} />
//                     </label> */}
//                     <input type={`file`} id={`uploader`} onChange={handleFileChange} multiple hidden={true} />
//                   </div>
//                   <InputEmoji
//                     keepOpened={true}
//                     borderRadius={5}
//                     borderColor="#e4e4e4"
//                     value={messageInput}
//                     onChange={setMessageInput}
//                     onKeyDown={handlePressEnter}
//                     placeholder="Type a message"
//                   ></InputEmoji>
//                   <div className={`${Styles["input-area-inner"]}`}>
//                     <button>
//                       <FaMicrophone size={24} />
//                     </button>
//                     <button disabled={!(messageInput || files.length)} onClick={handleSend}>
//                       <FaPaperPlane size={24} color={messageInput || files.length ? "#1819ff" : "#999"} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className={`${Styles["no-chat-selected"]}`}>Select a user to start chat</div>
//             )}
//           </div>
//         </div>
//       </section>
//     </DashboardLayout>
//   );
// };

// export default Chat;

import React, { useEffect, useState } from "react";
import { BiCheck, BiCheckDouble } from "react-icons/bi";
import { FaBars, FaMicrophone, FaSearch } from "react-icons/fa";
import { FaPaperPlane, FaXmark } from "react-icons/fa6";
import { IoIosAttach, IoIosCamera, IoIosMic } from "react-icons/io";
import InputEmoji from "react-input-emoji";
import ScrollToBottom from "react-scroll-to-bottom";
import Styles from "./chat.module.css";
import TextInput from "../../../Components/Common/FormElements/TextInput/index";
import { usePageTitle } from "../../../Utils/helper";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomButton from "../../../Components/Common/CustomButton";
import { Container } from "react-bootstrap";
import { getAll, post } from "../../../Services/Api";
import { useAuth } from "../../../Hooks/useAuth";
import { io } from "socket.io-client";

const AdminChat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const [messageInput, setMessageInput] = useState("");
  const [sideData, setSideData] = useState([]);
  const [chatBox, setChatBox] = useState([]);
  const [currentUserData, setCurrentUserData] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [chatFilter, setChatFilter] = useState("all");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io("https://custom-dev.onlinetestingserver.com:3140/", {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Socket.IO connected!");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  // Join a room when a chat is selected
  useEffect(() => {
    if (socket && selectedChatId) {
      socket.emit("joinRoom", selectedChatId);
    }
  }, [socket, selectedChatId]);

  // Listen for new messages
  useEffect(() => {
    if (socket) {
      socket.on(selectedChatId, (message) => {
        console.log("New message received:", message);

        setChatBox((prevChatBox) => [...prevChatBox, message]);

        setSideData((prevSideData) => {
          const existingChatIndex = prevSideData.findIndex(
            (chat) => chat.id === message.chat_id
          );

          let updatedChats = [...prevSideData];

          if (existingChatIndex >= 0) {
            const [existingChat] = updatedChats.splice(existingChatIndex, 1);

            const updatedChat = {
              ...existingChat,
              last_message: {
                message: message.message || "File attached",
                time: message.time,
              },
              time: message.time,
              unread:
                message.senderId !== user.id
                  ? (existingChat.unread || 0) + 1
                  : 0,
            };

            updatedChats.unshift(updatedChat);
          }

          return updatedChats;
        });
      });

      socket.on(user.id, (message) => {
        getChatList();
      });

      return () => {
        socket.off(selectedChatId);
      };
    }
  }, [socket, selectedChatId, user.id]);

  useEffect(() => {
    setCurrentUserData(user);
  }, [user]);

  const getChatList = async () => {
    let statusParam = "";
    if (chatFilter === "read") statusParam = "status=read";
    if (chatFilter === "unread") statusParam = "status=unread";

    const queryParams = new URLSearchParams();
    if (statusParam) queryParams.append("status", chatFilter);
    if (searchQuery) queryParams.append("search", searchQuery);

    const response = await getAll(
      `/admin/chat/getChatList?${queryParams.toString()}`
    );

    if (response && response.data) {
      const chatList = response.data;
      const sortedChats = chatList.sort((a, b) => {
        const timeA = a.last_message?.time || a.time;
        const timeB = b.last_message?.time || b.time;
        return new Date(timeB) - new Date(timeA);
      });

      setSideData(sortedChats);
    }
  };

  useEffect(() => {
    getChatList();
  }, [chatFilter, searchQuery]);

  useEffect(() => {
    if (selectedChatId) {
      const getAdminChat = async () => {
        const response = await getAll(`/admin/chat/getChat/${selectedChatId}`);
        if (response && response.data) {
          setChatBox(response.data);
          // Mark messages as read when opening chat
          // await markMessagesAsRead(selectedChatId);
        }
      };
      getAdminChat();
    }
  }, [selectedChatId]);

  usePageTitle("Admin Chat");

  const markMessagesAsRead = async (chatId) => {
    try {
      await post(`/admin/chat/markAsRead`, { chatId });
      setSideData((prev) =>
        prev.map((chat) => (chat.id === chatId ? { ...chat, unread: 0 } : chat))
      );
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const handleUserClick = async (chat) => {
    getChatList();

    setSelectedChatId(chat.id);
    setSelectedUserId(chat.user_id);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const deleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleVoiceRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        const audioChunks = [];

        recorder.ondataavailable = (e) => {
          audioChunks.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(audioChunks, { type: "audio/wav" });
          setAudioBlob(blob);
          stream.getTracks().forEach((track) => track.stop());
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);

        setTimeout(() => {
          if (isRecording) {
            recorder.stop();
            setIsRecording(false);
          }
        }, 120000);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    } else {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleSend = async () => {
    if (!messageInput && files.length < 1 && !audioBlob) return;

    try {
      const newMessage = {
        chat_id: selectedChatId,
        receiverId: selectedUserId,
        senderId: currentUserData.id,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: new Date().toLocaleDateString(),
      };

      if (messageInput) newMessage.message = messageInput;
      if (files.length > 0) {
        files.forEach((file, index) => {
          newMessage[`file[${index}]`] = file;
        });
      }

      if (audioBlob) {
        const audioFile = new File(
          [audioBlob],
          `voice-message-${Date.now()}.mp3`,
          {
            type: "audio",
          }
        );
        newMessage[`file[${files.length}]`] = audioFile;
      }

      const response = await post(`/admin/chat/sendMessage`, newMessage);

      if (response.status) {
        if (socket) {
          newMessage[`files`] = response?.data?.files;

          socket.emit("sendMessage", {
            ...newMessage,
            user_id: currentUserData.id,
            receiverId: newMessage.receiverId,
            name: currentUserData.name,
            picture: currentUserData.image,
            chat_id: selectedChatId,
          });
        }

        const messageToDisplay = {
          ...newMessage,
          user_id: currentUserData.id,
          name: currentUserData.name,
          picture: currentUserData.image,
          files: files,
        };

        setMessageInput("");
        setFiles([]);
        setAudioBlob(null);

        setSideData((prev) => {
          const existingChatIndex = prev.findIndex(
            (chat) => chat.id === selectedChatId
          );
          let updatedChats = [...prev];

          if (existingChatIndex >= 0) {
            const [existingChat] = updatedChats.splice(existingChatIndex, 1);

            const updatedChat = {
              ...existingChat,
              last_message: {
                message: messageInput || "File attached",
                time: newMessage.time,
              },
              time: newMessage.time,
            };

            updatedChats.unshift(updatedChat);
          }

          return updatedChats;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const selectedUser = sideData.find((user) => user.id === selectedChatId);

  return (
    <DashboardLayout>
      <section className={"container-fluid my-4"}>
        <div
          className={`d-flex justify-content-between align-items-center mb-xl-0 mb-3`}
        >
          <h2 className={`mainTitle mb-xl-4 mb-0`}>Customer Support</h2>
          <button
            className={`${Styles[`sidebar-toggle`]} ${
              Styles[`chatToggleButton`]
            }`}
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>
        <div className={`${Styles[`chat-module`]}`}>
          <div
            className={`${Styles[`chat-sidebar`]} ${
              isSidebarOpen ? `${Styles.open}` : ``
            }`}
          >
            <button
              className={`d-xl-none d-block ${Styles.sidebarCloseBtn}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaXmark />
            </button>
            <div className="px-4">
              <TextInput
                labelclass="mainLabel flex-shrink-0 mb-0"
                type="text"
                wrapperClass="mb-0 flex-grow-1 "
                placeholder="Search Here..."
                inputclass="mainInput"
                id="search"
                rightIcon={FaSearch}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center flex-wrap gap-3 my-2">
              <CustomButton
                style={{ minWidth: 90 }}
                onClick={() => {
                  setChatFilter("all");
                }}
                className={`site-btn ${
                  chatFilter === "all" ? "primary-btn-2" : "secondary-btn-2"
                } px-3 py-2 mt-3`}
                text="All"
              />
              <CustomButton
                style={{ minWidth: 90 }}
                onClick={() => {
                  setChatFilter("read");
                  setSelectedChatId(null);
                }}
                text="Read"
                className={`site-btn ${
                  chatFilter === "read" ? "primary-btn-2" : "secondary-btn-2"
                } px-3 py-2 mt-3`}
              />
              <CustomButton
                style={{ minWidth: 90 }}
                onClick={() => {
                  setChatFilter("unread");
                  setSelectedChatId(null);
                }}
                text="Unread"
                className={`site-btn ${
                  chatFilter === "unread" ? "primary-btn-2" : "secondary-btn-2"
                } px-3 py-2 mt-3`}
              />
            </div>
            <ul>
              {sideData?.map((user, i) => (
                <div
                  className={`${Styles.sidebarChat} my-3 ${
                    user.unread ? `isOpen` : `close`
                  }`}
                  key={i}
                  onClick={() => handleUserClick(user)}
                >
                  <div className={`flex-shrink-0`}>
                    <img
                      src={user?.image}
                      alt={`Profile`}
                      className={Styles.chatHeaderImg}
                    />
                  </div>
                  <div className={`flex-grow-1`}>
                    <h6 className={`mb-0`}>
                      {user.name}{" "}
                      {user?.booking?.booking_id
                        ? `(${user.booking.booking_id})`
                        : ""}
                    </h6>
                    <p className={`mb-0 ${user?.unread ? "font-bold" : ""}`}>
                      {user?.last_message?.message || ""}
                      {user?.unread > 0 && `(${user.unread})`}
                    </p>
                  </div>
                  <div>
                    <p className={`img-fluid ${Styles["noti-tag-time"]} mb-0`}>
                      {user?.last_message?.time || ""}
                    </p>
                  </div>
                </div>
              ))}
            </ul>
          </div>

          <div className={`${Styles["chat-area"]}`}>
            {selectedChatId ? (
              <div className={`${Styles["chat-window"]}`}>
                <div className={`${Styles.chatHeader} gap-3`}>
                  <div className="flex-shrink-0">
                    <img
                      src={selectedUser?.image}
                      alt=""
                      className={Styles.chatHeaderImg}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0">{selectedUser?.name}</h6>
                  </div>
                </div>

                <div className={Styles.messages}>
                  <ScrollToBottom className={Styles.messages}>
                    {chatBox.map((message, index) => (
                      <div
                        key={index}
                        className={`${Styles.message} ${
                          message.user_id !== currentUserData?.id
                            ? Styles["other-message"]
                            : Styles["my-message"]
                        }`}
                      >
                        {message.message && (
                          <p className={``}>{message?.message}</p>
                        )}
                        {message.files &&
                          message.files.map((file, index) => (
                            <div
                              className={`my-3 ${Styles.uploadImg}`}
                              key={index}
                            >
                              {file?.type === "image" ? (
                                <img
                                  src={file.path}
                                  alt={`Uploaded File ${index}`}
                                  className="img-fluid"
                                />
                              ) : file?.type === "pdf" ? (
                                <div className={Styles.pdfPreview}>
                                  <a
                                    href={file.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <img
                                      src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                      alt="PDF Icon"
                                      style={{
                                        width: "48px",
                                        height: "48px",
                                        marginLeft: "10px",
                                      }}
                                    />
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                      }}
                                    >
                                      View PDF
                                    </div>
                                  </a>
                                </div>
                              ) : file?.type === "audio" ? (
                                <div className={Styles.audioPreview}>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "1rem",
                                    }}
                                  >
                                    <audio
                                      controls
                                      style={{ height: "32px", width: "220px" }}
                                    >
                                      <source
                                        src={file.path}
                                        type="audio/mpeg"
                                      />
                                      Your browser does not support the audio
                                      element.
                                    </audio>
                                  </div>
                                </div>
                              ) : (
                                <div className={Styles.filePreview}>
                                  <a
                                    href={file.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i
                                      className="fas fa-file"
                                      style={{ fontSize: "3rem" }}
                                    ></i>
                                    <div>Download File</div>
                                  </a>
                                </div>
                              )}
                            </div>
                          ))}
                        <div
                          className={`d-flex justify-content-end align-items-center flex-wrap gap-3`}
                        >
                          <div
                            className={`d-flex gap-2 align-items-center flex-wrap`}
                          >
                            <div className={`d-flex align-items-center gap-2`}>
                              <p className={`mb-0`}>{message?.time}</p>
                              {message.user_id === currentUserData?.id && (
                                <p className={`mb-0`}>
                                  {message?.seen ? (
                                    <BiCheckDouble size={25} color="#53A6EC" />
                                  ) : (
                                    <BiCheck size={24} color="#666" />
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollToBottom>
                </div>

                {files.length > 0 && (
                  <div className={files ? Styles.uploadedFiles : ``}>
                    {files.map((item, index) => (
                      <div className={`${Styles.isFileVisible}`} key={index}>
                        <div className={`${Styles.fileVisible}`}>
                          <img
                            src={URL.createObjectURL(item)}
                            alt={`Uploaded File`}
                            className={`img-fluid`}
                          />
                          <button
                            onClick={() => deleteFile(index)}
                            className={`${Styles.deleteBtn}`}
                          >
                            <FaXmark />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className={`${Styles["input-area"]}`}>
                  <div className={`d-flex ${Styles.fileUpload}`}>
                    <div>
                      <input
                        type={`file`}
                        id={`uploader`}
                        onChange={handleFileChange}
                        multiple
                        hidden={true}
                      />
                      <label htmlFor="uploader">
                        <IoIosAttach size={32} />
                      </label>
                    </div>

                    {isRecording ? (
                      <div
                        className={Styles.recordingIndicator}
                        onClick={handleVoiceRecording}
                      >
                        <IoIosMic size={32} color="white" />
                      </div>
                    ) : (
                      <button
                        className={Styles.micButton}
                        onClick={handleVoiceRecording}
                      >
                        <IoIosMic size={32} />
                      </button>
                    )}

                    {audioBlob && !isRecording && (
                      <div className={Styles.audioPreview}>
                        <audio controls src={URL.createObjectURL(audioBlob)} />
                        <button
                          className={Styles.cancelAudioButton}
                          onClick={() => setAudioBlob(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  <InputEmoji
                    keepOpened={true}
                    borderRadius={5}
                    borderColor="#e4e4e4"
                    value={messageInput}
                    onChange={setMessageInput}
                    onKeyDown={handlePressEnter}
                    placeholder="Type a message"
                  ></InputEmoji>
                  <div className={`${Styles["input-area-inner"]}`}>
                    <button
                      disabled={!(messageInput || files.length || audioBlob)}
                      onClick={handleSend}
                    >
                      <FaPaperPlane
                        size={24}
                        color={
                          audioBlob || messageInput || files.length
                            ? "#1819ff"
                            : "#999"
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${Styles["no-chat-selected"]}`}>
                Select a user to start chat
              </div>
            )}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AdminChat;
