import { useEffect, useState } from "react";
import { images } from "../Assets";
// import moment from "moment";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";

//set email
export const setEmail = (email) =>
  localStorage.setItem("email", JSON.stringify(email));
export const getEmail = () => JSON.parse(localStorage.getItem("email"));

//set emaiFAQsManagementl
export const setCode = (code) =>
  localStorage.setItem("code", JSON.stringify(code));
export const getCode = () => JSON.parse(localStorage.getItem("code"));

export const usePasswordToggle = () => {
  const [eyeIcon, seteyeIcon] = useState(faEyeSlash);
  const [passwordType, setPasswordType] = useState(0);

  const toggleIcon = () => {
    if (eyeIcon === faEyeSlash) {
      seteyeIcon(faEye);
      setPasswordType(1);
    } else {
      seteyeIcon(faEyeSlash);
      setPasswordType(0);
    }
  };

  return [eyeIcon, toggleIcon, passwordType];
};

export const usePasswordToggle2 = () => {
  const [eyeIcon2, seteyeIcon2] = useState(faEyeSlash);
  const [passwordType2, setPasswordType2] = useState(0);
  const toggleIcon2 = () => {
    if (eyeIcon2 == faEyeSlash) {
      seteyeIcon2(faEye);
      setPasswordType2(1);
    } else {
      seteyeIcon2(faEyeSlash);
      setPasswordType2(0);
    }
  };

  return [eyeIcon2, toggleIcon2, passwordType2];
};

export const usePasswordToggle3 = () => {
  const [eyeIcon3, seteyeIcon3] = useState(faEyeSlash);
  const [passwordType3, setPasswordType3] = useState(0);
  const toggleIcon3 = () => {
    if (eyeIcon3 == faEyeSlash) {
      seteyeIcon3(faEye);
      setPasswordType3(1);
    } else {
      seteyeIcon3(faEyeSlash);
      setPasswordType3(0);
    }
  };

  return [eyeIcon3, toggleIcon3, passwordType3];
};

//form builder
export const buildFormData = (formData, data, parentKey) => {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], key);
    });
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
};

export const buildProductFormData = (formData, data, parentKey = "") => {
  if (data instanceof File) {
    formData.append(parentKey, data);
  } else if (Array.isArray(data)) {
    data.forEach((item, index) => {
      buildProductFormData(formData, item, `${parentKey}[${index}]`);
    });
  } else if (data && typeof data === "object" && !(data instanceof Date)) {
    Object.keys(data).forEach((key) => {
      buildProductFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
};

//icon function

export const getIcon = (data) => {
  if (data === "user") {
    return images.statsAd1;
  }
  if (data === "restaurant") {
    return images.statsAd2;
  }
  if (data === "branch") {
    return images.statsRE1;
  }
  if (data === "orders") {
    return images.statsRE5;
  }
  if (data === "product") {
    return images.statsRE2;
  }
  if (data === "promo_code") {
    return images.statsRE3;
  }
  if (data === "late") {
    return images.statsRE4;
  }
  if (data === "rejected") {
    return images.statsRE3;
  }
};

export const cardLinks = (data) => {
  if (data === "user") {
    return "/user-management";
  }
  if (data === "restaurant") {
    return "/restaurant-management";
  }
  if (data === "branch") {
    return "/branch-management";
  }
  if (data === "orders") {
    return "/order-logs";
  }
  if (data === "product") {
    return "/product-management";
  }
  if (data === "promo_code") {
    return "/promocode-management";
  }
  if (data === "late") {
    return "/late-delivery-ratio";
  }
  if (data === "rejected") {
    return "/order-logs";
  }
};

export const getText = (data) => {
  if (data === "user") {
    return "Total Users";
  }
  if (data === "restaurant") {
    return "Total Restaurants";
  }
  if (data === "branch") {
    return "Total Branches";
  }
  if (data === "orders") {
    return "Total Orders";
  }
  if (data === "product") {
    return "Total Products";
  }
  if (data === "promo_code") {
    return "Total Promo Codes";
  }
  if (data === "late") {
    return "Late Orders";
  }
  if (data === "rejected") {
    return "Rejected Orders";
  }
};

export const dateFormat = (data, format = "MM/DD/YYYY") => {
  if (data) {
    return moment(data).format(format);
  } else {
    return "-";
  }
};

export const dateTimeFormat = (data) => {
  if (data) {
    const now = moment();
    const inputDate = moment(data);

    if (inputDate.isSame(now, "day")) {
      // If the given date is today, display only time
      return inputDate.format("hh:mm A");
    } else if (inputDate.isSame(now.clone().subtract(1, "day"), "day")) {
      // If the given date is yesterday, display 'Yesterday'
      return "Yesterday";
    } else {
      // If the given date is in the past, display the day name
      return inputDate.format("dddd");
    }
  } else {
    return "-";
  }
};

export const yearFormat = (data) => {
  if (data) {
    return moment(data).format("YYYY");
  } else {
    return "-";
  }
};

export const humanReadable = (data) => {
  if (data) {
    return moment(data).fromNow();
  }
};

export const bookingType = (type) => {
  if (type === "App\\Models\\Coach") {
    return "Coaching";
  } else {
    return "Mental Health Coach";
  }
};
export const sellerType = (type) => {
  if (type === "App\\Models\\Coach") {
    return "Coach";
  } else {
    return "Player";
  }
};

export const timeFormat = (time) => {
  return moment(time, "HH:mm").format("hh:mm A");
  // return moment(time).local().format("hh:mm A");
};

export const timeFormat2 = (time) => {
  return moment(time).local().format("hh:mm A");
};

// export const karachitime = (time) => {
//   // return moment(time).local().format("hh:mm A");
//   return moment.utc(time).tz("Asia/Karachi").format("hh:mm A");
// };

// export const convertUTCToLocalTime = (utcTime) => {
//   const localTimezone = moment.tz.guess();
//   // Create a moment object with the UTC time and specify the format
//   const utcDateTime = moment.utc(utcTime, "hh:mm A");
//   // Convert the UTC time to the specified timezone
//   return utcDateTime.tz(localTimezone).format("hh:mm A");
// };

export const convertUTCToLocalTime = (utcTime) => {
  return moment.utc(utcTime, "HH:mm").local().format("hh:mm A");
};

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const sortTimingsByDay = (timings) => {
  return timings.sort((a, b) => {
    return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
  });
};

export const actor = () => {
  const data = getRole();
  if (data === "admin") {
    return "/admin-api";
  } else if (data === "restaurant") {
    return "/restaurant-api";
  } else {
    return "/branch-api";
  }
};

// export const usePageTitle = (title="",) => {
//   const name = window.location.pathname
//     .split(process.env.REACT_APP_BASE_NAME + "/")[1]
//     .split("/")[0]
//     .replace(/^\w/, (c) => c.toUpperCase());
//   useEffect(() => {
//     document.title = process.env.REACT_APP_WEBSITE_NAME + " " + name + " | " + title.charAt(0).toUpperCase() + title.slice(1);
//   }, [title]);
// };
export const usePageTitle = (title = "", user = false) => {
  const name = window.location.pathname
    .split(process.env.REACT_APP_BASE_NAME + "/")[1]
    .split("/")[0]
    .replace(/^\w/, (c) => c.toUpperCase());

  useEffect(() => {
    document.title = user
      ? process.env.REACT_APP_WEBSITE_NAME +
        " | " +
        title.charAt(0).toUpperCase() +
        title.slice(1)
      : process.env.REACT_APP_WEBSITE_NAME +
        " " +
        name +
        " | " +
        title.charAt(0).toUpperCase() +
        title.slice(1);
  }, [title, user, name]); // Add dependencies
};

export const tableStatus = (val) => {
  return val === 1 ? "Inactive" : "Active";
};

export const fullName = (val) => {
  if (val && val.first_name && val.last_name) {
    return val.first_name + " " + val.last_name;
  } else if (val.first_name) {
    return val.first_name;
  }
};

export const dataURLToFile = (dataURL, filename) => {
  const byteString = atob(dataURL.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const fileBlob = new Blob([ab], { type: "image/png" });

  // Adjust the filename and type as needed
  return new File([fileBlob], filename, { type: "image/png" });
};

export const getImageAsFile = async (imageUrl, filename) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], filename, { type: "image/png" });
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case "pending":
      return <span className="pending-text">{status}</span>;
    case "requested":
      return <span className="requested-text">{status}</span>;
    case "rejected":
      return <span className="rejected-text">{status}</span>;
    case "approved":
      return <span className="accepted-text">{status}</span>;
    default:
      return status;
  }
};

