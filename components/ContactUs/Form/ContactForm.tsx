import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.scss";

const ContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    description: Yup.string().max(
      400,
      "Description must be at most 300 characters"
    ),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: typeof initialValues, { resetForm }: any) => {
    console.log("Submitted values:", values);
    resetForm();
  };
  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          {/* Name Field */}
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" className={styles.inputField} />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>

          {/* Email Field */}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              className={styles.inputField}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          {/* Description Field */}
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <Field
              as="textarea"
              id="description"
              name="description"
              rows="4"
              className={styles.inputField}
            />
            <ErrorMessage
              name="description"
              component="div"
              className={styles.error}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
