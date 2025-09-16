import * as Yup from "yup";
import { accountTypeOptions, category } from "./TableStatus";

const createImageValidation = (errorMessage) =>
  Yup.mixed()
    .required("An image is required.") // Ensure something is provided
    .test(
      "is-valid-images",
      errorMessage || "Invalid image file type or no image provided",
      function (value) {
        const validImageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/webp",
          "image/gif",
          "image/png",
        ];

        // Handle null or undefined value
        if (!value) {
          return false; // No image provided, fail validation
        }

        // Handle the case where value is a string (e.g., URL)
        if (typeof value === "string") {
          return true; // If it's a string, assume it's a valid URL
        }

        // Handle the case where value is a File object
        if (value instanceof File) {
          return validImageTypes.includes(value.type); // Check file type
        }

        // Handle the case where value is an array (if applicable)
        if (Array.isArray(value)) {
          return value.some((file) => {
            if (typeof file === "string") {
              return true; // Assume valid if it's a string (URL)
            }
            if (file instanceof File) {
              return validImageTypes.includes(file.type); // Check file type
            }
            return false;
          });
        }

        // If none of the above conditions match, fail validation
        return false;
      }
    );

export const pushNotificationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  message: Yup.string().required("Message is required"),
});
export const addCategorySchema = Yup.object().shape({
  categoryname: Yup.string().required("Category Name is required"),
  status: Yup.string().required("Status is required"),
  // message: Yup.string().required("Message is required"),
});
export const addNewPlaneSchema = Yup.object().shape({
  title: Yup.string().required("Subscription title is required"),
  durationtitle: Yup.string().required("Subscription type is required"),
  price: Yup.string().required("Price is required"),
  description: Yup.string().required("Description is required"),
  // message: Yup.string().required("Message is required"),
});

const timeSchema = Yup.object().shape({
  active: Yup.boolean(),
  start: Yup.string().when("active", {
    is: true,
    then: (schema) => schema.required("Start time is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  end: Yup.string().when("active", {
    is: true,
    then: (schema) => schema.required("End time is required"),
    otherwise: (schema) => schema.nullable(),
  }),
});

export const branchValidation = Yup.object().shape({
  name: Yup.string().required("Branch Name is required"),
  manager_name: Yup.string().required("Manager Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be greater  then 10 digits")
    .max(15, "Must be less then 16 digits")
    .required("Contact Number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  lat: Yup.number().required("Latitude is required"),
  lng: Yup.number().required("Longitude is required"),
  // address: Yup.string().required("Address is required"),
  timings: Yup.object()
    .shape({
      monday: timeSchema,
      tuesday: timeSchema,
      wednesday: timeSchema,
      thursday: timeSchema,
      friday: timeSchema,
      saturday: timeSchema,
      sunday: timeSchema,
    })
    .test("atLeastOneDay", "At least one day must be selected", (value) => {
      return Object.values(value).some((day) => day.active);
    }),
});

export const branchEditValidation = Yup.object().shape({
  name: Yup.string().required("Branch Name is required"),
  manager_name: Yup.string().required("Manager Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be greater  then 10 digits")
    .max(15, "Must be less then 16 digits")
    .required("Contact Number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  timings: Yup.object()
    .shape({
      monday: timeSchema,
      tuesday: timeSchema,
      wednesday: timeSchema,
      thursday: timeSchema,
      friday: timeSchema,
      saturday: timeSchema,
      sunday: timeSchema,
    })
    .test("atLeastOneDay", "At least one day must be selected", (value) => {
      return Object.values(value).some((day) => day.active);
    }),
});

export const loyaltyValidation = Yup.object().shape({
  reward: Yup.string().required("Reward is required"),
  limit: Yup.number()
    .required("Limit is required")
    .positive("Limit must be a positive number"),
  number_of_orders: Yup.number()
    .required("No of Orders are required")
    .positive("No of Orders must be a positive number"),
  discount: Yup.number()
    .required("Discount is required")
    .positive("Discount must be a positive number"),
  validity: Yup.number()
    .required("Validity is required")
    .positive("Validity must be a positive number"),
});

export const forgotEmail = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  // phone: Yup.string().required("Phone number is required"),
});

export const forgotCode = Yup.object().shape({
  code: Yup.string()
    .required("Verification code is required")
    .matches(/^\d{4}$/, "Verification code must be 4 digits"),
});

export const forgotPassword = Yup.object().shape({
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    .required("Password is required"),
  password_confirmation: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password must match Password.")
    .label("Confirm Password"),
});

export const changePassword = Yup.object().shape({
  current_password: Yup.string().required("Current Password is required"),
  password: Yup.string().required("New Password is required"),
  password_confirmation: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password must match Password.")
    .label("Confirm Password"),
});

export const changePasswordSocial = Yup.object().shape({
  // current_password: Yup.string().required("Current Password is required"),
  password: Yup.string().required("New Password is required"),
  password_confirmation: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password must match Password.")
    .label("Confirm Password"),
});

export const signupUserValidationSchema = Yup.object().shape({
  user_name: Yup.string()
    .required("User Name is required")
    .min(2, "User Name must be at least 2 characters")
    .max(50, "User Name must be less than 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "User Name can only contain letters and spaces"),

  // mobile_number: Yup.string()
  //   .required("Phone number is required")
  //   .matches(
  //     /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
  //     "Please enter a valid phone number"
  //   )
  //   .test("phone-length", "Phone number must be 10 digits", function (value) {
  //     const digits = value.replace(/\D/g, "");
  //     return digits.length === 10;
  //   }),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .test("email-domain", "Please use a valid email domain", function (value) {
      const validDomains = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "outlook.com",
        "icloud.com",
      ];
      const domain = value.split("@")[1];
      return validDomains.includes(domain?.toLowerCase()) || true; // Allow all domains for now
    }),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .matches(
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
      "Password must contain at least one special character"
    ),

  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password must match Password.")
    .label("Confirm Password"),

  agreeTerms: Yup.boolean()
    .oneOf([true], "You must agree to the Privacy Policy and Terms of Use")
    .required("You must agree to the Privacy Policy and Terms of Use"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required("User Name or Email is required"),
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    .required("Password is required"),
});

export const contactValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Query is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be greater  then 10 digits")
    .max(15, "Must be less then 16 digits")
    .required("Contact Number is required"),
});

export const registerValidationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    .required("Password is required"),
  password_confirmation: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password must match Password.")
    .label("Confirm Password"),
});

export const registerValidation = Yup.object().shape({
  name: Yup.string().required("Restaurant Name is required"),
  manager_name: Yup.string().required("Manager Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be greater  then 10 digits")
    .max(15, "Must be less then 16 digits")
    .required("Contact Number is required"),
  password: Yup.string().required("Password is required"),
  password_confirmation: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password must match Password.")
    .label("Confirm Password"),
});

