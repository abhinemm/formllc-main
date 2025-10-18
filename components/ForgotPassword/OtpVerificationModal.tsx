import { GetProps, Input, Modal, Select, Spin } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Forgotpassword.module.scss";
import { Formik } from "formik";
import axios from "axios";
import { otpSchema } from "@/helpers/validationSchema";
type OTPProps = GetProps<typeof Input.OTP>;

const OtpVerificationModal = ({
  open,
  onClose,
  email,
  onVerify,
  openNotification,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(120);
  const timerRef = useRef<number | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const initialValues = {
    otp: "",
  };

  const startTimer = (initial = 120) => {
    // clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setSecondsLeft(initial);
    // start ticking
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    timerRef.current = id;
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Start/reset timer whenever modal opens
  useEffect(() => {
    if (open) {
      startTimer(120);
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [open]);

  const handleResend = async () => {
    if (secondsLeft > 0) return;
    try {
      setLoading(true);
      await onResend();
      startTimer(120); // <— this is the key: restart ticking after resend
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const timeLabel = useMemo(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = String(secondsLeft % 60).padStart(2, "0");
    return `${m}:${s} remaining`;
  }, [secondsLeft]);

  const onSubmit = async (valuse: any) => {
    // setLoading(true);
    const body = {
      email: email,
      otp: Number(valuse.otp),
    };
    setLoading(true);
    await axios
      .post(`/api/otp/verify`, body)
      .then((res: any) => {
        if (res?.data?.isVerified) {
          localStorage.setItem("token", res?.data?.token);
          openNotification({
            type: "success",
            message: "OTP verified. You have 2 hours to reset your password.",
            placement: "topRight",
          });
          onVerify();
        }
        setLoading(false);
      })
      .catch((err: any) => {
        openNotification({
          type: "error",
          message: err.response?.data?.error ?? "Something went wrong",
          placement: "topRight",
        });
        setLoading(false);
      });
  };

  const onResend = async () => {
    const body = {
      email: email,
    };
    setResendLoading(true);
    await axios
      .post(`/api/otp`, body)
      .then((res: any) => {

        setLoading(false);
        openNotification({
          type: "success",
          message: "OTP resent successfully. Please check your inbox.",
          placement: "topRight",
        });
      })
      .catch((err: any) => {
        setLoading(false);
        openNotification({
          type: "error",
          message: err.response?.data?.error ?? "Something went wrong",
          placement: "topRight",
        });
        if (err.response.status == 429) {
          onClose();
        }
      });
  };
  const onlyNumbersFormatter = (str = "") => str.replace(/\D/g, "");

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      className="currencyModal"
      maskClosable={false}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <h3>OTP Verification</h3>

          <div className={styles.iconRow}>
            {/* You can replace this SVG with your custom illustration */}
            <p>
              We&apos;ve sent a one-time passcode (OTP) to your email
              <strong> {email}</strong> . Please check your inbox and enter the
              code to continue.
            </p>
          </div>
          <div className={styles.countdownRow}>
            <span className={styles.timerBadge} style={{ fontWeight: 600 }}>
              {timeLabel}
            </span>
            {secondsLeft === 0 && (
              <span className={styles.expiredText} style={{ color: "#fa541c" }}>
                Didn’t receive it? Resend code.
              </span>
            )}
          </div>
          {secondsLeft === 0 && (
            <div className={styles.resendOtp}>
              <button onClick={handleResend}>Resend OTP</button>
            </div>
          )}

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={otpSchema}
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
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className={styles.codeRow}>
                  <div>
                    <Input.OTP
                      formatter={onlyNumbersFormatter}
                      onChange={(e) => {
                        setFieldValue("otp", e);
                      }}
                    />
                    {errors.otp && touched.otp && (
                      <p className={styles.errorWarning}>{errors.otp}</p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className={styles.button}
                  disabled={loading}
                >
                  {loading ? <Spin /> : "Confirm Code"}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default OtpVerificationModal;