export const getStatusDetailText = (statusDetail) => {
  switch (statusDetail) {
    case "Upcoming":
      return <span className="upcoming-text">{statusDetail}</span>;
    case "In-Progress":
      return <span className="pending-text">{statusDetail}</span>;
    case "Past":
      return <span className="past-text">{statusDetail}</span>;
    default:
      return statusDetail;
  }
};

export const getOrderStatus = (statusDetail) => {
  switch (statusDetail) {
    case "Delivered":
      return <span className="upcoming-text">{statusDetail}</span>;
    case "Pending":
      return <span className="pending-text">{statusDetail}</span>;
    default:
      return statusDetail;
  }
};

// Function to extract file extension from a URL

export const getFileExtension = (url) => {
  const parts = url.split(".");
  return parts[parts.length - 1];
};

// Function to determine image type based on file extension
export const getImageType = (extension) => {
  const imageTypes = {
    jpg: "jpeg",
    jpeg: "jpeg",
    png: "png",
    gif: "gif",
    // Add more extensions and corresponding types as needed
  };

  return imageTypes[extension.toLowerCase()] || "Unknown";
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getFileType = (fileName) => {
  const videoExtensions = ["mp4", "avi", "mov", "mkv"];
  const imageExtensions = ["jpg", "jpeg", "png", "gif"];

  const fileExtension = fileName.split(".").pop().toLowerCase();

  if (videoExtensions.includes(fileExtension)) {
    return "video";
  } else if (imageExtensions.includes(fileExtension)) {
    return "image";
  } else {
    return "unknown";
  }
};

export const validateImage = (file) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxSize = 1024 * 1024; // 1MB

  if (!file) {
    return "No file selected.";
  }

  if (!allowedTypes.includes(file.type)) {
    return "Unsupported file format.";
  }

  if (file.size > maxSize) {
    return "File size exceeds 1MB limit.";
  }

  return ""; // No errors
};

export const serialNum = (num) => {
  return num < 10 ? "0" + num : num;
};

export const calculateIndex = (currentPage, selectedEntries) => {
  return (currentPage - 1) * selectedEntries + 1;
};

export const handleFileChange = (
  e,
  formData,
  setFormData,
  setUploadedImage
) => {
  const fileInput = e.target;
  const files = fileInput.files;
  if (files && files.length > 0) {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setUploadedImage(imageUrl);
      setFormData({ ...formData, image: file });
    };
    reader.readAsDataURL(file);
  }
};

export const getUserDetails = (user, data) => {
  const userDetails =
    user.sendable_id === data.id ? user.receiver : user.sender;
  return {
    profilePic: userDetails?.file?.file_url,
    firstName: userDetails?.first_name,
    role: userDetails?.role === "player" ? "" : userDetails?.role,
  };
};

export const isMyMessage = (message, data) => {
  return data.id === message.sendable_id || data.id === message.senderId;
};

export const getStatus = (status) => {
  const isActive = status.toLowerCase() === "active";
  return {
    className: isActive ? "greenColor" : "redColor",
    text: isActive ? "Active" : "Inactive",
  };
};

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const getLoyaltyImage = (level) => {
  switch (level) {
    case "bronze":
      return images.loyaltyImg1;
    case "silver":
      return images.loyaltyImg2;
    case "gold":
      return images.loyaltyImg3;
    default:
      return images.defaultImg;
  }
};