export const promoCodeValidation = Yup.object().shape({
  code_name: Yup.string().required("Code Name is required"),
  code: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Code must be alphanumeric")
    .required("Code is required"),
  discount: Yup.number().required("Discount is required"),
  min_amount: Yup.number().required("Min Amount is required"),
  start_date: Yup.date().required("Start Date is required"),
  end_date: Yup.date()
    .min(Yup.ref("start_date"), "End Date must be after Start Date")
    .required("End Date is required"),
  branches: Yup.array().min(1, "Please select at least one branch"),
});

export const productValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be a positive number"),
  description: Yup.string().required("Description is required"),
  availability: Yup.array().min(1, "Select at least one availability"),
  // image: Yup.mixed()
  //   .required("Image is required")
  //   .test("fileSize", "Image size should not exceed 1 MB", value => {
  //     return value && value.size <= 1024 * 1024;
  //   })
  //   .test("fileFormat", "Unsupported Format", value => {
  //     return value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
  //   }),
  image: Yup.mixed()
    .test("fileSize", "Image size should not exceed 1 MB", (value) => {
      if (typeof value === "string") return true; // If it's a URL, skip this test
      return value && value.size <= 1024 * 1024;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      if (typeof value === "string") return true; // If it's a URL, skip this test
      return (
        value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
      );
    }),
  category: Yup.string().required("Category is required"), // Add this line
});

export const paymentValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Card Holder Name")
    .label("Card Holder Name"),
  cvc: Yup.string()
    .required("CVV Number is required")
    .max(3, "CVV Number must be exactly 3 digits")
    .min(3, "CVV Number must be exactly 3 digits")
    .label("CVV Number"),
  month: Yup.string()
    .test(
      "is-valid-expiration",
      "Expiration date must be greater than current date",
      function (value) {
        if (!value) return false; // if empty, return false
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // months are zero-based
        const [inputYear, inputMonth] = value.split("-").map(Number);
        return (
          inputYear > currentYear ||
          (inputYear === currentYear && inputMonth > currentMonth)
        );
      }
    )
    .required()
    .label("Expiration Date"),
  number: Yup.string()
    .required()
    .matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "Invalid card number format")
    .label("Card Number"),
});

export const bankValidationSchema = Yup.object().shape({
  account_holder_name: Yup.string()
    .required("Account Holder Name is required")
    .matches(
      /^[aA-zZ\s]+$/,
      "Only alphabets are allowed for Account Holder Name"
    ),
  // account_type: Yup.string()
  //   .required("Account Type is required")
  //   .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Account Type"),
  bank_name: Yup.string()
    .required("Bank Name is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Bank Name"),

  routing_number: Yup.number().required("Routing Number is required"),
  // confirm_routing_number: Yup.number()
  //   .oneOf([Yup.ref("routing_number"), null], "Routing numbers must match")
  //   .required("Confirm routing number is required"),

  account_number: Yup.number().required("Account Number is required"),
  // confirm_account_number: Yup.number()
  //   .required("Confirm Account Number is required")
  //   .oneOf([Yup.ref("account_number"), null], "Confirm Account Number must match Account Number.")
  //   .label("Confirm Account Number"),
});

export const profileValidationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
});

export const adminProfileValidation = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid"),
});

export const restaurantProfileValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  manager_name: Yup.string().required("Manager Name is required"),
  description: Yup.string().required("Description is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be greater  then 10 digits")
    .max(15, "Must be less then 16 digits")
    .required("Contact Number is required"),
  account_holder_name: Yup.string().required("Account Holder Name is required"),
  account_number: Yup.string()
    .matches(/^\d+$/, "Account Number must be only digits")
    .required("Account Number is required"),
});

export const branchProfileValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be greater  then 10 digits")
    .max(15, "Must be less then 16 digits")
    .required("Contact Number is required"),
});

export const payoutValidation = (prevRate) =>
  Yup.object().shape({
    day: Yup.number()
      .typeError("Day must be a number")
      .required("Day is Required")
      .min(0, "Day must be a positive number")
      .test(
        "is-different",
        "The days have already been taken.",
        function (value) {
          return value !== prevRate;
        }
      ),
  });

export const commissionValidation = (prevRate) =>
  Yup.object().shape({
    rate: Yup.number()
      .typeError("Rate must be a number")
      .required("Rate is Required")
      .min(0, "Rate must be a positive number")
      .test(
        "is-different",
        "The Rate have already been taken.",
        function (value) {
          return value !== prevRate;
        }
      ),
  });

export const loyaltyDataValidation = (preValidity, preLimit) =>
  Yup.object().shape({
    limit: Yup.number()
      .typeError("limit must be a number")
      .required("limit is Required")
      .min(0, "limit must be a positive number")
      .test(
        "is-different",
        "The limit have already been taken.",
        function (value) {
          return value !== preLimit;
        }
      ),
    validity: Yup.number()
      .typeError("validity must be a number")
      .required("validity is Required")
      .min(0, "validity must be a positive number")
      .test(
        "is-different",
        "The validity have already been taken.",
        function (value) {
          return value !== preValidity;
        }
      ),
  });
export const addFlashcardValidationSchema = Yup.object().shape({
  flashcardTitle: Yup.string().required("Flashcard title is required"),
  numberOfCards: Yup.string().required("Total number of cards is required"),
  language: Yup.string().required("Language is required"),
  status: Yup.string().required("Status is required"),
});

export const addQuizValidationSchema = Yup.object().shape({
  quizTitle: Yup.string().required("Quiz title is required"),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        wordOrPhrase: Yup.string().required("Word or phrase is required"),
        options: Yup.array()
          .of(Yup.string().required("Option is required"))
          .min(4, "Must have at least 4 options")
          .max(4, "Must have at most 4 options"),
      })
    )
    .min(1, "At least one question is required"),
  language: Yup.string().required("Language is required"),
  status: Yup.string().required("Status is required"),
});

export const addChallengeValidationSchema = Yup.object().shape({
  challengeTitle: Yup.string().required("Challenge title is required"),
  typeOfChallenge: Yup.string().required("Type is required"),
  startTime: Yup.string()
    .required("Start time is required")
    .test("is-time", "Start time must be a valid time", (value) => {
      return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value); // Simple regex to check HH:mm format
    }),
  endTime: Yup.string()
    .required("End time is required")
    .test("is-time", "End time must be a valid time", (value) => {
      return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value); // Simple regex to check HH:mm format
    })
    .test(
      "is-greater",
      "End time must be after start time",
      function (endTime) {
        const { startTime } = this.parent;
        if (startTime && endTime) {
          return startTime < endTime; // Compare the times as strings
        }
        return true; // If startTime or endTime is not provided, validation passes for this test
      }
    ),
  // timing: Yup.array()
  //   .of(
  //     Yup.string()
  //       .required("Both start time and end time are required")
  //       .matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Time must be in HH:mm format") // Ensures each element matches the HH:mm format
  //   )
  //   .test("is-valid-time-range", "Start time must be before end time", function (value) {
  //     if (!value || value.length < 2) return true; // If array is empty or has less than two items, skip this test
  //     const [startTime, endTime] = value;
  //     if (startTime && endTime) {
  //       return startTime < endTime; // Validate start time is less than end time
  //     }
  //     return true;
  //   })
  //   .min(2, "Timing array must have exactly two elements") // Ensure the array has exactly two elements
  //   .max(2, "Timing array must have exactly two elements"),
  status: Yup.string().required("Status is required"),
});

