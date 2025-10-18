import { Modal, Spin } from "antd";
import React, { useState } from "react";
import styles from "./Companies.module.scss";
import { Formik } from "formik";

import TextArea from "antd/es/input/TextArea";
import {
  EMAIL_Template,
  MexicoSub,
  WyomingLinkSub,
} from "@/constants/constants";
import { subscriptionRenewal } from "@/lib/emailTemplates";
import TemplateViewer from "./TemplateViewer";
import { emailSendSchema, otpSchema } from "@/helpers/validationSchema";
import axios from "axios";

const EmailSendModal = ({
  open,
  onClose,
  companyDetails,
  openNotification,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [previewHtml, setPreviewHtml] = useState<any>(null);
  const initialValues = {
    subject: "",
    content: "",
    template: "",
  };

  const onSubmit = async (values: any) => {
    setLoading(true);
    const body = {
      to: companyDetails?.email,
      subject: values?.subject,
      content: values.content,
      emailType: values.template,
      companyId: companyDetails?.id,
    };
    await axios
      .post(`/api/send`, body)
      .then((res: any) => {
        setLoading(false);
        if (res.data?.ok) {
          openNotification({
            type: "success",
            message: "Email send scuccess",
            placement: "topRight",
          });
          onClose();
        } else {
          openNotification({
            type: "error",
            message: "Something Went wron! pleas try again later",
            placement: "topRight",
          });
          onClose();
        }
      })
      .catch((err: any) => {
        setLoading(false);
        openNotification({
          type: "error",
          message: err.response?.data?.error ?? "Something went wrong",
          placement: "topRight",
        });
      });
  };

  const handlePreview = (
    subject: string,
    content: string,
    template: string
  ) => {
    switch (template) {
      case "subscription.renewal":
        const name = companyDetails.ownerFname
          ? `${companyDetails.ownerFname}`
          : companyDetails.firstName
          ? companyDetails.firstName
          : "User";
        const amount = "25$";
        const plan_name = `${companyDetails.registrationState} Mail room Fee`;
        const status = "Inactive";
        const paymentLink =
          companyDetails.plan == "PRO" ? WyomingLinkSub : MexicoSub;
        const html = subscriptionRenewal({
          name,
          amount,
          content,
          plan_name,
          status,
          payment_link: paymentLink,
        });
        setPreviewHtml(html);
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      className="currencyModal"
      maskClosable={false}
    >
      <div className={styles.formSendEmail}>
        <h3>New message</h3>
        <div className={styles.iconRow}>
          <p>
            To <span>{companyDetails?.email}</span>
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={emailSendSchema}
          enableReinitialize={true}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            setFieldValue,
            isSubmitting,
          }) => (
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className={styles.fbform}
            >
              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Subject</label>
                  <input
                    className={styles.fbinput}
                    id="first-name"
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && touched.subject && (
                    <p className={styles.errorWarning}>{errors.subject}</p>
                  )}
                </div>
              </div>
              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Content</label>
                  <TextArea
                    showCount
                    maxLength={1500}
                    onChange={handleChange}
                    name="content"
                    placeholder="Content"
                    style={{ height: 250, resize: "none" }}
                  />
                  {errors.subject && touched.subject && (
                    <p className={styles.errorWarning}>{errors.subject}</p>
                  )}
                </div>
              </div>

              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Template</label>
                  <select
                    id="mySelect"
                    name="template"
                    onChange={handleChange}
                    value={values.template}
                  >
                    <option value={""}>Select</option>
                    {EMAIL_Template?.map((el: any, idx: number) => (
                      <option value={el.value} key={idx}>
                        {el.label}
                      </option>
                    ))}
                  </select>
                  {errors.template && touched.template && (
                    <p className={styles.errorWarning}>{errors.template}</p>
                  )}
                </div>
              </div>
              <div className={styles.buttonWrapper}>
                <button
                  type="button"
                  className={styles.buttonPreview}
                  onClick={() => {
                    handlePreview(
                      values.subject,
                      values.content,
                      values.template
                    );
                  }}
                >
                  Preview
                </button>
                <button
                  type="submit"
                  className={styles.button}
                  disabled={loading}
                >
                  {loading ? <Spin /> : "Send Email"}
                </button>
              </div>
            </form>
          )}
        </Formik>
        {previewHtml && (
          <TemplateViewer
            onClose={() => setPreviewHtml(null)}
            html={previewHtml}
            open={previewHtml ? true : false}
          />
        )}
      </div>
    </Modal>
  );
};

export default EmailSendModal;
