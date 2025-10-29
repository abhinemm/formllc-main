import styles from "./CompanyDetails.module.scss";
import { Modal, Spin } from "antd";
import React, { useLayoutEffect, useState } from "react";
import { Formik, getIn } from "formik";
import axios from "axios";
import { addMailAddressSchema } from "@/helpers/validationSchema";

const CompanyUpdateModal = ({
  open,
  onClose,
  openNotification,
  companyId,
  onCompleted,
  address,
}) => {
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>({
    city: "",
    country: "",
    state: "",
    street: "",
    zipcode: "",
  });
  useLayoutEffect(() => {
    if (address) {
      const splitted: any = address?.split(", ");
      const obj = {
        city: splitted.length >= 2 ? splitted[1] : "",
        country: splitted.length >= 4 ? splitted[3] : "",
        state: splitted.length >= 3 ? splitted[2] : "",
        street: splitted.length >= 1 ? splitted[0] : "",
        zipcode: splitted.length >= 5 ? splitted[4] : "",
      };
      setInitialValues(obj);
    }
  }, [address]);

  const onSubmit = async (values: any) => {
    const address = `${values.street ?? ""}, ${values.city ?? ""}, ${
      values.state ?? ""
    }, ${values.country ?? ""}, ${values.zipcode ?? ""}`;
    let obj: any = {
      mailingAdress: address,
    };
    setUpdateLoading(true);

    try {
      await axios
        .patch(`/api/company/create?id=${companyId}`, obj)
        .then((res: any) => {
          setUpdateLoading(false);
          openNotification({
            type: "success",
            message: "Mail Address Add Successfully",
            placement: "topRight",
          });
          onClose();
          onCompleted();
        })
        .catch((err: any) => {
          setUpdateLoading(false);
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
      setUpdateLoading(false);
    }
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      maskClosable={false}
      className="companyModal"
    >
      <div className={styles.formWrapper}>
        <h3>{address ? "Update Address" : "Add Mail Room Address"}</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={addMailAddressSchema}
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
                  <label className={styles.fblabel}>Street</label>
                  <input
                    className={styles.fbinput}
                    id="first-name"
                    type="text"
                    placeholder="245 Market ST"
                    name="street"
                    value={values.street}
                    onChange={handleChange}
                  />
                  <p className={styles.errorWarning}>
                    {touched.street && getIn(errors, "street")}
                  </p>
                </div>
              </div>
              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>City</label>
                  <input
                    className={styles.fbinput}
                    id="first-name"
                    type="text"
                    placeholder="San Francisco"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                  />
                  <p className={styles.errorWarning}>
                    {touched.city && getIn(errors, "city")}
                  </p>
                </div>
              </div>

              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>State</label>
                  <input
                    className={styles.fbinput}
                    id="first-name"
                    type="text"
                    placeholder="California"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                  />
                  <p className={styles.errorWarning}>
                    {touched.state && getIn(errors, "state")}
                  </p>
                </div>
              </div>
              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Country</label>
                  <input
                    className={styles.fbinput}
                    id="first-name"
                    type="text"
                    placeholder="United State"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                  />
                  <p className={styles.errorWarning}>
                    {touched.country && getIn(errors, "country")}
                  </p>
                </div>
              </div>
              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Zipcode</label>
                  <input
                    className={styles.fbinput}
                    id="first-name"
                    type="text"
                    placeholder="94105"
                    name="zipcode"
                    value={values.zipcode}
                    onChange={handleChange}
                  />
                  <p className={styles.errorWarning}>
                    {touched.zipcode && getIn(errors, "zipcode")}
                  </p>
                </div>
              </div>

              <div className={styles.btnWrapper}>
                <button disabled={updateLoading}>
                  <span>{updateLoading ? <Spin /> : "Continue"} </span>
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

export default CompanyUpdateModal;