export const addWordValidationSchema = Yup.object().shape({
  word: Yup.string().required("Word is required"),
  partOfSpeech: Yup.string().required("Part of speech is required"),
  grammaticalGender: Yup.string().required("Grammatical gender is required"),
  pluralForm: Yup.string().required("Plural form is required"),
  synonyms: Yup.string().required("Synonyms are required"),
  antonyms: Yup.string().required("Antonyms are required"),
  definition: Yup.string().required("Definition is required"),
  exampleScenario: Yup.string().required("Scenario is required"),
  category: Yup.string().required("Category is required"),
  language: Yup.string().required("Language is required"),
  status: Yup.string().required("Status is required"),
});
export const addPhrasesValidationSchema = Yup.object().shape({
  phrase: Yup.string().required("Phrase is required"),
  partOfSpeech: Yup.string().required("Part of speech is required"),
  grammaticalGender: Yup.string().required("Grammatical gender is required"),
  pluralForm: Yup.string().required("Plural form is required"),
  antonyms: Yup.string().required("Antonyms are required"),
  synonyms: Yup.string().required("Synonyms are required"),
  definition: Yup.string().required("Definition is required"),
  exampleScenario: Yup.string().required("Scenario is required"),
  category: Yup.string().required("Category is required"),
  language: Yup.string().required("Language is required"),
  status: Yup.string().required("Status is required"),
});
export const addWordsThroughtCsvSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
});
export const addProductCategorySchema = Yup.object().shape({
  category_title: Yup.string()
    .required("Category Title is required")
    .min(3, "Category Title must be at least 3 characters long"),
  // status: Yup.string().required("Status is required"),
});
export const addServiceCategorySchema = Yup.object().shape({
  category_title: Yup.string()
    .required("Category Title is required")
    .min(3, "Category Title must be at least 3 characters long"),
  status: Yup.string().required("Status is required"),
});
export const commissionRate = Yup.object().shape({
  rate: Yup.string().required("Commission is required"),
});
export const addVideoSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Please select one option"),
  video: Yup.mixed()
    .required("A video is required.") // Ensure something is provided
    .test(
      "is-valid-videos",
      "At least one valid video file or URL must be provided.",
      function (value) {
        const validVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

        // Ensure at least one valid file or URL is present
        const hasValidFiles =
          value &&
          value.some((file) => {
            if (typeof file === "string") {
              return true; // If it's a string, assume it's a valid URL
            }
            if (file instanceof File) {
              return validVideoTypes.includes(file.type); // Validate file type
            }
            return false;
          });

        return hasValidFiles;
      }
    ),
});
export const updateVideoSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Please select one option"),
  // video: Yup.mixed()
  //   .required("A video is required.") // Ensure something is provided
  //   .test("is-valid-videos", "At least one valid video file or URL must be provided.", function (value) {
  //     const validVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

  //     // Ensure at least one valid file or URL is present
  //     const hasValidFiles =
  //       value &&
  //       value.some((file) => {
  //         if (typeof file === "string") {
  //           return true; // If it's a string, assume it's a valid URL
  //         }
  //         if (file instanceof File) {
  //           return validVideoTypes.includes(file.type); // Validate file type
  //         }
  //         return false;
  //       });

  //     return hasValidFiles;
  //   }),
});
export const addBlogSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  category: Yup.string().required("Please select one option"),
  banner: Yup.mixed()
    .required("An image is required.") // Ensure something is provided
    .test(
      "is-valid-images",
      "At least one valid image file or URL must be provided.",
      function (value) {
        const validImageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/webp",
          "image/gif",
          "image/png",
        ];

        // Ensure at least one valid file or URL is present
        const hasValidFiles =
          value &&
          value.some((file) => {
            if (typeof file === "string") {
              return true; // If it's a string, assume it's a valid URL
            }
            if (file instanceof File) {
              return validImageTypes.includes(file.type); // Validate file type
            }
            return false;
          });

        return hasValidFiles;
      }
    ),
  file: Yup.mixed()
    .required("A document is required.") // Ensure something is provided
    .test(
      "is-valid-documents",
      "At least one valid document file must be provided.",
      function (value) {
        const validDocumentTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ];

        // Ensure at least one valid file or URL is present
        const hasValidFiles =
          value &&
          value.some((file) => {
            if (typeof file === "string") {
              return true; // If it's a string, assume it's a valid URL
            }
            if (file instanceof File) {
              return validDocumentTypes.includes(file.type); // Validate document file type
            }
            return false;
          });

        return hasValidFiles;
      }
    ),
});
export const editBlogSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required") // Title is required
    .min(3, "Title must be at least 3 characters long"), // Ensure it's at least 3 characters
  category: Yup.string().required("Please select one option"), // Category is required
  banner: Yup.mixed().test(
    "is-valid-images",
    "At least one valid image file or URL must be provided.",
    function (value) {
      const validImageTypes = [
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "image/gif",
        "image/png",
      ];

      // Only validate if there's a value for banner (i.e., if the user is updating the banner)
      if (!value) return true; // Allow for the case where the banner is not updated (empty or undefined)

      const hasValidFiles =
        value &&
        value.some((file) => {
          if (typeof file === "string") {
            return true; // If it's a string, assume it's a valid URL
          }
          if (file instanceof File) {
            return validImageTypes.includes(file.type); // Validate file type
          }
          return false;
        });

      return hasValidFiles;
    }
  ),

  file: Yup.mixed().test(
    "is-valid-documents",
    "At least one valid document file must be provided.",
    function (value) {
      const validDocumentTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      // Only validate if there's a value for file (i.e., if the user is updating the document)
      if (!value) return true; // Allow for the case where the file is not updated (empty or undefined)

      const hasValidFiles =
        value &&
        value.some((file) => {
          if (typeof file === "string") {
            return true; // If it's a string, assume it's a valid URL
          }
          if (file instanceof File) {
            return validDocumentTypes.includes(file.type); // Validate document file type
          }
          return false;
        });

      return hasValidFiles;
    }
  ),
});
export const addArticleSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  category: Yup.string().required("Please select one option"),
  banner: Yup.mixed()
    .required("An image is required.") // Ensure something is provided
    .test(
      "is-valid-images",
      "At least one valid image file or URL must be provided.",
      function (value) {
        const validImageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/webp",
          "image/gif",
          "image/png",
        ];

        // Ensure at least one valid file or URL is present
        const hasValidFiles =
          value &&
          value.some((file) => {
            if (typeof file === "string") {
              return true; // If it's a string, assume it's a valid URL
            }
            if (file instanceof File) {
              return validImageTypes.includes(file.type); // Validate file type
            }
            return false;
          });

        return hasValidFiles;
      }
    ),
  file: Yup.mixed()
    .required("A document is required.") // Ensure something is provided
    .test(
      "is-valid-documents",
      "At least one valid document file must be provided.",
      function (value) {
        const validDocumentTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ];

        // Ensure at least one valid file or URL is present
        const hasValidFiles =
          value &&
          value.some((file) => {
            if (typeof file === "string") {
              return true; // If it's a string, assume it's a valid URL
            }
            if (file instanceof File) {
              return validDocumentTypes.includes(file.type); // Validate document file type
            }
            return false;
          });

        return hasValidFiles;
      }
    ),
});
export const updateArticleSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  category: Yup.string().required("Please select one option"),
  // banner: Yup.mixed()
  //   .required("An image is required.") // Ensure something is provided
  //   .test("is-valid-images", "At least one valid image file or URL must be provided.", function (value) {
  //     const validImageTypes = ["image/jpeg", "image/jpg", "image/webp", "image/gif", "image/png"];

  //     // Ensure at least one valid file or URL is present
  //     const hasValidFiles =
  //       value &&
  //       value.some((file) => {
  //         if (typeof file === "string") {
  //           return true; // If it's a string, assume it's a valid URL
  //         }
  //         if (file instanceof File) {
  //           return validImageTypes.includes(file.type); // Validate file type
  //         }
  //         return false;
  //       });

  //     return hasValidFiles;
  //   }),
  // file: Yup.mixed()
  //   .required("A document is required.") // Ensure something is provided
  //   .test("is-valid-documents", "At least one valid document file must be provided.", function (value) {
  //     const validDocumentTypes = [
  //       "application/pdf",
  //       "application/msword",
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //       "text/plain",
  //     ];

  //     // Ensure at least one valid file or URL is present
  //     const hasValidFiles =
  //       value &&
  //       value.some((file) => {
  //         if (typeof file === "string") {
  //           return true; // If it's a string, assume it's a valid URL
  //         }
  //         if (file instanceof File) {
  //           return validDocumentTypes.includes(file.type); // Validate document file type
  //         }
  //         return false;
  //       });

  //     return hasValidFiles;
  //   }),
});
export const addEBookSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Please select one option"),
  image: Yup.mixed()
    .required("An image is required.") // Ensure something is provided
    .test(
      "is-valid-images",
      "At least one valid image file or URL must be provided.",
      function (value) {
        const validImageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/webp",
          "image/gif",
          "image/png",
        ];

        // Ensure at least one valid file or URL is present
        const hasValidFiles =
          value &&
          value.some((file) => {
            if (typeof file === "string") {
              return true; // If it's a string, assume it's a valid URL
            }
            if (file instanceof File) {
              return validImageTypes.includes(file.type); // Validate file type
            }
            return false;
          });

        return hasValidFiles;
      }
    ),
  file: Yup.mixed()
    .required("A document is required.") // Ensure something is provided
    .test(
      "is-valid-documents",
      "At least one valid document file must be provided.",
      function (value) {
        const validDocumentTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ];

        // Ensure at least one valid file or URL is present
        const hasValidFiles =
          value &&
          value.some((file) => {
            if (typeof file === "string") {
              return true; // If it's a string, assume it's a valid URL
            }
            if (file instanceof File) {
              return validDocumentTypes.includes(file.type); // Validate document file type
            }
            return false;
          });

        return hasValidFiles;
      }
    ),
});
export const updateEBookSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Please select one option"),
  // image: Yup.mixed()
  //   .required("An image is required.") // Ensure something is provided
  //   .test("is-valid-images", "At least one valid image file or URL must be provided.", function (value) {
  //     const validImageTypes = ["image/jpeg", "image/jpg", "image/webp", "image/gif", "image/png"];

  //     // Ensure at least one valid file or URL is present
  //     const hasValidFiles =
  //       value &&
  //       value.some((file) => {
  //         if (typeof file === "string") {
  //           return true; // If it's a string, assume it's a valid URL
  //         }
  //         if (file instanceof File) {
  //           return validImageTypes.includes(file.type); // Validate file type
  //         }
  //         return false;
  //       });

  //     return hasValidFiles;
  //   }),
  // file: Yup.mixed()
  //   .required("A document is required.") // Ensure something is provided
  //   .test("is-valid-documents", "At least one valid document file must be provided.", function (value) {
  //     const validDocumentTypes = [
  //       "application/pdf",
  //       "application/msword",
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //       "text/plain",
  //     ];

  //     // Ensure at least one valid file or URL is present
  //     const hasValidFiles =
  //       value &&
  //       value.some((file) => {
  //         if (typeof file === "string") {
  //           return true; // If it's a string, assume it's a valid URL
  //         }
  //         if (file instanceof File) {
  //           return validDocumentTypes.includes(file.type); // Validate document file type
  //         }
  //         return false;
  //       });

  //     return hasValidFiles;
  //   }),
});
export const addBannerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Full Name of Brand is required")
    .min(3, "Full Name of Brand must be at least 3 characters long"),
  email: Yup.string().required("Email Address is required"),
  url: Yup.string().required("URL is required"),
  status: Yup.string().required("Status is required"),
  expiry_date: Yup.string().required("Expiry Date is required"),
  image: Yup.mixed()
    .required("An image is required.") // Ensure something is provided
    .test(
      "is-valid-images",
      "At least one valid image file or URL must be provided.",
      function (value) {
        const validImageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/webp",
          "image/gif",
          "image/png",
        ];

        // Ensure at least one valid file or URL is present
        const hasValidFiles =
          value &&
          value.some((file) => {
            if (typeof file === "string") {
              return true; // If it's a string, assume it's a valid URL
            }
            if (file instanceof File) {
              return validImageTypes.includes(file.type); // Validate file type
            }
            return false;
          });

        return hasValidFiles;
      }
    ),
});
export const editBannerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Full Name of Brand is required")
    .min(3, "Full Name of Brand must be at least 3 characters long"),
  email: Yup.string().required("Email Address is required"),
  url: Yup.string().required("URL is required"),
  status: Yup.string().required("Status is required"),
  expiry_date: Yup.string().required("Expiry Date is required"),
  // image: Yup.mixed()
  //   .required("An image is required.") // Ensure something is provided
  //   .test("is-valid-images", "At least one valid image file or URL must be provided.", function (value) {
  //     const validImageTypes = ["image/jpeg", "image/jpg", "image/webp", "image/gif", "image/png"];

  //     // Ensure at least one valid file or URL is present
  //     const hasValidFiles =
  //       value &&
  //       value.some((file) => {
  //         if (typeof file === "string") {
  //           return true; // If it's a string, assume it's a valid URL
  //         }
  //         if (file instanceof File) {
  //           return validImageTypes.includes(file.type); // Validate file type
  //         }
  //         return false;
  //       });

  //     return hasValidFiles;
  //   }),
});
export const addNewSubscriptionPlanProviderSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  duration: Yup.string().required("Duration is required"),
  price: Yup.string().required("Price is required"),
  description: Yup.string().required("Description is required"),
});
export const addNewSubscriptionPlanUserScheme = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  duration: Yup.string().required("Duration is required"),
  price: Yup.string().required("Price is required"),
  description: Yup.string().required("Description is required"),
});
// export const disbursementTime = Yup.object().shape({
//   rate: Yup.string().required("Disbursement time is required"),
// });

