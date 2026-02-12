import * as yup from "yup";
import { CompanyTypes } from "@/utils/constants";

export const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  companyName: yup.string().required("Company name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^\+?[1-9]\d{1,14}$/,
      "Please enter a valid international phone number"
    )
    .required("Phone number is required"),
  countryCode: yup.string().required("Country Code is required"),
  streetAddress: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipCode: yup.string().required("ZIP code is required"),
  country: yup.string().required("Country is required"),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
  proofOfAddress: yup.string().required("Proof is required"),
});

// export const registerSchema = yup.object().shape({
//   companyName: yup
//     .string()
//     .required("Company name is required")
//     .max(100, "Company name must be under 100 characters"),

//   companyType: yup
//     .mixed()
//     .oneOf([CompanyTypes.individual, CompanyTypes.partnership])
//     .required("Company type is required"),

//   // Fields for individual company
//   firstName: yup.string().when("companyType", {
//     is: CompanyTypes.individual,
//     then: (schema) => schema.required("First name is required"),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   lastName: yup.string().when("companyType", {
//     is: CompanyTypes.individual,
//     then: (schema) => schema.required("Last name is required"),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   email: yup
//     .string()
//     .email("Enter a valid email")
//     .when("companyType", {
//       is: CompanyTypes.individual,
//       then: (schema) => schema.required("Email is required"),
//       otherwise: (schema) => schema.notRequired(),
//     }),

//   streetAddress: yup.string().when("companyType", {
//     is: CompanyTypes.individual,
//     then: (schema) => schema.required("Street address is required"),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   city: yup.string().when("companyType", {
//     is: CompanyTypes.individual,
//     then: (schema) => schema.required("City is required"),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   state: yup.string().when("companyType", {
//     is: CompanyTypes.individual,
//     then: (schema) => schema.required("State is required"),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   zipCode: yup.string().when("companyType", {
//     is: CompanyTypes.individual,
//     then: (schema) => schema.required("ZIP code is required"),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   country: yup.string().when("companyType", {
//     is: CompanyTypes.individual,
//     then: (schema) => schema.required("Country is required"),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   proofOfAddress: yup.string().when("companyType", {
//     is: CompanyTypes.individual,
//     then: (schema) => schema.required("Proof of address is required"),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   countryCode: yup.string().when("companyType", {
//     is: CompanyTypes.individual,
//     then: (schema) => schema.required("Country code is required"),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   phone: yup.string().when("companyType", {
//     is: CompanyTypes.individual,
//     then: (schema) => schema.required("Country code is required"),
//     otherwise: (schema) => schema.notRequired(),
//   }),

//   agreeTerms: yup
//     .boolean()
//     .oneOf([true], "You must agree to the terms and privacy policy")
//     .required("Agreement is required"),

//   // Fields for partnership companies
//   partners: yup.array().when("companyType", {
//     is: CompanyTypes.partnership,
//     then: (schema) =>
//       schema
//         .of(
//           yup.object().shape({
//             firstName: yup.string().required("First name is required"),
//             lastName: yup.string().required("Last name is required"),
//             email: yup
//               .string()
//               .email("Enter a valid email")
//               .required("Email is required"),
//             streetAddress: yup.string().required("Street address is required"),
//             city: yup.string().required("City is required"),
//             state: yup.string().required("State is required"),
//             zipCode: yup.string().required("ZIP code is required"),
//             country: yup.string().required("Country is required"),
//             proofOfAddress: yup
//               .string()
//               .required("Proof of address is required"),
//             countryCode: yup
//               .string()
//               .required("Country code is required")
//               .matches(/^\+\d+$/, "Invalid country code"),
//             phone: yup
//               .string()
//               .required("Phone number is required")
//               .matches(/^[0-9]{7,15}$/, "Enter a valid phone number"),
//           })
//         )
//         .min(2, "At least 2 partners are required")
//         .max(3, "You can have up to 3 partners"),
//     otherwise: (schema) => schema.notRequired(),
//   }),
// });

export const registerSchemaAdmin = yup.object().shape({
  customerId: yup.string().required("Required Filed"),
  companyType: yup.string().required("Company Type is required"),
  registrationState: yup.string().required("Registration State is required"),
  isPaid: yup.string().required("Required field"),
  isSubscribed: yup.string().required("Required field"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  companyName: yup.string().required("Company name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^\+?[1-9]\d{1,14}$/,
      "Please enter a valid international phone number"
    )
    .required("Phone number is required"),
  countryCode: yup.string().required("Country Code is required"),
  streetAddress: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipCode: yup.string().required("ZIP code is required"),
  country: yup.string().required("Country is required"),

  proofOfAddress: yup.string().required("Proof is required"),
});
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

export const createAccountSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("email"), undefined], "Confirm Email must match Email")
    .required("Confirm Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .mixed() // Use mixed for confirmPassword as explained before
    .oneOf([yup.ref("password")], "Confirm Password must match Password")
    .required("Confirm Password is required"),
  agreeTerms: yup.boolean().oneOf([true], "You must agree to the terms"),
});

export const createUserAccountSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim("First Name cannot include leading or trailing spaces")
    .matches(
      /^[A-Za-z\s'-]+$/,
      "First Name cannot contain numbers or special characters"
    )
    .required("First Name is required"),
  lastName: yup
    .string()
    .trim("Last Name cannot include leading or trailing spaces")
    .matches(
      /^[A-Za-z\s'-]+$/,
      "Last Name cannot contain numbers or special characters"
    )
    .required("Last Name is required"),
  email: yup
    .string()
    .trim("Email cannot include leading or trailing spaces")
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .trim("Password cannot include leading or trailing spaces")
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  commission: yup
    .number()
    .typeError("Commission must be a number")
    .positive("Commission must be a positive number")
    .test(
      "is-decimal",
      "Commission must be a valid number (e.g., 10.5, 20.5)",
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString())
    )
    .when("userType", {
      is: (userType: string) => userType === "member",
      then: (schema) => schema.required("Commission is required for members"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const profileSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const uploadDocumentSchems = yup.object().shape({
  type: yup.string().required("Heading Type is required"),
  description: yup
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
  file: yup.string().required("File is required"),
  docType: yup.string().required("Document type is required"),
});

export const filedActionSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
  fields: yup.string().required("Fields is required"),
});

export const emailOnlySchema = yup.object({
  emailData: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup.string().notRequired(),
  cpassword: yup.string().notRequired(),
});

export const withPasswordSchema = yup.object({
  emailData: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const otpSchema = yup.object({
  otp: yup.string().required("OTP is required"),
});

export const emailSendSchema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  content: yup
    .string()
    .trim()
    .min(30, "Description must be at least 30 characters"),
  template: yup.string().required("Template is required"),
});

export const addMailAddressSchema = yup.object().shape({
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  street: yup.string().required("Street is required"),
  zipcode: yup.string().required("Zipcode is required"),
});

export const createPaymentSchema = yup.object().shape({
  companyId: yup.string().required("Customer is required"),
  paymentId: yup.string().required("Payment ID is required"),
  paymentDate: yup.string().required("Payment date is required"),
  paymentType: yup.string().required("Payment type is required"),
  paymentStatus: yup.string().required("Payment status is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
  currency: yup.string().required("Currency is required"),
  invoiceUrl: yup
    .string()
    .url("Invoice URL must be a valid URL")
    .nullable()
    .notRequired(),
  description: yup.string().max(500, "Description is too long"),
});