export const convertMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours} hour${
      hours > 1 ? "s" : ""
    } and ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    return `${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
  }
};

export const generateProviderLinks = (role) => {
  let Links = [];

  switch (role) {
    case "provider":
      Links = [
        {
          path: "/provider",
          label: "Home",
        },
        {
          path: "/provider/about-us",
          label: "About Us",
        },
        {
          path: "/provider/select-services",
          label: "Select Services",
        },
        {
          path: "/provider/my-services",
          label: "My Services",
        },
        {
          path: "/provider/newsfeed",
          label: "Newsfeed",
        },
        {
          path: "/provider/subscription",
          label: "Subscription",
        },
        {
          path: "/provider/payment-logs",
          label: "Payment",
        },
        {
          path: "/provider/my-shop",
          label: "My Shop",
        },
        {
          path: "/provider/create-shop",
          label: "Create Shop",
        },
        {
          path: "/provider/contact-us",
          label: "Contact Us",
        },
      ];
      break;
    default: // No role case or fallback links
      Links = [
        {
          path: "/provider",
          label: "Home",
        },
        {
          path: "/provider/about-us",
          label: "About Us",
        },
        {
          path: "/provider/services",
          label: "Select Services",
        },
        {
          path: "/provider/newsfeed",
          label: "Newsfeed",
        },
        {
          path: "/provider/subscription",
          label: "Buy Subscription",
        },
        {
          path: "/provider/create-shop",
          label: "Create Shop",
        },
        {
          path: "/provider/contact-us",
          label: "Contact Us",
        },
      ];

      break;
  }

  return Links;
};

export const generateLinks = (role) => {
  let Links = [];

  switch (role) {
    case "admin":
      Links = [
        {
          path: "/admin/dashboard",
          label: "Dashboard",
          name: "Dashboard",
          link: "/admin/dashboard",
          image: () => <i className="fas fa-tachometer-alt"></i>,
        },
        {
          path: "/admin/theme-settings",
          label: "Theme Settings",
          name: "Theme",
          link: "/admin/theme-settings",
          image: () => <i className="fas fa-palette"></i>,
        },
        {
          path: "/admin/user-management",
          label: "User Management",
          name: "Users",
          link: "/admin/user-management",
          image: () => <i className="fas fa-users"></i>,
        },
        {
          path: "/admin/products-management",
          label: "Product Management",
          name: "Products",
          link: "/admin/products-management",
          image: () => <i className="fas fa-box"></i>,
        },
      ];
      break;
    default: // No role case or fallback links
      Links = [
        {
          path: "/",
          label: "Home",
          name: "Home",
          link: "/",
          image: () => <i className="fas fa-home"></i>,
        },
        {
          path: "/our-story",
          label: "Our Story",
          name: "Our Story",
          link: "/our-story",
          image: () => <i className="fas fa-book"></i>,
        },
        {
          path: "/shop",
          label: "Shop",
          name: "Shop",
          link: "/shop",
          image: () => <i className="fas fa-store"></i>,
        },
        {
          path: "/faqs",
          label: "FAQ's",
          name: "FAQ's",
          link: "/faqs",
          image: () => <i className="fas fa-question-circle"></i>,
        },
      ];

      break;
  }

  return Links;
};

export const createSelectOptions = (selectArray) => {
  return selectArray.map((select) => ({
    title: select.title,
    options: select.options,
    selectedValue: select.state[0],
    setSelectedValue: select.state[1],
  }));
};

export const generateNextFiveYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 5; i++) {
    const year = currentYear - i;
    years.push({
      value: year.toString(),
      text: year.toString(),
    });
  }
  return years;
};

const availabilityOrder = ["breakfast", "lunch", "dinner"];

export const sortAvailability = (availability) => {
  return availability.slice().sort((a, b) => {
    return availabilityOrder.indexOf(a) - availabilityOrder.indexOf(b);
  });
};

// Function to flatten date filters
export function flattenDateFilters(filters) {
  const flattenedFilters = { ...filters };
  filters.dateFilters.forEach(({ from, to }) => {
    flattenedFilters[from] = "";
    flattenedFilters[to] = "";
  });
  delete flattenedFilters.dateFilters;
  return flattenedFilters;
}
export const statusClassMap = {
  pending: "text-warning",
  requested: "text-warning",
  upcoming: "text-warning",
  rejected: "text-danger",
  past: "text-danger",
  completed: "text-success",
  approved: "text-success",
};
export const statusClassMap2 = {
  delivered: "text-success",
  cancelled: "text-danger",
  pending: "text-warning",
};

export const getFlagFromCountryCode = (flag, size = "") => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img
      style={{ display: "inline", width: `${size == "small" ? "32px" : ""}` }}
      src={`https://www.worldometers.info//img/flags/small/tn_${countryCode}-flag.gif`}
      alt="flag"
    />
  );
};

export const getCountryFlag = (phoneNumber) => {
  let flag = null;
  countriesWithdialingCodesAndFlag?.forEach((item) => {
    if (phoneNumber && phoneNumber?.startsWith(item.phoneCode)) {
      flag = getFlagFromCountryCode(item.flagEmoji, "small");
      return;
    }
  });
  return flag;
};