export const disbursementTime = Yup.object().shape({
  rate: Yup.number()
    .typeError("Disbursement time must be a number")
    .required("Disbursement time must be between 2 to 30")
    .min(2, "Disbursement time must be between 2 to 30")
    .max(30, "Disbursement time must be between 2 to 30"),
});

const accountTypeValues = accountTypeOptions.map((option) => option.value);
export const addBankDetailSchema = Yup.object().shape({
  accountHolderName: Yup.string()
    .required("Account holder name is required")
    .min(2, "Account holder name must be at least 2 characters")
    .max(50, "Account holder name must be 50 characters or less"),

  accountType: Yup.string()
    .required("Account type is required")
    .oneOf(
      accountTypeValues,
      `Account type must be one of: ${accountTypeValues.join(", ")}`
    ),

  bankName: Yup.string()
    .required("Bank name is required")
    .min(2, "Bank name must be at least 2 characters")
    .max(50, "Bank name must be 50 characters or less"),

  routingNumber: Yup.string()
    .required("Routing number is required")
    .matches(/^[0-9]{9}$/, "Routing number must be 9 digits"),

  accountNumber: Yup.string()
    .required("Account number is required")
    .matches(/^[0-9]{8,17}$/, "Account number must be between 8 and 17 digits"),
});
export const addOtpSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^[0-9]{6}$/, "OTP must be a 6-digit number"),
});
export const addInAppProductSchema = Yup.object().shape({
  title: Yup.string()
    .required("Product Title is required")
    .min(3, "Title must be at least 3 characters long"),
  amount: Yup.string().required("Price is required"),
  description: Yup.string().required("Description is required"),
  file: Yup.mixed()

    .required("A document is required.")
    .test(
      "is-valid-documents",
      "At least one valid document file must be provided.",
      function (value) {
        const validDocumentTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ];

        // Ensure at least one valid file or URL is present
        const hasValidFiles =
          value &&
          value.some((file) => {
            if (typeof file === "string") {
              return true; // If it's a string, assume it's a valid URL
            }
            if (file instanceof File) {
              return validDocumentTypes.includes(file.type); // Validate document file type
            }
            return false;
          });

        return hasValidFiles;
      }
    ),
});
export const updateInAppProductSchema = Yup.object().shape({
  title: Yup.string()
    .required("Product Title is required")
    .min(3, "Title must be at least 3 characters long"),
  amount: Yup.string().required("Price is required"),
  description: Yup.string().required("Description is required"),
  // file: Yup.mixed()
  //   .required("A document is required.")
  //   .test("is-valid-documents", "At least one valid document file must be provided.", function (value) {
  //     const validDocumentTypes = [
  //       "application/pdf",
  //       "application/msword",
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //       "text/plain",
  //     ];

  //     // Ensure at least one valid file or URL is present
  //     const hasValidFiles =
  //       value &&
  //       value.some((file) => {
  //         if (typeof file === "string") {
  //           return true; // If it's a string, assume it's a valid URL
  //         }
  //         if (file instanceof File) {
  //           return validDocumentTypes.includes(file.type); // Validate document file type
  //         }
  //         return false;
  //       });

  //     return hasValidFiles;
  //   }),
});
export const addEmergencyContactSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  phone: Yup.string().required("Phone number is required"),
  // .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid"),
});

