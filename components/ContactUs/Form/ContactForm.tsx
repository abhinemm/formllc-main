import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.scss";
import axios from "axios";
import { NotificationPlacement } from "antd/es/notification/interface";
import { notification, Spin } from "antd";
import SucessModal from "../SucessModal";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const ContactForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const initialValues = {
    name: "",
    email: "",
    description: "",
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
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
  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    setLoading(true);
    console.log("Submitted values:", values);
    const data = {
      subject: values.name,
      email: values.email,
      description: values?.description,
    };
    setEmail(values.email);
    try {
      await axios
        .post(`/api/contactus`, data)
        .then((res: any) => {
          console.log("the response", res);
          resetForm();
          setLoading(false);
          setSuccess(true);
        })
        .catch((err: any) => {
          setLoading(false);
          const message = err?.response?.data?.error || "Something went wrong!";
          openNotification({
            type: "error",
            message: message,
            placement: "topRight",
          });
          console.log("the error is ", err);
        });
    } catch (error) {
      console.log("the error is ", error);
      setLoading(false);
    }
  };
  return (
    <div className={styles.formContainer}>
      {contextHolder}
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
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? <Spin /> : "Submit"}
          </button>
        </Form>
      </Formik>
      {success && (
        <SucessModal
          onClose={() => setSuccess(false)}
          show={success}
          email={email}
        />
      )}
    </div>
  );
};

export default ContactForm;