export const countriesWithdialingCodesAndFlag = [
  {
    name: "Afghanistan",
    code: "AF",
    phoneCode: "+93",
    flagEmoji: "🇦🇫",
  },
  {
    name: "Aland Islands",
    code: "AX",
    phoneCode: "+358",
    flagEmoji: "🇦🇽",
  },
  {
    name: "Albania",
    code: "AL",
    phoneCode: "+355",
    flagEmoji: "🇦🇱",
  },
  {
    name: "Algeria",
    code: "DZ",
    phoneCode: "+213",
    flagEmoji: "🇩🇿",
  },
  {
    name: "AmericanSamoa",
    code: "AS",
    phoneCode: "+1684",
    flagEmoji: "🇦🇸",
  },
  {
    name: "Andorra",
    code: "AD",
    phoneCode: "+376",
    flagEmoji: "🇦🇩",
  },
  {
    name: "Angola",
    code: "AO",
    phoneCode: "+244",
    flagEmoji: "🇦🇴",
  },
  {
    name: "Anguilla",
    code: "AI",
    phoneCode: "+1264",
    flagEmoji: "🇦🇮",
  },
  {
    name: "Antarctica",
    code: "AQ",
    phoneCode: "+672",
    flagEmoji: "🇦🇶",
  },
  {
    name: "Antigua and Barbuda",
    code: "AG",
    phoneCode: "+1268",
    flagEmoji: "🇦🇬",
  },
  {
    name: "Argentina",
    code: "AR",
    phoneCode: "+54",
    flagEmoji: "🇦🇷",
  },
  {
    name: "Armenia",
    code: "AM",
    phoneCode: "+374",
    flagEmoji: "🇦🇲",
  },
  {
    name: "Aruba",
    code: "AW",
    phoneCode: "+297",
    flagEmoji: "🇦🇼",
  },
  {
    name: "Australia",
    code: "AU",
    phoneCode: "+61",
    flagEmoji: "🇦🇺",
  },
  {
    name: "Austria",
    code: "AT",
    phoneCode: "+43",
    flagEmoji: "🇦🇹",
  },
  {
    name: "Azerbaijan",
    code: "AZ",
    phoneCode: "+994",
    flagEmoji: "🇦🇿",
  },
  {
    name: "Bahamas",
    code: "BS",
    phoneCode: "+1242",
    flagEmoji: "🇧🇸",
  },
  {
    name: "Bahrain",
    code: "BH",
    phoneCode: "+973",
    flagEmoji: "🇧🇭",
  },
  {
    name: "Bangladesh",
    code: "BD",
    phoneCode: "+880",
    flagEmoji: "🇧🇩",
  },
  {
    name: "Barbados",
    code: "BB",
    phoneCode: "+1246",
    flagEmoji: "🇧🇧",
  },
  {
    name: "Belarus",
    code: "BY",
    phoneCode: "+375",
    flagEmoji: "🇧🇾",
  },
  {
    name: "Belgium",
    code: "BE",
    phoneCode: "+32",
    flagEmoji: "🇧🇪",
  },
  {
    name: "Belize",
    code: "BZ",
    phoneCode: "+501",
    flagEmoji: "🇧🇿",
  },
  {
    name: "Benin",
    code: "BJ",
    phoneCode: "+229",
    flagEmoji: "🇧🇯",
  },
  {
    name: "Bermuda",
    code: "BM",
    phoneCode: "+1441",
    flagEmoji: "🇧🇲",
  },
  {
    name: "Bhutan",
    code: "BT",
    phoneCode: "+975",
    flagEmoji: "🇧🇹",
  },
  {
    name: "Bolivia, Plurinational State of",
    code: "BO",
    phoneCode: "+591",
    flagEmoji: "🇧🇴",
  },
  {
    name: "Bosnia and Herzegovina",
    code: "BA",
    phoneCode: "+387",
    flagEmoji: "🇧🇦",
  },
  {
    name: "Botswana",
    code: "BW",
    phoneCode: "+267",
    flagEmoji: "🇧🇼",
  },
  {
    name: "Brazil",
    code: "BR",
    phoneCode: "+55",
    flagEmoji: "🇧🇷",
  },
  {
    name: "British Indian Ocean Territory",
    code: "IO",
    phoneCode: "+246",
    flagEmoji: "🇮🇴",
  },
  {
    name: "Brunei Darussalam",
    code: "BN",
    phoneCode: "+673",
    flagEmoji: "🇧🇳",
  },
  {
    name: "Bulgaria",
    code: "BG",
    phoneCode: "+359",
    flagEmoji: "🇧🇬",
  },
  {
    name: "Burkina Faso",
    code: "BF",
    phoneCode: "+226",
    flagEmoji: "🇧🇫",
  },
  {
    name: "Burundi",
    code: "BI",
    phoneCode: "+257",
    flagEmoji: "🇧🇮",
  },
  {
    name: "Cambodia",
    code: "KH",
    phoneCode: "+855",
    flagEmoji: "🇰🇭",
  },
  {
    name: "Cameroon",
    code: "CM",
    phoneCode: "+237",
    flagEmoji: "🇨🇲",
  },
  {
    name: "Canada",
    code: "CA",
    phoneCode: "+1",
    flagEmoji: "🇨🇦",
  },
  {
    name: "Cape Verde",
    code: "CV",
    phoneCode: "+238",
    flagEmoji: "🇨🇻",
  },
  {
    name: "Cayman Islands",
    code: "KY",
    phoneCode: "+345",
    flagEmoji: "🇰🇾",
  },
  {
    name: "Central African Republic",
    code: "CF",
    phoneCode: "+236",
    flagEmoji: "🇨🇫",
  },
  {
    name: "Chad",
    code: "TD",
    phoneCode: "+235",
    flagEmoji: "🇹🇩",
  },
  {
    name: "Chile",
    code: "CL",
    phoneCode: "+56",
    flagEmoji: "🇨🇱",
  },
  {
    name: "China",
    code: "CN",
    phoneCode: "+86",
    flagEmoji: "🇨🇳",
  },
  {
    name: "Christmas Island",
    code: "CX",
    phoneCode: "+61",
    flagEmoji: "🇨🇽",
  },
  {
    name: "Cocos (Keeling) Islands",
    code: "CC",
    phoneCode: "+61",
    flagEmoji: "🇨🇨",
  },
  {
    name: "Colombia",
    code: "CO",
    phoneCode: "+57",
    flagEmoji: "🇨🇴",
  },
  {
    name: "Comoros",
    code: "KM",
    phoneCode: "+269",
    flagEmoji: "🇰🇲",
  },
  {
    name: "Congo",
    code: "CG",
    phoneCode: "+242",
    flagEmoji: "🇨🇬",
  },
  {
    name: "Congo, The Democratic Republic of the Congo",
    code: "CD",
    phoneCode: "+243",
    flagEmoji: "🇨🇩",
  },
  {
    name: "Cook Islands",
    code: "CK",
    phoneCode: "+682",
    flagEmoji: "🇨🇰",
  },
  {
    name: "Costa Rica",
    code: "CR",
    phoneCode: "+506",
    flagEmoji: "🇨🇷",
  },
  {
    name: "Cote d'Ivoire",
    code: "CI",
    phoneCode: "+225",
    flagEmoji: "🇨🇮",
  },
  {
    name: "Croatia",
    code: "HR",
    phoneCode: "+385",
    flagEmoji: "🇭🇷",
  },
  {
    name: "Cuba",
    code: "CU",
    phoneCode: "+53",
    flagEmoji: "🇨🇺",
  },
  {
    name: "Cyprus",
    code: "CY",
    phoneCode: "+357",
    flagEmoji: "🇨🇾",
  },
  {
    name: "Czech Republic",
    code: "CZ",
    phoneCode: "+420",
    flagEmoji: "🇨🇿",
  },
  {
    name: "Denmark",
    code: "DK",
    phoneCode: "+45",
    flagEmoji: "🇩🇰",
  },
  {
    name: "Djibouti",
    code: "DJ",
    phoneCode: "+253",
    flagEmoji: "🇩🇯",
  },
  {
    name: "Dominica",
    code: "DM",
    phoneCode: "+1767",
    flagEmoji: "🇩🇲",
  },
  {
    name: "Dominican Republic",
    code: "DO",
    phoneCode: "+1849",
    flagEmoji: "🇩🇴",
  },
  {
    name: "Ecuador",
    code: "EC",
    phoneCode: "+593",
    flagEmoji: "🇪🇨",
  },
  {
    name: "Egypt",
    code: "EG",
    phoneCode: "+20",
    flagEmoji: "🇪🇬",
  },
  {
    name: "El Salvador",
    code: "SV",
    phoneCode: "+503",
    flagEmoji: "🇸🇻",
  },
  {
    name: "Equatorial Guinea",
    code: "GQ",
    phoneCode: "+240",
    flagEmoji: "🇬🇶",
  },
  {
    name: "Eritrea",
    code: "ER",
    phoneCode: "+291",
    flagEmoji: "🇪🇷",
  },
  {
    name: "Estonia",
    code: "EE",
    phoneCode: "+372",
    flagEmoji: "🇪🇪",
  },
  {
    name: "Ethiopia",
    code: "ET",
    phoneCode: "+251",
    flagEmoji: "🇪🇹",
  },
  {
    name: "Falkland Islands (Malvinas)",
    code: "FK",
    phoneCode: "+500",
    flagEmoji: "🇫🇰",
  },
  {
    name: "Faroe Islands",
    code: "FO",
    phoneCode: "+298",
    flagEmoji: "🇫🇴",
  },
  {
    name: "Fiji",
    code: "FJ",
    phoneCode: "+679",
    flagEmoji: "🇫🇯",
  },
  {
    name: "Finland",
    code: "FI",
    phoneCode: "+358",
    flagEmoji: "🇫🇮",
  },
  {
    name: "France",
    code: "FR",
    phoneCode: "+33",
    flagEmoji: "🇫🇷",
  },
  {
    name: "French Guiana",
    code: "GF",
    phoneCode: "+594",
    flagEmoji: "🇬🇫",
  },
  {
    name: "French Polynesia",
    code: "PF",
    phoneCode: "+689",
    flagEmoji: "🇵🇫",
  },
  {
    name: "Gabon",
    code: "GA",
    phoneCode: "+241",
    flagEmoji: "🇬🇦",
  },
  {
    name: "Gambia",
    code: "GM",
    phoneCode: "+220",
    flagEmoji: "🇬🇲",
  },
  {
    name: "Georgia",
    code: "GE",
    phoneCode: "+995",
    flagEmoji: "🇬🇪",
  },
  {
    name: "Germany",
    code: "DE",
    phoneCode: "+49",
    flagEmoji: "🇩🇪",
  },
  {
    name: "Ghana",
    code: "GH",
    phoneCode: "+233",
    flagEmoji: "🇬🇭",
  },
  {
    name: "Gibraltar",
    code: "GI",
    phoneCode: "+350",
    flagEmoji: "🇬🇮",
  },
  {
    name: "Greece",
    code: "GR",
    phoneCode: "+30",
    flagEmoji: "🇬🇷",
  },
  {
    name: "Greenland",
    code: "GL",
    phoneCode: "+299",
    flagEmoji: "🇬🇱",
  },
  {
    name: "Grenada",
    code: "GD",
    phoneCode: "+1473",
    flagEmoji: "🇬🇩",
  },
  {
    name: "Guadeloupe",
    code: "GP",
    phoneCode: "+590",
    flagEmoji: "🇬🇵",
  },
  {
    name: "Guam",
    code: "GU",
    phoneCode: "+1671",
    flagEmoji: "🇬🇺",
  },
  {
    name: "Guatemala",
    code: "GT",
    phoneCode: "+502",
    flagEmoji: "🇬🇹",
  },
  {
    name: "Guernsey",
    code: "GG",
    phoneCode: "+44",
    flagEmoji: "🇬🇬",
  },
  {
    name: "Guinea",
    code: "GN",
    phoneCode: "+224",
    flagEmoji: "🇬🇳",
  },
  {
    name: "Guinea-Bissau",
    code: "GW",
    phoneCode: "+245",
    flagEmoji: "🇬🇼",
  },
  {
    name: "Guyana",
    code: "GY",
    phoneCode: "+595",
    flagEmoji: "🇬🇾",
  },
  {
    name: "Haiti",
    code: "HT",
    phoneCode: "+509",
    flagEmoji: "🇭🇹",
  },
  {
    name: "Holy See (Vatican City State)",
    code: "VA",
    phoneCode: "+379",
    flagEmoji: "🇻🇦",
  },
  {
    name: "Honduras",
    code: "HN",
    phoneCode: "+504",
    flagEmoji: "🇭🇳",
  },
  {
    name: "Hong Kong",
    code: "HK",
    phoneCode: "+852",
    flagEmoji: "🇭🇰",
  },
  {
    name: "Hungary",
    code: "HU",
    phoneCode: "+36",
    flagEmoji: "🇭🇺",
  },
  {
    name: "Iceland",
    code: "IS",
    phoneCode: "+354",
    flagEmoji: "🇮🇸",
  },
  {
    name: "India",
    code: "IN",
    phoneCode: "+91",
    flagEmoji: "🇮🇳",
  },
  {
    name: "Indonesia",
    code: "ID",
    phoneCode: "+62",
    flagEmoji: "🇮🇩",
  },
  {
    name: "Iran, Islamic Republic of Persian Gulf",
    code: "IR",
    phoneCode: "+98",
    flagEmoji: "🇮🇷",
  },
  {
    name: "Iraq",
    code: "IQ",
    phoneCode: "+964",
    flagEmoji: "🇮🇷",
  },
  {
    name: "Ireland",
    code: "IE",
    phoneCode: "+353",
    flagEmoji: "🇮🇪",
  },
  {
    name: "Isle of Man",
    code: "IM",
    phoneCode: "+44",
    flagEmoji: "🇮🇲",
  },
  {
    name: "Israel",
    code: "IL",
    phoneCode: "+972",
    flagEmoji: "🇮🇱",
  },
  {
    name: "Italy",
    code: "IT",
    phoneCode: "+39",
    flagEmoji: "🇮🇹",
  },
  {
    name: "Jamaica",
    code: "JM",
    phoneCode: "+1876",
    flagEmoji: "🇯🇲",
  },
  {
    name: "Japan",
    code: "JP",
    phoneCode: "+81",
    flagEmoji: "🇯🇵",
  },
  {
    name: "Jersey",
    code: "JE",
    phoneCode: "+44",
    flagEmoji: "🇯🇪",
  },
  {
    name: "Jordan",
    code: "JO",
    phoneCode: "+962",
    flagEmoji: "🇯🇴",
  },
  {
    name: "Kazakhstan",
    code: "KZ",
    phoneCode: "+77",
    flagEmoji: "🇰🇿",
  },
  {
    name: "Kenya",
    code: "KE",
    phoneCode: "+254",
    flagEmoji: "🇰🇪",
  },
  {
    name: "Kiribati",
    code: "KI",
    phoneCode: "+686",
    flagEmoji: "🇰🇮",
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    code: "KP",
    phoneCode: "+850",
    flagEmoji: "🇰🇵",
  },
  {
    name: "Korea, Republic of South Korea",
    code: "KR",
    phoneCode: "+82",
    flagEmoji: "🇰🇷",
  },
  {
    name: "Kuwait",
    code: "KW",
    phoneCode: "+965",
    flagEmoji: "🇰🇼",
  },
  {
    name: "Kyrgyzstan",
    code: "KG",
    phoneCode: "+996",
    flagEmoji: "🇰🇬",
  },
  {
    name: "Laos",
    code: "LA",
    phoneCode: "+856",
    flagEmoji: "🇱🇦",
  },
  {
    name: "Latvia",
    code: "LV",
    phoneCode: "+371",
    flagEmoji: "🇱🇻",
  },
  {
    name: "Lebanon",
    code: "LB",
    phoneCode: "+961",
    flagEmoji: "🇱🇧",
  },
  {
    name: "Lesotho",
    code: "LS",
    phoneCode: "+266",
    flagEmoji: "🇱🇸",
  },
  {
    name: "Liberia",
    code: "LR",
    phoneCode: "+231",
    flagEmoji: "🇱🇷",
  },
  {
    name: "Libyan Arab Jamahiriya",
    code: "LY",
    phoneCode: "+218",
    flagEmoji: "🇱🇾",
  },
  {
    name: "Liechtenstein",
    code: "LI",
    phoneCode: "+423",
    flagEmoji: "🇱🇮",
  },
  {
    name: "Lithuania",
    code: "LT",
    phoneCode: "+370",
    flagEmoji: "🇱🇹",
  },
  {
    name: "Luxembourg",
    code: "LU",
    phoneCode: "+352",
    flagEmoji: "🇱🇺",
  },
  {
    name: "Macao",
    code: "MO",
    phoneCode: "+853",
    flagEmoji: "🇲🇴",
  },
  {
    name: "Macedonia",
    code: "MK",
    phoneCode: "+389",
    flagEmoji: "🇲🇰",
  },
  {
    name: "Madagascar",
    code: "MG",
    phoneCode: "+261",
    flagEmoji: "🇲🇬",
  },
  {
    name: "Malawi",
    code: "MW",
    phoneCode: "+265",
    flagEmoji: "🇲🇼",
  },
  {
    name: "Malaysia",
    code: "MY",
    phoneCode: "+60",
    flagEmoji: "🇲🇾",
  },
  {
    name: "Maldives",
    code: "MV",
    phoneCode: "+960",
    flagEmoji: "🇲🇻",
  },
  {
    name: "Mali",
    code: "ML",
    phoneCode: "+223",
    flagEmoji: "🇲🇱",
  },
  {
    name: "Malta",
    code: "MT",
    phoneCode: "+356",
    flagEmoji: "🇲🇹",
  },
  {
    name: "Marshall Islands",
    code: "MH",
    phoneCode: "+692",
    flagEmoji: "🇲🇭",
  },
  {
    name: "Martinique",
    code: "MQ",
    phoneCode: "+596",
    flagEmoji: "🇲🇶",
  },
  {
    name: "Mauritania",
    code: "MR",
    phoneCode: "+222",
    flagEmoji: "🇲🇷",
  },
  {
    name: "Mauritius",
    code: "MU",
    phoneCode: "+230",
    flagEmoji: "🇲🇺",
  },
  {
    name: "Mayotte",
    code: "YT",
    phoneCode: "+262",
    flagEmoji: "🇾🇹",
  },
  {
    name: "Mexico",
    code: "MX",
    phoneCode: "+52",
    flagEmoji: "🇲🇽",
  },
  {
    name: "Micronesia, Federated States of Micronesia",
    code: "FM",
    phoneCode: "+691",
    flagEmoji: "🇫🇲",
  },
  {
    name: "Moldova",
    code: "MD",
    phoneCode: "+373",
    flagEmoji: "🇲🇩",
  },
  {
    name: "Monaco",
    code: "MC",
    phoneCode: "+377",
    flagEmoji: "🇲🇨",
  },
  {
    name: "Mongolia",
    code: "MN",
    phoneCode: "+976",
    flagEmoji: "🇲🇳",
  },
  {
    name: "Montenegro",
    code: "ME",
    phoneCode: "+382",
    flagEmoji: "🇲🇪",
  },
  {
    name: "Montserrat",
    code: "MS",
    phoneCode: "+1664",
    flagEmoji: "🇲🇸",
  },
  {
    name: "Morocco",
    code: "MA",
    phoneCode: "+212",
    flagEmoji: "🇲🇦",
  },
  {
    name: "Mozambique",
    code: "MZ",
    phoneCode: "+258",
    flagEmoji: "🇲🇿",
  },
  {
    name: "Myanmar",
    code: "MM",
    phoneCode: "+95",
    flagEmoji: "🇲🇲",
  },
  {
    name: "Namibia",
    code: "NA",
    phoneCode: "+264",
    flagEmoji: "🇳🇦",
  },
  {
    name: "Nauru",
    code: "NR",
    phoneCode: "+674",
    flagEmoji: "🇳🇷",
  },
  {
    name: "Nepal",
    code: "NP",
    phoneCode: "+977",
    flagEmoji: "🇳🇵",
  },
  {
    name: "Netherlands",
    code: "NL",
    phoneCode: "+31",
    flagEmoji: "🇳🇱",
  },
  {
    name: "Netherlands Antilles",
    code: "AN",
    phoneCode: "+599",
    flagEmoji: "🇧🇶",
  },
  {
    name: "New Caledonia",
    code: "NC",
    phoneCode: "+687",
    flagEmoji: "🇳🇨",
  },
  {
    name: "New Zealand",
    code: "NZ",
    phoneCode: "+64",
    flagEmoji: "🇳🇿",
  },
  {
    name: "Nicaragua",
    code: "NI",
    phoneCode: "+505",
    flagEmoji: "🇳🇮",
  },
  {
    name: "Niger",
    code: "NE",
    phoneCode: "+227",
    flagEmoji: "🇳🇪",
  },
  {
    name: "Nigeria",
    code: "NG",
    phoneCode: "+234",
    flagEmoji: "🇳🇬",
  },
  {
    name: "Niue",
    code: "NU",
    phoneCode: "+683",
    flagEmoji: "🇳🇺",
  },
  {
    name: "Norfolk Island",
    code: "NF",
    phoneCode: "+672",
    flagEmoji: "🇳🇫",
  },
  {
    name: "Northern Mariana Islands",
    code: "MP",
    phoneCode: "+1670",
    flagEmoji: "🇲🇵",
  },
  {
    name: "Norway",
    code: "NO",
    phoneCode: "+47",
    flagEmoji: "🇳🇴",
  },
  {
    name: "Oman",
    code: "OM",
    phoneCode: "+968",
    flagEmoji: "🇴🇲",
  },
  {
    name: "Pakistan",
    code: "PK",
    phoneCode: "+92",
    flagEmoji: "🇵🇰",
  },
  {
    name: "Palau",
    code: "PW",
    phoneCode: "+680",
    flagEmoji: "🇵🇼",
  },
  {
    name: "Palestinian Territory, Occupied",
    code: "PS",
    phoneCode: "+970",
    flagEmoji: "🇵🇸",
  },
  {
    name: "Panama",
    code: "PA",
    phoneCode: "+507",
    flagEmoji: "🇵🇦",
  },
  {
    name: "Papua New Guinea",
    code: "PG",
    phoneCode: "+675",
    flagEmoji: "🇵🇬",
  },
  {
    name: "Paraguay",
    code: "PY",
    phoneCode: "+595",
    flagEmoji: "🇵🇾",
  },
  {
    name: "Peru",
    code: "PE",
    phoneCode: "+51",
    flagEmoji: "🇵🇪",
  },
  {
    name: "Philippines",
    code: "PH",
    phoneCode: "+63",
    flagEmoji: "🇵🇭",
  },
  {
    name: "Pitcairn",
    code: "PN",
    phoneCode: "+872",
    flagEmoji: "🇵🇳",
  },
  {
    name: "Poland",
    code: "PL",
    phoneCode: "+48",
    flagEmoji: "🇵🇱",
  },
  {
    name: "Portugal",
    code: "PT",
    phoneCode: "+351",
    flagEmoji: "🇵🇹",
  },
  {
    name: "Puerto Rico",
    code: "PR",
    phoneCode: "+1939",
    flagEmoji: "🇵🇷",
  },
  {
    name: "Qatar",
    code: "QA",
    phoneCode: "+974",
    flagEmoji: "🇶🇦",
  },
  {
    name: "Reunion",
    code: "RE",
    phoneCode: "+262",
    flagEmoji: "🇷🇪",
  },
  {
    name: "Romania",
    code: "RO",
    phoneCode: "+40",
    flagEmoji: "🇷🇴",
  },
  {
    name: "Russia",
    code: "RU",
    phoneCode: "+7",
    flagEmoji: "🇷🇺",
  },
  {
    name: "Rwanda",
    code: "RW",
    phoneCode: "+250",
    flagEmoji: "🇷🇼",
  },
  {
    name: "Saint Barthelemy",
    code: "BL",
    phoneCode: "+590",
    flagEmoji: "🇧🇱",
  },
  {
    name: "Saint Helena, Ascension and Tristan Da Cunha",
    code: "SH",
    phoneCode: "+290",
    flagEmoji: "🇸🇭",
  },
  {
    name: "Saint Kitts and Nevis",
    code: "KN",
    phoneCode: "+1869",
    flagEmoji: "🇰🇳",
  },
  {
    name: "Saint Lucia",
    code: "LC",
    phoneCode: "+1758",
    flagEmoji: "🇱🇨",
  },
  {
    name: "Saint Martin",
    code: "MF",
    phoneCode: "+590",
    flagEmoji: "🇲🇫",
  },
  {
    name: "Saint Pierre and Miquelon",
    code: "PM",
    phoneCode: "+508",
    flagEmoji: "🇵🇲",
  },
  {
    name: "Saint Vincent and the Grenadines",
    code: "VC",
    phoneCode: "+1784",
    flagEmoji: "🇻🇨",
  },
  {
    name: "Samoa",
    code: "WS",
    phoneCode: "+685",
    flagEmoji: "🇼🇸",
  },
  {
    name: "San Marino",
    code: "SM",
    phoneCode: "+378",
    flagEmoji: "🇸🇲",
  },
  {
    name: "Sao Tome and Principe",
    code: "ST",
    phoneCode: "+239",
    flagEmoji: "🇸🇹",
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    phoneCode: "+966",
    flagEmoji: "🇸🇦",
  },
  {
    name: "Senegal",
    code: "SN",
    phoneCode: "+221",
    flagEmoji: "🇸🇳",
  },
  {
    name: "Serbia",
    code: "RS",
    phoneCode: "+381",
    flagEmoji: "🇷🇸",
  },
  {
    name: "Seychelles",
    code: "SC",
    phoneCode: "+248",
    flagEmoji: "🇸🇨",
  },
  {
    name: "Sierra Leone",
    code: "SL",
    phoneCode: "+232",
    flagEmoji: "🇸🇱",
  },
  {
    name: "Singapore",
    code: "SG",
    phoneCode: "+65",
    flagEmoji: "🇸🇬",
  },
  {
    name: "Slovakia",
    code: "SK",
    phoneCode: "+421",
    flagEmoji: "🇸🇰",
  },
  {
    name: "Slovenia",
    code: "SI",
    phoneCode: "+386",
    flagEmoji: "🇸🇮",
  },
  {
    name: "Solomon Islands",
    code: "SB",
    phoneCode: "+677",
    flagEmoji: "🇸🇧",
  },
  {
    name: "Somalia",
    code: "SO",
    phoneCode: "+252",
    flagEmoji: "🇸🇴",
  },
  {
    name: "South Africa",
    code: "ZA",
    phoneCode: "+27",
    flagEmoji: "🇿🇦",
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    code: "GS",
    phoneCode: "+500",
    flagEmoji: "🇬🇸",
  },
  {
    name: "South Sudan",
    code: "SS",
    phoneCode: "+211",
    flagEmoji: "🇸🇸",
  },
  {
    name: "Spain",
    code: "ES",
    phoneCode: "+34",
    flagEmoji: "🇪🇸",
  },
  {
    name: "Sri Lanka",
    code: "LK",
    phoneCode: "+94",
    flagEmoji: "🇱🇰",
  },
  {
    name: "Sudan",
    code: "SD",
    phoneCode: "+249",
    flagEmoji: "🇸🇩",
  },
  {
    name: "Suriname",
    code: "SR",
    phoneCode: "+597",
    flagEmoji: "🇸🇷",
  },
  {
    name: "Svalbard and Jan Mayen",
    code: "SJ",
    phoneCode: "+47",
    flagEmoji: "🇸🇯",
  },
  {
    name: "Swaziland",
    code: "SZ",
    phoneCode: "+268",
    flagEmoji: "🇸🇿",
  },
  {
    name: "Sweden",
    code: "SE",
    phoneCode: "+46",
    flagEmoji: "🇸🇪",
  },
  {
    name: "Switzerland",
    code: "CH",
    phoneCode: "+41",
    flagEmoji: "🇨🇭",
  },
  {
    name: "Syrian Arab Republic",
    code: "SY",
    phoneCode: "+963",
    flagEmoji: "🇸🇾",
  },
  {
    name: "Taiwan",
    code: "TW",
    phoneCode: "+886",
    flagEmoji: "🇹🇼",
  },
  {
    name: "Tajikistan",
    code: "TJ",
    phoneCode: "+992",
    flagEmoji: "🇹🇯",
  },
  {
    name: "Tanzania, United Republic of Tanzania",
    code: "TZ",
    phoneCode: "+255",
    flagEmoji: "🇹🇿",
  },
  {
    name: "Thailand",
    code: "TH",
    phoneCode: "+66",
    flagEmoji: "🇹🇭",
  },
  {
    name: "Timor-Leste",
    code: "TL",
    phoneCode: "+670",
    flagEmoji: "🇹🇱",
  },
  {
    name: "Togo",
    code: "TG",
    phoneCode: "+228",
    flagEmoji: "🇹🇬",
  },
  {
    name: "Tokelau",
    code: "TK",
    phoneCode: "+690",
    flagEmoji: "🇹🇰",
  },
  {
    name: "Tonga",
    code: "TO",
    phoneCode: "+676",
    flagEmoji: "🇹🇴",
  },
  {
    name: "Trinidad and Tobago",
    code: "TT",
    phoneCode: "+1868",
    flagEmoji: "🇹🇹",
  },
  {
    name: "Tunisia",
    code: "TN",
    phoneCode: "+216",
    flagEmoji: "🇹🇳",
  },
  {
    name: "Turkey",
    code: "TR",
    phoneCode: "+90",
    flagEmoji: "🇹🇷",
  },
  {
    name: "Turkmenistan",
    code: "TM",
    phoneCode: "+993",
    flagEmoji: "🇹🇲",
  },
  {
    name: "Turks and Caicos Islands",
    code: "TC",
    phoneCode: "+1649",
    flagEmoji: "🇹🇨",
  },
  {
    name: "Tuvalu",
    code: "TV",
    phoneCode: "+688",
    flagEmoji: "🇹🇻",
  },
  {
    name: "Uganda",
    code: "UG",
    phoneCode: "+256",
    flagEmoji: "🇺🇬",
  },
  {
    name: "Ukraine",
    code: "UA",
    phoneCode: "+380",
    flagEmoji: "🇺🇦",
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    phoneCode: "+971",
    flagEmoji: "🇦🇪",
  },
  {
    name: "United Kingdom",
    code: "GB",
    phoneCode: "+44",
    flagEmoji: "🇬🇧",
  },
  {
    name: "United States",
    code: "US",
    phoneCode: "+1",
    flagEmoji: "🇺🇸",
  },
  {
    name: "Uruguay",
    code: "UY",
    phoneCode: "+598",
    flagEmoji: "🇺🇾",
  },
  {
    name: "Uzbekistan",
    code: "UZ",
    phoneCode: "+998",
    flagEmoji: "🇺🇿",
  },
  {
    name: "Vanuatu",
    code: "VU",
    phoneCode: "+678",
    flagEmoji: "🇻🇺",
  },
  {
    name: "Venezuela, Bolivarian Republic of Venezuela",
    code: "VE",
    phoneCode: "+58",
    flagEmoji: "🇻🇪",
  },
  {
    name: "Vietnam",
    code: "VN",
    phoneCode: "+84",
    flagEmoji: "🇻🇳",
  },
  {
    name: "Virgin Islands, British",
    code: "VG",
    phoneCode: "+1284",
    flagEmoji: "🇻🇬",
  },
  {
    name: "Virgin Islands, U.S.",
    code: "VI",
    phoneCode: "+1340",
    flagEmoji: "🇻🇮",
  },
  {
    name: "Wallis and Futuna",
    code: "WF",
    phoneCode: "+681",
    flagEmoji: "🇼🇫",
  },
  {
    name: "Yemen",
    code: "YE",
    phoneCode: "+967",
    flagEmoji: "🇾🇪",
  },
  {
    name: "Zambia",
    code: "ZM",
    phoneCode: "+260",
    flagEmoji: "🇿🇲",
  },
  {
    name: "Zimbabwe",
    code: "ZW",
    phoneCode: "+263",
    flagEmoji: "🇿🇼",
  },
];
export const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(".0", "") + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(".0", "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(".0", "") + "K";
  }
  return num;
};