// export const faqSchema = Yup.object().shape({
//   faqs: Yup.array()
//     .of(
//       Yup.object().shape({
//         question: Yup.string()
//           .trim()
//           .required("Question is required")
//           .min(5, "Question must be at least 5 characters")
//           .max(200, "Question cannot be longer than 200 characters"),

//         type: Yup.string()
//           .oneOf(["text", "image", "video"], "Invalid answer type")
//           .required("Answer type is required"),

//         answer: Yup.string().when("answerType", {
//           is: "text",
//           then: (schema) =>
//             schema
//               .trim()
//               .required("Answer is required")
//               .min(5, "Answer must be at least 5 characters")
//               .max(500, "Answer cannot be longer than 500 characters"),
//           otherwise: (schema) => schema.notRequired(),
//         }),

//         photo: Yup.mixed().when("type", {
//           is: "image",
//           then: (schema) =>
//             schema
//               .nullable()
//               .required("Photo is required")
//               .test("is-valid-images", "At least one valid image file or URL must be provided.", function (value) {
//                 const validImageTypes = ["image/jpeg", "image/jpg", "image/webp", "image/gif", "image/png"];

//                 // Ensure at least one valid file or URL is present
//                 const hasValidFiles =
//                   Array.isArray(value) && value.length > 0 && value.some((file) => {
//                     if (typeof file === "string") {
//                       return true; // If it's a string, assume it's a valid URL
//                     }
//                     if (file instanceof File) {
//                       return validImageTypes.includes(file.type); // Validate file type
//                     }
//                     return false;
//                   });

//                 return hasValidFiles;
//               }),
//           otherwise: (schema) => schema.notRequired(),
//         }),

//         video: Yup.mixed().when("type", {
//           is: "video",
//           then: (schema) =>
//             schema
//               .nullable()
//               .required("Video is required")
//               .test("is-valid-videos", "At least one valid video file or URL must be provided.", function (value) {
//                 const validVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

//                 // Ensure at least one valid file or URL is present
//                 const hasValidFiles =
//                   Array.isArray(value) && value.length > 0 && value.some((file) => {
//                     if (typeof file === "string") {
//                       return true; // If it's a string, assume it's a valid URL
//                     }
//                     if (file instanceof File) {
//                       return validVideoTypes.includes(file.type); // Validate file type
//                     }
//                     return false;
//                   });

//                 return hasValidFiles;
//               }),
//           otherwise: (schema) => schema.notRequired(),
//         }),
//       })
//     )
//     .required("At least one FAQ is required")
//     .min(1, "At least one FAQ is required"),
// });

