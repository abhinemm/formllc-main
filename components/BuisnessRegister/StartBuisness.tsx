"use client";

import React, { useLayoutEffect, useState } from "react";
import styles from "./StartBusiness.module.scss";
import CompanyType from "./components/CompanyType";
import RegistrationState from "./components/RegistrationState";
import ReviewandPay from "./components/ReviewandPay";
import CreateAccount from "../CreateAccount/CreateAccount";
import { useSession } from "next-auth/react";
import CurrencyModals from "../Modals/CurrencyModals";
import SignIn from "../CreateAccount/SignIn";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { NotificationPlacement } from "antd/es/notification/interface";
import { notification } from "antd";
import { RegistrationStation } from "@/constants/constants";
import axios from "axios";
import Image from "next/image";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const StartBusinessTabs: React.FC = () => {
  const planList = ["basic", "pro"];
  const router = useRouter();
  const searchParams = useSearchParams();
  const planUrl = searchParams.get("plan");
  const [activeTabNumber, setActiveTabNumber] = useState<number>(1);
  const [companyType, setCompanyType] = useState<any>("LLC");
  const [companyLocation, setCompanyLocation] = useState<any>("Wyoming");
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(
    "USD"
  );
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [currencyPopup, setCurrencyPopup] = useState<any>(false);
  // signIn => for sihn in the page and signUp for sign up
  const [viewPage, setViewPage] = useState<string>("signIn");
  const [plan, setPlan] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

  useLayoutEffect(() => {
    if (planUrl && planUrl === "pro") {
      setPlan(planUrl);
      setCompanyLocation(RegistrationStation?.wyoming_state);
    } else if (planUrl && planUrl === "basic") {
      setPlan(planUrl);
      setCompanyLocation(RegistrationStation?.mexico_state);
    } else {
      setCompanyLocation(RegistrationStation?.wyoming_state);
      setPlan("pro");
    }
  }, [planUrl]);

  const session = useSession();

  const handleContinue = () => {
    if (!session?.data?.user) {
      setIsAuth(true);
      setActiveTabNumber(4);
    } else {
      handleProceed();
      // setCurrencyPopup(true);
    }
  };

  const plans = {
    basic: "BASIC",
    pro: "PRO",
  };

  const handleProceed = async () => {
    if (selectedCurrency) {
      setLoading(true);
      const requestValue = {
        currency: selectedCurrency,
        registrationState: companyLocation,
        companyType: companyType,
        status: 0,
      };
      try {
        await axios
          .post(`/api/company`, requestValue)
          .then((res: any) => {
            // onClose();
            // if (res?.data?.id) {
            //   router.push(`/company-registration?id=${res?.data?.id}`);
            // }
            handlePayment(res?.data?.id, plan);
          })
          .catch((err: any) => {
            setLoading(false);
            openNotification({
              type: "error",
              message: err?.response?.data?.message ?? "Something went wrong",
              placement: "topRight",
            });
            console.log("the error is ", err);
          });
      } catch (error: any) {
        console.log("the error", error);
        openNotification({
          type: "error",
          message: error?.response?.data?.message ?? "Something went wrong",
          placement: "topRight",
        });
        setLoading(false);
      }
    }
  };

  const handlePayment = async (companyId: number, plan: string) => {
    const body = {
      plan: plans[plan],
      companyId: companyId,
      register: true,
    };
    try {
      await axios
        .post(`/api/generatePaymentLink`, body)
        .then((res: any) => {
          console.log("the response is", res);
          if (res?.data?.url) {
            router.push(res?.data?.url);
          }
        })
        .catch((err) => {
          setLoading(false);
          openNotification({
            type: "error",
            message: err?.response?.data?.message ?? "Something went wrong",
            placement: "topRight",
          });
          console.log("the error in payment", err);
        });
    } catch (error: any) {
      openNotification({
        type: "error",
        message: error?.response?.data?.message ?? "Something went wrong",
        placement: "topRight",
      });
      setLoading(false);
    }
  };

  const haddleNewAccount = (res: any) => {
    setIsAuth(false);
    setActiveTabNumber(3);
    handleProceed();
    // setCurrencyPopup(true);
  };

  const handleNewAccountTest = (res: any) => {
    setViewPage("signIn");
  };

  const handleSignIn = (event: string) => {
    setViewPage(event);
  };

  const handleBack = () => {
    if (activeTabNumber > 1) {
      setActiveTabNumber((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (activeTabNumber < 3) {
      setActiveTabNumber((prev) => prev + 1);
    }
  };

  return (
    <>
      {loading ? (
        <div className={styles.paymentLoading}>
          <Image
            src="/payment processing.svg"
            width={400}
            height={200}
            alt="paymet loading"
          />
          <p>
            {" "}
            Almost there! Redirecting to payment, please don’t refresh this
            page.
          </p>
        </div>
      ) : (
        <div className={styles.startBusinessMainWrapper}>
          {contextHolder}
          <div className={styles.contentWrapperMain}>
            <div className={styles.leftContetTabs}>
              <div className={styles.leftHeaderWrapper}>
                <h2> Start your US company in minutes. </h2>
                <p>
                  {" "}
                  Answer a few questions to help us form your new company.{" "}
                </p>
              </div>
              <div className={styles.tabListWrapper}>
                <div
                  className={styles.tabListItem}
                  onClick={() => setActiveTabNumber(1)}
                >
                  <div
                    className={`${styles.numberWrapper} ${
                      activeTabNumber > 0 ? styles.selectedTab : ""
                    }`}
                  >
                    <div className={styles.Number}>
                      <span>1</span>
                    </div>
                  </div>
                  <div className={styles.itemContentWrapper}>
                    <h5>Company Type</h5>
                    <p>
                      Choose your business entity. Unsure? We&apos;ll help you
                      choose.
                    </p>
                  </div>
                </div>
                <div
                  className={styles.tabListItem}
                  onClick={() => setActiveTabNumber(2)}
                >
                  <div
                    className={`${styles.numberWrapper} ${
                      activeTabNumber > 1 ? styles.selectedTab : ""
                    }`}
                  >
                    <div className={styles.Number}>
                      <span>2</span>
                    </div>
                  </div>
                  <div className={styles.itemContentWrapper}>
                    <h5>Registration State</h5>
                  </div>
                </div>
                {/* <div
                className={styles.tabListItem}
                onClick={() => setActiveTabNumber(3)}
              >
                <div
                  className={`${styles.numberWrapper} ${
                    activeTabNumber > 2 ? styles.selectedTab : ""
                  }`}
                >
                  <div className={styles.Number}>
                    <span>3</span>
                  </div>
                </div>
                <div className={styles.itemContentWrapper}>
                  <h5>Choose Plan</h5>
                </div>
              </div> */}
                <div
                  className={styles.tabListItem}
                  onClick={() => setActiveTabNumber(3)}
                >
                  <div
                    className={`${styles.numberWrapper} ${
                      activeTabNumber > 2 ? styles.selectedTab : ""
                    }`}
                  >
                    <div className={styles.Number}>
                      <span>3</span>
                    </div>
                  </div>
                  <div className={styles.itemContentWrapper}>
                    <h5>Review and pay</h5>
                  </div>
                </div>
                {isAuth && (
                  <div
                    className={styles.tabListItem}
                    onClick={() => setActiveTabNumber(4)}
                  >
                    <div
                      className={`${styles.numberWrapper} ${
                        activeTabNumber > 2 ? styles.selectedTab : ""
                      }`}
                    >
                      <div className={styles.Number}>
                        <span>4</span>
                      </div>
                    </div>
                    <div className={styles.itemContentWrapper}>
                      <h5>Sign documents</h5>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.rightContet}>
              <div className={styles.tableDropdownWrapper}>
                {activeTabNumber == 1 && (
                  <div className={styles.rightHeaderWrapper}>
                    <h1> Company Structure </h1>
                    <p>
                      {" "}
                      Choose the entity type that&apos;s right for your
                      business.{" "}
                    </p>
                  </div>
                )}
                {activeTabNumber == 2 && (
                  <div className={styles.rightHeaderWrapper}>
                    <h1> Choose your registration state </h1>
                  </div>
                )}
                {activeTabNumber == 3 && (
                  <div className={styles.rightHeaderWrapper}>
                    <h1>Review and Pay </h1>
                    <p>
                      {" "}
                      You’re almost done. 🎉 <br />
                      Please review your information and proceed to payment.
                    </p>
                  </div>
                )}
                {isAuth && (
                  <>
                    {activeTabNumber == 4 && (
                      <div className={styles.rightHeaderWrapper}>
                        <h1>
                          {viewPage === "signUp"
                            ? "Create an account"
                            : "Sign in with account"}{" "}
                        </h1>
                        {viewPage === "signUp" ? (
                          <p>
                            {" "}
                            Already have an account?{" "}
                            <a onClick={() => setViewPage("signIn")}>sign in</a>
                          </p>
                        ) : (
                          <p>
                            {" "}
                            Don't have an account?{" "}
                            <a onClick={() => setViewPage("signUp")}>sign up</a>
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}

                {activeTabNumber == 1 && (
                  <div className={styles.accordionStyles}>
                    <CompanyType
                      companyType={companyType}
                      setCompanyType={setCompanyType}
                      setActiveTabNumber={setActiveTabNumber}
                    />
                  </div>
                )}
                {activeTabNumber == 2 && (
                  <div className={styles.accordionStyles}>
                    <RegistrationState
                      setCompanyLocation={setCompanyLocation}
                      companyLocation={companyLocation}
                      setPlan={setPlan}
                      setActiveTabNumber={setActiveTabNumber}
                    />
                  </div>
                )}
                {/* {activeTabNumber == 3 && (
                <div className={styles.accordionStyles}>
                  <PlansSelection
                    plan={plan}
                    setPlan={setPlan}
                    setCompanyLocation={setCompanyLocation}
                  />
                </div>
              )} */}
                {activeTabNumber == 3 && (
                  <div className={styles.accordionStyles}>
                    <ReviewandPay
                      companyType={companyType}
                      companyLocation={companyLocation}
                      setActiveTabNumber={setActiveTabNumber}
                      onContinue={handleContinue}
                      plan={plan}
                    />
                  </div>
                )}
                {isAuth && (
                  <>
                    {activeTabNumber == 4 && (
                      <div className={styles.accordionStyles}>
                        {viewPage === "signUp" ? (
                          <CreateAccount
                            onCreateAccount={handleNewAccountTest}
                            openNotification={openNotification}
                          />
                        ) : (
                          <SignIn
                            onCreateAccount={haddleNewAccount}
                            handleSignIn={handleSignIn}
                            openNotification={openNotification}
                          />
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              {activeTabNumber < 3 && (
                <div className={styles.buttonFlexWrapper}>
                  <div className={styles.backButton}>
                    <button type="button" onClick={handleBack}>
                      <ArrowLeftOutlined />
                      Back
                    </button>
                  </div>
                  <div className={styles.nextButton} onClick={handleNext}>
                    <button type="button">
                      Next
                      <ArrowRightOutlined />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {currencyPopup && (
              <CurrencyModals
                onClose={() => setCurrencyPopup(false)}
                open={currencyPopup}
                title="test"
                companyType={companyType}
                companyLocation={companyLocation}
                plan={plan}
                openNotification={openNotification}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StartBusinessTabs;