export const sumReactions = (reactions) => {
  return Object.values(reactions).reduce((total, count) => total + count, 0);
};

export const isNullOrEmpty = (variable) => {
  return (
    variable === null || // Check if null
    variable === undefined || // Check if undefined
    (Array.isArray(variable) && variable.length === 0) || // Check if it's an empty array
    (typeof variable === "object" &&
      !Array.isArray(variable) &&
      Object.keys(variable).length === 0) // Check if it's an empty object (and not an array)
  );
};

export const calculateTimePassed = (postTime) => {
  const currentTime = new Date();
  const timeDifference = currentTime - postTime;

  // Convert time difference to seconds
  const secondsDifference = Math.floor(timeDifference / 1000);

  // Define time intervals
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  if (secondsDifference < minute) {
    return "Just now";
  } else if (secondsDifference < hour) {
    const minutes = Math.floor(secondsDifference / minute);
    return `${minutes}min${minutes > 1 ? "s" : ""}`;
  } else if (secondsDifference < day) {
    const hours = Math.floor(secondsDifference / hour);
    return `${hours}h`;
  } else if (secondsDifference < week) {
    const days = Math.floor(secondsDifference / day);
    return `${days}d`;
  } else {
    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    let displayTime = postTime.toLocaleString("en-US", options).split(",");

    displayTime.splice(1, 0, " at").join(" ");
    return displayTime;
  }
};