export const faqSchema = Yup.object().shape({
  question: Yup.string()
    .trim()
    .required("Question is required")
    .min(5, "Question must be at least 5 characters")
    .max(200, "Question cannot be longer than 200 characters"),

  type: Yup.string()
    .oneOf(["text", "image", "video"], "Invalid answer type")
    .required("Answer type is required"),

  answer: Yup.string().when("type", {
    is: "text",
    then: (schema) =>
      schema
        .trim()
        .required("Answer is required")
        .min(5, "Answer must be at least 5 characters")
        .max(500, "Answer cannot be longer than 500 characters"),
    otherwise: (schema) => schema.notRequired(),
  }),
  image: Yup.mixed().when("type", {
    is: "image",
    then: (schema) =>
      schema
        .required("An image is required.") // Ensure something is provided
        .test(
          "is-valid-images",
          "At least one valid image file or URL must be provided.",
          function (value) {
            const validImageTypes = [
              "image/jpeg",
              "image/jpg",
              "image/webp",
              "image/gif",
              "image/png",
            ];

            // Ensure at least one valid file or URL is present
            const hasValidFiles =
              value &&
              value.some((file) => {
                if (typeof file === "string") {
                  return true; // If it's a string, assume it's a valid URL
                }
                if (file instanceof File) {
                  return validImageTypes.includes(file.type); // Validate file type
                }
                return false;
              });

            return hasValidFiles;
          }
        ),
    otherwise: (schema) => schema.notRequired(),
  }),

  video: Yup.mixed().when("type", {
    is: "video",
    then: (schema) =>
      schema
        .required("A video is required.") // Ensure something is provided
        .test(
          "is-valid-videos",
          "At least one valid video file or URL must be provided.",
          function (value) {
            const validVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

            // Ensure at least one valid file or URL is present
            const hasValidFiles =
              value &&
              value.some((file) => {
                if (typeof file === "string") {
                  return true; // If it's a string, assume it's a valid URL
                }
                if (file instanceof File) {
                  return validVideoTypes.includes(file.type); // Validate file type
                }
                return false;
              });

            return hasValidFiles;
          }
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
});
export const updateFaqSchema = Yup.object().shape({
  question: Yup.string()
    .trim()
    .required("Question is required")
    .min(5, "Question must be at least 5 characters")
    .max(200, "Question cannot be longer than 200 characters"),

  type: Yup.string()
    .oneOf(["text", "image", "video"], "Invalid answer type")
    .required("Answer type is required"),

  answer: Yup.string().when("type", {
    is: "text",
    then: (schema) =>
      schema
        .trim()
        .required("Answer is required")
        .min(5, "Answer must be at least 5 characters")
        .max(500, "Answer cannot be longer than 500 characters"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
export const userContactValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  // email: Yup.string().email("Invalid email address").required("Email is required"),
  email: Yup.string().required("Email or Phone is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

// Validation Schema for Formik
export const addUserEmergencyContactSchema = Yup.object().shape({
  contacts: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone number is required"),
    })
  ),
});

// Validation Schema for Payment Method
export const subsPaymentValidationSchema = Yup.object({
  // Card Holder Name
  card_holder_name: Yup.string()
    .required("Card Holder Name is required")
    .min(3, "Card Holder Name should be at least 3 characters long")
    .max(100, "Card Holder Name cannot exceed 100 characters"),

  // Credit/Debit Card Number
  card_number: Yup.string()
    .required("Card Number is required")
    .matches(/^[0-9]{16}$/, "Card Number must be 16 digits")
    .test("valid-card", "Invalid card number", (value) => {
      // You can add custom validation here for specific card types
      return value && value.length === 16;
    }),

  // Validity Date (Month and Year)
  // month: Yup.string().required("Month is required"), // Separate validation
  // year: Yup.string().required("Year is required"),   // Separate validation

  status: Yup.object().shape({
    month: Yup.string().required("Month is required"),
    year: Yup.string().required("Year is required"),
  }),

  // CVV Number
  cvv_number: Yup.string()
    .required("CVV Number is required")
    .matches(/^[0-9]{3}$/, "CVV Number must be 3 digits"),

  // Optional: Add more fields like auto renewal if needed
});

export const checkoutValidationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  // phone: Yup.string().required("Phone number is required"),

  mobile_number: Yup.string().required("Mobile number is required"),

  shipping_first_name: Yup.string().required("First name is required"),
  shipping_last_name: Yup.string().required("Last name is required"),
  shipping_mobile_number: Yup.string().required("Mobile number is required"),
  shipping_address: Yup.string().required("Residential Address is required"),
  shipping_country: Yup.string().required("Country is required"),
  shipping_state: Yup.string().required("State is required"),
  shipping_zip_code: Yup.string()
    .matches(/^\d+$/, "Zip code must contain only digits")
    .required("Zip code is required"),
  shipping_city: Yup.string().required("City is required"),
  sameBillingAddress: Yup.boolean().required("This field is required"),

  billing_first_name: Yup.string().required("First name is required"),
  billing_last_name: Yup.string().required("Last name is required"),
  billing_mobile_number: Yup.string().required("Mobile number is required"),
  billing_address: Yup.string().required("Residential Address is required"),
  billing_country: Yup.string().required("Country is required"),
  billing_state: Yup.string().required("State is required"),
  billing_zip_code: Yup.string()
    .matches(/^\d+$/, "Zip code must contain only digits")
    .required("Zip code is required"),
  billing_city: Yup.string().required("City is required"),
});

// Validation Schema for Payment Method
export const paymentCardValidationSchema = Yup.object({
  // Card Holder Name
  card_holder_name: Yup.string()
    .required("Card Holder Name is required")
    .min(3, "Card Holder Name should be at least 3 characters long")
    .max(100, "Card Holder Name cannot exceed 100 characters"),

  // Credit/Debit Card Number
  card_number: Yup.string()
    .required("Card Number is required")
    .matches(/^[0-9]{16}$/, "Card Number must be 16 digits")
    .test("valid-card", "Invalid card number", (value) => {
      // You can add custom validation here for specific card types
      return value && value.length === 16;
    }),

  status: Yup.object().shape({
    month: Yup.string().required("Month is required"),
    year: Yup.string().required("Year is required"),
  }),

  // CVV Number
  cvv_number: Yup.string()
    .required("CVV Number is required")
    .matches(/^[0-9]{3}$/, "CVV Number must be 3 digits"),
});

export const ratingValidationSchema = Yup.object().shape({
  review_text: Yup.string()
    .required("Review text is required.")
    .min(10, "Review text must be at least 10 characters long."), // Optional minimum length
  rating: Yup.number()
    .required("Rating is required.")
    .min(1, "Rating must be at least 1.") // Ensure a rating is selected
    .max(5, "Rating cannot be more than 5."), // If applicable for your use case
});

export const referRewardValidationSchema = Yup.object().shape({
  newUsers: Yup.string().required("Please select number of new users"),
  status: Yup.string().required("Status is required"),
  productTitle: Yup.string().required("Product title is required"),
  productDescription: Yup.string().required("Product description is required"),
  voucherTitle: Yup.string().required("Voucher title is required"),
  voucherDescription: Yup.string().required("Voucher description is required"),
  appGiftDocument: Yup.mixed(),
  voucherDocument: Yup.mixed(),
});
export const reasonValidationSchema = Yup.object().shape({
  reason: Yup.string().required("Rejection Reason is required."),
});
export const BookingvalidationSchema = Yup.object({
  // selectedDate: Yup.number().required("Please select a date"),
  // selectedTime: Yup.number().required("Please select a time"),
  // city: Yup.string().required("City is required"),
  // address: Yup.string().required("Address is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  mobile_number: Yup.string()
    // .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

// export const serviceValidationSchema = Yup.object().shape({
//   service_type: Yup.string()
//     .required('Please select a service type')
//     .oneOf(['online', 'offline', 'both'], 'Invalid service type'),
//   service_name: Yup.string()
//     .required('Service name is required')
//     .min(2, 'Service name must be at least 2 characters')
//     .max(100, 'Service name must not exceed 100 characters'),

//   // online_charges: Yup.number()
//   //   .required('Online charges are required')
//   //   .min(0, 'Charges cannot be negative')
//   //   .typeError('Please enter a valid number'),

//   // onsite_charges: Yup.number()
//   //   .required('Onsite charges are required')
//   //   .min(0, 'Charges cannot be negative')
//   //   .typeError('Please enter a valid number'),

//   descriptions: Yup.string()
//     .required('Description is required')
//     .min(10, 'Description must be at least 10 characters')
//     .max(1200, 'Description must not exceed 1000 characters'),

//   // banner_images: Yup.mixed()
//   //   .required("An image is required.") // Ensure something is provided
//   //   .test("is-valid-images", "At least one valid image file or URL must be provided.", function (value) {

//   //   const validImageTypes = ["image/jpeg", "image/jpg", "image/webp", "image/gif", "image/png"];
//   //   // Ensure at least one valid file or URL is present
//   //   const hasValidFiles =
//   //     value &&
//   //     value.some((file) => {
//   //       if (typeof file === "string") {
//   //         return true; // If it's a string, assume it's a valid URL
//   //       }
//   //       if (file instanceof File) {
//   //         return validImageTypes.includes(file.type); // Validate file type
//   //       }
//   //       return false;
//   //     });

//   //   return hasValidFiles;
//   // }),
//   banner_images: Yup.mixed()
//     .required("An image is required.") // Ensure something is provided
//     .test("is-valid-images", "At least one valid image file or URL must be provided.", function (value) {
//       const validImageTypes = ["image/jpeg", "image/jpg", "image/webp", "image/gif", "image/png"];

//       if (!value) return false;

//       // If value is a string (URL), consider it valid
//       if (typeof value === "string") {
//         return true;
//       }

//       // If value is an array, check if at least one valid file exists
//       if (Array.isArray(value)) {
//         return value.some((file) => {
//           if (typeof file === "string") {
//             return true; // Assume URL is valid
//           }
//           if (file instanceof File) {
//             return validImageTypes.includes(file.type); // Validate file type
//           }
//           return false;
//         });
//       }

//       return false;
//     }),

//   add_address: Yup.string().required("Please select an address option"),
//   maplink: Yup.string().when("add_address", (value) => {
//     if (value[0] === "map_address") {
//       return Yup.string().required("Maplink is required when adding an address");
//     }
//     return Yup.string().notRequired();
//   }),

// });

export const serviceValidationSchema = Yup.object().shape({
  service_type: Yup.string()
    .required("Please select a service type")
    .oneOf(["online", "offline", "both"], "Invalid service type"),
  online_charges: Yup.number().when("service_type", {
    is: (type) => type === "online" || type === "both",
    then: (schema) =>
      schema
        .required("Online charges are required")
        .min(0, "Charges cannot be negative"),
    otherwise: (schema) => schema.notRequired(),
  }),

  onsite_charges: Yup.number().when("service_type", {
    is: (type) => type === "offline" || type === "both",
    then: (schema) =>
      schema
        .required("Onsite charges are required")
        .min(0, "Charges cannot be negative"),
    otherwise: (schema) => schema.notRequired(),
  }),

  service_name: Yup.string()
    .required("Service name is required")
    .min(2, "Service name must be at least 2 characters")
    .max(100, "Service name must not exceed 100 characters"),

  descriptions: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1200, "Description must not exceed 1000 characters"),

  banner_images: Yup.mixed()
    .required("An image is required.") // Ensure something is provided
    .test(
      "is-valid-images",
      "At least one valid image file or URL must be provided.",
      function (value) {
        const validImageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/webp",
          "image/gif",
          "image/png",
        ];
        // Ensure at least one valid file or URL is present
        const hasValidFiles =
          value &&
          value.some((file) => {
            if (typeof file === "string") {
              return true; // If it's a string, assume it's a valid URL
            }
            if (file instanceof File) {
              return validImageTypes.includes(file.type); // Validate file type
            }
            return false;
          });

        return hasValidFiles;
      }
    ),

  // add_address: Yup.string().required("Please select an address option"),

  // maplink: Yup.string().when("add_address", (value) => {
  //   if (value[0] === "map_address") {
  //     return Yup.string().required("Maplink is required when adding an address");
  //   }
  //   return Yup.string().notRequired();
  // }),
});

export const updateServiceValidationSchema = Yup.object().shape({
  service_type: Yup.string()
    .required("Please select a service type")
    .oneOf(["online", "onsite", "both"], "Invalid service type"),
  service_name: Yup.string()
    .required("Service name is required")
    .min(2, "Service name must be at least 2 characters")
    .max(100, "Service name must not exceed 100 characters"),

  // online_charges: Yup.number()
  //   .required('Online charges are required')
  //   .min(0, 'Charges cannot be negative')
  //   .typeError('Please enter a valid number'),

  // onsite_charges: Yup.number()
  //   .required('Onsite charges are required')
  //   .min(0, 'Charges cannot be negative')
  //   .typeError('Please enter a valid number'),

  descriptions: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1200, "Description must not exceed 1000 characters"),

  // banner_images: Yup.mixed()
  //   .required("An image is required.") // Ensure something is provided
  //   .test("is-valid-images", "At least one valid image file or URL must be provided.", function (value) {

  //   const validImageTypes = ["image/jpeg", "image/jpg", "image/webp", "image/gif", "image/png"];
  //   // Ensure at least one valid file or URL is present
  //   const hasValidFiles =
  //     value &&
  //     value.some((file) => {
  //       if (typeof file === "string") {
  //         return true; // If it's a string, assume it's a valid URL
  //       }
  //       if (file instanceof File) {
  //         return validImageTypes.includes(file.type); // Validate file type
  //       }
  //       return false;
  //     });

  //   return hasValidFiles;
  // }),
  banner_images: Yup.mixed()
    .required("An image is required.") // Ensure something is provided
    .test(
      "is-valid-images",
      "At least one valid image file or URL must be provided.",
      function (value) {
        const validImageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/webp",
          "image/gif",
          "image/png",
        ];

        if (!value) return false;

        // If value is a string (URL), consider it valid
        if (typeof value === "string") {
          return true;
        }

        // If value is an array, check if at least one valid file exists
        if (Array.isArray(value)) {
          return value.some((file) => {
            if (typeof file === "string") {
              return true; // Assume URL is valid
            }
            if (file instanceof File) {
              return validImageTypes.includes(file.type); // Validate file type
            }
            return false;
          });
        }

        return false;
      }
    ),

  // add_address: Yup.string().required("Please select an address option"),
  // address: Yup.string().when("add_address", (value) => {
  //   if (value[0] === "map_address") {
  //     return Yup.string().required("Maplink is required when adding an address");
  //   }
  //   return Yup.string().notRequired();
  // }),
});

export const createShopValidationSchema = Yup.object().shape({
  shop_name: Yup.string()
    .required("Shop name is required")
    .min(2, "Shop name must be at least 2 characters")
    .max(100, "Shop name must not exceed 100 characters"),

  delivery_fees: Yup.number()
    .required("Delivery fees are required")
    .min(0, "Charges cannot be negative")
    .typeError("Please enter a valid number"),

  banner_images: createImageValidation(
    "At least one valid image file or URL must be provided."
  ),

  // banner_images: Yup.mixed()
  //   .required("An image is required.") // Ensure something is provided
  //   .test("is-valid-images", "At least one valid image file or URL must be provided.", function (value) {

  //   const validImageTypes = ["image/jpeg", "image/jpg", "image/webp", "image/gif", "image/png"];
  //   // Ensure at least one valid file or URL is present

  //   const hasValidFiles =
  //     value &&
  //     value.some((file) => {
  //       if (typeof file === "string") {
  //         return true; // If it's a string, assume it's a valid URL
  //       }
  //       if (file instanceof File) {
  //         return validImageTypes.includes(file.type); // Validate file type
  //       }
  //       return false;
  //     });

  //   return hasValidFiles;
  // }),
});

export const addProductSchema = Yup.object().shape({
  product_title: Yup.string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must not exceed 100 characters"),
  product_category: Yup.string().required("Category is required"),
  deliverey_type: Yup.string().required("Delivery type is required"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(["0", "1"], "Please select a valid status"),
  product_description: Yup.string()
    .required("Product description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),

  product_images: Yup.mixed()
    .required("An image is required.") // Ensure something is provided
    .test(
      "is-valid-images",
      "At least one valid image file or URL must be provided.",
      function (value) {
        const validImageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/webp",
          "image/gif",
          "image/png",
        ];
        // Ensure at least one valid file or URL is present
        const hasValidFiles =
          value &&
          value.some((file) => {
            if (typeof file === "string") {
              return true; // If it's a string, assume it's a valid URL
            }
            if (file instanceof File) {
              return validImageTypes.includes(file.type); // Validate file type
            }
            return false;
          });

        return hasValidFiles;
      }
    ),

  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0")
    .test("decimal", "Price can have maximum 2 decimal places", (value) => {
      if (!value) return true;
      return /^\d+(\.\d{0,2})?$/.test(value.toString());
    }),

  product_quantity: Yup.number()
    .required("Quantity is required")
    .integer("Quantity must be a whole number")
    .min(0, "Quantity must be greater than or equal to 0"),
});

export const editProviderValidation = Yup.object().shape({
  photo: Yup.mixed()
    .test("required", "Profile image is required", (value) => {
      if (typeof value === "string") {
        return true;
      }
      return value instanceof File;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value || typeof value === "string") return true;
      return value.type.startsWith("image/");
    }),

  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("Country is required"),
  bio: Yup.string().required("Bio is required"),
  language: Yup.string().required("Language is required"),
  certifications: Yup.array().of(
    Yup.object().shape({
      certificate_title: Yup.string().required(
        "Tell us about you, what you do and any certifications we should know about is required"
      ),
      institute_name: Yup.string().required("Institution Name is required"),
      certificate_img: createImageValidation("Certificate Image required."),
    })
  ),
});

export const editProductSchema = Yup.object().shape({
  product_title: Yup.string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must not exceed 100 characters"),
  product_category: Yup.string().required("Category is required"),
  deliverey_type: Yup.string().required("Delivery type is required"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(["0", "1"], "Please select a valid status"),
  product_description: Yup.string()
    .required("Product description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),

  // product_images: Yup.mixed()
  // .required("An image is required.") // Ensure something is provided
  // .test("is-valid-images", "At least one valid image file or URL must be provided.", function (value) {
  //   const validImageTypes = ["image/jpeg", "image/jpg", "image/webp", "image/gif", "image/png"];
  //   // Ensure at least one valid file or URL is present
  //   const hasValidFiles =
  //     value &&
  //     value.some((file) => {
  //       if (typeof file === "string") {
  //         return true; // If it's a string, assume it's a valid URL
  //       }
  //       if (file instanceof File) {
  //         return validImageTypes.includes(file.type); // Validate file type
  //       }
  //       return false;
  //     });

  //   return hasValidFiles;
  // }),

  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0")
    .test("decimal", "Price can have maximum 2 decimal places", (value) => {
      if (!value) return true;
      return /^\d+(\.\d{0,2})?$/.test(value.toString());
    }),

  product_quantity: Yup.number()
    .required("Quantity is required")
    .integer("Quantity must be a whole number")
    .min(0, "Quantity must be greater than or equal to 0"),
});

export const addChallengeSchema = Yup.object().shape({
  challengeTitle: Yup.string().required("Challenge title is required"),
  challengeDescription: Yup.string().required(
    "Challenge description is required"
  ),
  badgeType: Yup.string().required("Badge type is required"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(["0", "1"], "Please select a valid status"),
  startTime: Yup.string()
    .required("Start time is required")
    .test("is-time", "Start time must be a valid time", (value) => {
      return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value); // Simple regex to check HH:mm format
    }),
  endTime: Yup.string()
    .required("End time is required")
    .test("is-time", "End time must be a valid time", (value) => {
      return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value); // Simple regex to check HH:mm format
    })
    .test(
      "is-greater",
      "End time must be after start time",
      function (endTime) {
        const { startTime } = this.parent;
        if (startTime && endTime) {
          return startTime < endTime; // Compare the times as strings
        }
        return true; // If startTime or endTime is not provided, validation passes for this test
      }
    ),
});
