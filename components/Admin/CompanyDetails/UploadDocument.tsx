import { Modal, Spin } from "antd";
import React, { useState } from "react";
import styles from "./CompanyDetails.module.scss";
import { Field, Formik } from "formik";
import { DEFAULT_EXTENTIONS, DEFAULTDOCUMENT } from "@/constants/constants";
import axios from "axios";
import {
  createUserAccountSchema,
  uploadDocumentSchems,
} from "@/helpers/validationSchema";

const UploadDocument = ({
  open,
  onClose,
  stepId,
  openNotification,
  companyId,
  onCompleted,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const initialValues = {
    type: "",
    description: "",
    file: "",
    docType: "",
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFieldValue("file", selectedFile?.name);
      const maxSizeInBytes = 1 * 1024 * 1024; // 10 MB
      if (selectedFile.size > maxSizeInBytes) {
        openNotification({
          type: "warning",
          message: "File size exceeds 10 MB. Please select a smaller file.",
          placement: "topRight",
        });
        setFile(null);
        event.target.files = null;
        setFieldValue("file", "");
      } else {
        setFile(selectedFile);
      }
    } else {
      setFieldValue("file", "");
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      openNotification({
        type: "error",
        message: "No file selected.",
        placement: "topRight",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `https://utility.getllc.io/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      openNotification({
        type: "error",
        message: "Error uploading file. Please try again.",
        placement: "topRight",
      });
    }
  };

  const onSubmit = async (values: any, { resetForm }) => {
    const file = await handleFileUpload();
    const obj = {
      title: values?.type,
      decription: values?.description,
    };
    const docObj = {
      type: values?.docType,
      url: file.url,
    };
    const data = {
      documentUrl: JSON.stringify(docObj),
      value: JSON.stringify(obj),
      stepId: stepId,
      companyId: companyId,
    };
    setLoading(true);
    try {
      await axios
        .post(`/api/companyDocuments`, data)
        .then((res: any) => {
          setLoading(false);
          onCompleted(stepId);
          openNotification({
            type: "success",
            message: "Doument Upload Successfull",
            placement: "topRight",
          });
          resetForm();
        })
        .catch((err: any) => {
          setLoading(false);
          const message = err?.response?.data?.error || "Something went wrong!";
          openNotification({
            type: "error",
            message: message,
            placement: "topRight",
          });
        });
    } catch (error: any) {
      setLoading(false);
      const message = error?.response?.data?.error || "Something went wrong!";
      openNotification({
        type: "error",
        message: message,
        placement: "topRight",
      });
      console.log("the error is ", error);
    }
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      maskClosable={false}
    >
      <div className={styles.formWrapper}>
        <h3>Upload Document</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={uploadDocumentSchems}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <form className={styles.fbform} onSubmit={handleSubmit}>
              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Heading</label>
                  <select
                    id="mySelect"
                    name="type"
                    onChange={handleChange}
                    value={values.type}
                  >
                    <option value={""}>Select</option>
                    {DEFAULTDOCUMENT?.map((el: any, idx: number) => (
                      <option value={el} key={idx}>
                        {el}
                      </option>
                    ))}
                  </select>
                  {errors.type && touched.type && (
                    <p className={styles.errorWarning}>{errors.type}</p>
                  )}
                </div>
              </div>
              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Short Description</label>
                  <input
                    className={styles.fbinput}
                    id="first-name"
                    type="text"
                    placeholder="Short Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                  {errors.description && touched.description && (
                    <p className={styles.errorWarning}>{errors.description}</p>
                  )}
                </div>
              </div>

              <div className={styles.doubleFlex}>
                {" "}
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Document</label>
                  <input
                    className={styles.fbinput}
                    id="email"
                    type="file"
                    name="file"
                    onChange={(e: any) => handleFileChange(e, setFieldValue)}
                  />
                  {errors.file && touched.file && (
                    <p className={styles.errorWarning}>{errors.file}</p>
                  )}
                </div>
              </div>

              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Document Type</label>
                  <select
                    id="mySelect"
                    name="docType"
                    onChange={handleChange}
                    value={values.docType}
                  >
                    <option value={""}>Select</option>
                    {DEFAULT_EXTENTIONS?.map((el: any, idx: number) => (
                      <option value={el.value} key={idx}>
                        {el.label}
                      </option>
                    ))}
                  </select>
                  {errors.docType && touched.docType && (
                    <p className={styles.errorWarning}>{errors.docType}</p>
                  )}
                </div>
              </div>

              <div className={styles.btnWrapper}>
                <button disabled={loading}>
                  <span>{loading ? <Spin /> : "Continue"} </span>
                  <span></span>
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default UploadDocument;
