"use client";

import { signIn } from "next-auth/react";
import styles from "./signIn.module.scss";
import { Formik } from "formik";
import { loginSchema } from "@/helpers/validationSchema";
import { useEffect, useState } from "react";
import { notification, Spin } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { ApiStatus, UserTypesEnum } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const SignIn = () => {
  const [loading, setLoading] = useState<any>(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      const user: any = session.user;
      if (
        user?.type === UserTypesEnum.admin ||
        user?.type === UserTypesEnum.admin
      ) {
        router.push("/admin");
        return;
      } else {
        router.push("/user");
        return;
      }
    }
  }, [session?.user, status]);

  useEffect(() => {
    const data: any = localStorage.getItem("credentials");
    if (data) {
      try {
        const values = JSON.parse(data);
        const obj = {
          email: values?.email ?? "",
          password: values?.password ?? "",
          rememberMe: false,
        };
        setInitialValues(obj);
      } catch (error) {
        return;
      }
    }
  }, []);

  const onSubmit = async (values: any) => {
    setLoading(true);
    await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    })
      .then((res: any) => {
        if (res?.error) {
          openNotification({
            type: "error",
            message: res?.error,
            placement: "topRight",
          });
          setLoading(false);
        } else {
          if (values.rememberMe) {
            const obj: any = {
              email: values?.email,
              password: values?.password,
            };
            localStorage.setItem("credentials", JSON.stringify(obj));
          }
          console.log("the resposndefnjfnnxcxc", res, status, session);

          if (res.status === ApiStatus.success && status === "authenticated") {
            console.log("sessionsessionsession", session);
            const data: any = session?.user;
            if (data.type === "admin") {
              router?.push("/admin");
            } else {
              router?.push("/user");
            }
          }
          setLoading(false);
        }
        console.log("the result", res);
      })
      .catch((err) => {
        console.log("the error", err);
      });
  };

  const onSignInWithGoogle = async () => {
    setLoading(true);
    signIn("google", {
      redirect: false,
      callbackUrl: "/user",
    })
      .then((res: any) => {
        console.log("the response is", res);
      })
      .catch((error) => {
        console.log("the error is ", error);
        setLoading(false);
      });
    setLoading(false);
  };
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;

  //   const result = await signIn("credentials", {
  //     redirect: false,
  //     email,
  //     password,
  //   });

  //   if (result?.error) {
  //     console.error("Error:", result.error);
  //   } else {
  //     console.log("Signed in successfully");
  //   }
  // };

  return (
    <div className={styles.mainSigninPageWrapper}>
      {contextHolder}
      <div>
        <div className={styles.signinWithGoogleWrapper}>
          {" "}
          <div className={styles.authHeaderItem}>
            <h2>Welcome to Formllc</h2>
            <p title="Don’t have an account?">
              Don’t have an account?
              <a
                href="/api/auth/sign-up"
                className={`${styles.authHeaderLink} ${styles.link}`}
              >
                Sign up
              </a>
            </p>
          </div>
          <button onClick={onSignInWithGoogle}>
            <div className={styles.bButtonContent}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
                className={`${styles.svgInline} ${styles.faGoogle} ${styles.faW16} ${styles.baseIcon}`}
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              {loading ? <Spin /> : "Sign In with Google"}
            </div>
          </button>
          <div className={styles.orBlockWrapper}>
            <span>or continue with</span>
          </div>
        </div>
        <div className={styles.formWrapper}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={loginSchema}
            enableReinitialize={true}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className={styles.formContent}>
                  {/* Email Input */}
                  <div className={`${styles.authFormItem}`}>
                    <label htmlFor="input60">
                      <span>Email</span>
                    </label>
                    <input
                      id="input60"
                      type="email"
                      name="email"
                      placeholder="john.doe@mail.com"
                      autoComplete="off"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                      <p className={styles.errorWarning}>{errors.email}</p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className={`${styles.authFormItem} `}>
                    <label
                      htmlFor="input65"
                      className={styles.baseTextFieldLabel}
                    >
                      <span>Password</span>
                    </label>
                    <input
                      id="input65"
                      type="password"
                      name="password"
                      placeholder="●●●●●●●●●"
                      autoComplete="off"
                      value={values.password}
                      onChange={handleChange}
                    />
                    {errors.password && touched.password && (
                      <p className={styles.errorWarning}>{errors.password}</p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div
                    className={`${styles.authFormItem} ${styles.rememberWrapper} `}
                  >
                    <label className={styles.baseCheckboxLabel}>
                      <input
                        type="checkbox"
                        id="checkbox69"
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={handleChange}
                      />

                      <span className={styles.baseCheckboxContent}>
                        Remember me
                      </span>
                    </label>
                    <a>
                      <p title="Forgot password">Forgot password</p>
                    </a>
                  </div>

                  <div className={styles.formActions}>
                    <button type="submit" disabled={loading}>
                      {loading ? <Spin /> : "Sign In"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
