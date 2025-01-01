import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  companyName: yup.string().required("Company name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
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