export const replaceUnderscoreWithSpace = (str) => {
  if (typeof str === "string") {
    return str
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
  }
  return str;
};

export const usePageTitleUser = (title) => {
  useEffect(() => {
    document.title = `HQS | ${title}`;
  }, [title]);
};

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase() // lowercase
    .trim() // remove spaces from start & end
    .replace(/\s+/g, "-") // spaces -> dashes
    .replace(/[^\w\-]+/g, "") // remove non-word chars
    .replace(/\-\-+/g, "-"); // multiple dashes -> single dash
};

const colorNames = {
  "#000": "black",
  "#000000": "black",
  "#2d2f30": "black",
  "#ffffff": "white",
  "#f6a623": "orange",
  "#7b8f45": "olive",
  "#808080": "gray",
  "#ff0000": "red",
  "#0000ff": "blue",
  "#f99a38": "deep saffron",
  "#798d4f": "olive green",
  "#ffe603ff": "yellow",
  "#00ff00": "green",
  "#888888": "light grey",
  // Add more as needed
};

export const sizeDisplayMap = {
  small: "S",
  medium: "M",
  large: "L",
  "extra large": "XL",
};

export const getColorName = (hex) => {
  const normalized = hex.toLowerCase();
  return colorNames[normalized] || hex;
};
