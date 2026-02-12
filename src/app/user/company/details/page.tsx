"use client";
import React, { useEffect, useState } from "react";

import styles from "../company.module.scss";
import { useAppContext } from "../../../../../components/Context/AppContext";
import Image from "next/image";
import DocumentPreview from "../../../../../components/Modals/DocumentPreview";
import axios from "axios";
import { useRouter } from "next/navigation";
import SubscriptionRenew from "../../../../../components/Modals/SubscriptionRenew";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { nextImageFormats } from "@/constants/constants";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const page = () => {
  const router = useRouter();
  const { contextOptions } = useAppContext();
  const [showDocumentViewer, setShowDocumentViewer] = useState<boolean>(false);
  const [docUrl, setDocUrl] = useState<string>("");
  const [subStatus, setSubStatus] = useState<boolean>(false);
  const [documents, setDocuments] = useState<any>([]);
  useEffect(() => {
    if (contextOptions?.selectedCompanyDetails?.document) {
      const splited =
        contextOptions?.selectedCompanyDetails?.document?.split(",");
      if (splited?.length) {
        setDocuments(splited);
      }
    }
  }, [contextOptions?.selectedCompanyDetails?.document]);

  const handleSubscription = async () => {
    setSubStatus(true);
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

  const getFileExtensionFromUrl = (url: string) => {
    return url.split(".").pop()?.split("?")[0] || "jpg";
  };

  return (
    <section className={styles.deatialsMainWrapper}>
      {contextHolder}
      <h3>Details</h3>
      <label htmlFor="">Personal and company details</label>
      <div className={styles.detailsListWrapper}>
        <div className={styles.deatilsItem}>
          <h6>Company Name</h6>
          <div>
            <label htmlFor="">
              <span>{`${contextOptions?.selectedCompanyDetails?.companyName} ${contextOptions?.selectedCompanyDetails?.type}`}</span>
            </label>
          </div>
        </div>
        {/* <div className={styles.deatilsItem}>
          <h6>Company Logo</h6>
          <div>
            <div className={styles.logoUploadWrapper}>
              <div className={styles.imgWrapper}>
                <Image
                  src="/icons/uploadIcon.svg"
                  width={20}
                  height={20}
                  alt="Upload Icon"
                />
              </div>
              <button>
                <span>Upload Logo</span>
                <Image
                  src="/icons/uploadIcon.svg"
                  width={16}
                  height={16}
                  alt="Upload Icon"
                />
              </button>
            </div>
          </div>
        </div> */}
        <div className={styles.deatilsItem}>
          <h6>Company Email</h6>
          <div>
            <label htmlFor="">
              <span>
                {contextOptions?.selectedCompanyDetails?.companyEmail}
              </span>
            </label>
          </div>
        </div>
        <div className={styles.deatilsItem}>
          <h6>State</h6>
          <div>
            <label htmlFor="">
              <span>
                {contextOptions?.selectedCompanyDetails?.registrationState}
              </span>
            </label>
          </div>
        </div>
        <div className={styles.deatilsItem}>
          <h6>Company Type</h6>
          <div>
            <label htmlFor="">
              <span>{contextOptions?.selectedCompanyDetails?.type}</span>
            </label>
          </div>
        </div>
        <div className={styles.deatilsItem}>
          <h6>Company Type</h6>
          <div>
            <label htmlFor="">
              <span>{contextOptions?.selectedCompanyDetails?.type}</span>
            </label>
          </div>
        </div>
        <div className={styles.deatilsItem}>
          <h6>Responsible Party</h6>
          <div>
            <label htmlFor="">
              Name
              <span>
                {`${contextOptions?.selectedCompanyDetails?.ownerFname} ${contextOptions?.selectedCompanyDetails?.ownerLname}`}
              </span>
            </label>
            <label htmlFor="">
              Address
              <span>
                {`${contextOptions?.selectedCompanyDetails?.streetAddress}, ${contextOptions?.selectedCompanyDetails?.city}, ${contextOptions?.selectedCompanyDetails?.state}, ${contextOptions?.selectedCompanyDetails?.country}`}
                {/* adderss line 1 , addressline 2 <article>(100%)</article>{" "} */}
              </span>
            </label>
            <label htmlFor="">
              Phone
              <span>{`${
                contextOptions?.selectedCompanyDetails?.countryCode ?? " "
              } ${contextOptions?.selectedCompanyDetails?.phone ?? ""}`}</span>
            </label>
            <label htmlFor="">
              Email
              <span>
                {contextOptions?.selectedCompanyDetails?.companyEmail}
              </span>
            </label>
          </div>
        </div>
        <div className={styles.deatilsItem}>
          <h6>Owner</h6>
          <div>
            <label htmlFor="">
              Name
              <span>
                {`${contextOptions?.selectedCompanyDetails?.ownerFname} ${contextOptions?.selectedCompanyDetails?.ownerLname}`}
              </span>
            </label>
            <label htmlFor="">
              Address
              <span>
                {`${contextOptions?.selectedCompanyDetails?.streetAddress}, ${contextOptions?.selectedCompanyDetails?.city}, ${contextOptions?.selectedCompanyDetails?.state}, ${contextOptions?.selectedCompanyDetails?.country}`}
                {/* adderss line 1 , addressline 2 <article>(100%)</article>{" "} */}
              </span>
            </label>
            <label htmlFor="">
              Phone
              <span>{`${
                contextOptions?.selectedCompanyDetails?.countryCode ?? " "
              } ${contextOptions?.selectedCompanyDetails?.phone ?? ""}`}</span>
            </label>
            <label htmlFor="">
              Email
              <span>
                {contextOptions?.selectedCompanyDetails?.companyEmail}
              </span>
            </label>
          </div>
        </div>
        <div className={styles.deatilsItem}>
          <h6>Proof of address</h6>
          <div>
            <label htmlFor="">
              {/* <iframe
                src={contextOptions?.selectedCompanyDetails?.document}
              ></iframe> */}
              {documents?.map((el: any, idx: number) => (
                <>
                  {nextImageFormats.includes(getFileExtensionFromUrl(el)) ? (
                    <Image
                      key={idx}
                      src={el}
                      alt="proof of address"
                      width={100}
                      height={100}
                      className={styles.document}
                      onClick={() => {
                        setDocUrl(el);
                        setShowDocumentViewer(true);
                      }}
                    />
                  ) : (
                    <>
                      {getFileExtensionFromUrl(el) === "pdf" ? (
                        <Image
                          key={idx}
                          src="/images/PdfIcon.png"
                          alt="proof of address"
                          width={100}
                          height={100}
                          className={styles.document}
                          onClick={() => {
                            setDocUrl(el);
                            setShowDocumentViewer(true);
                          }}
                        />
                      ) : getFileExtensionFromUrl(el) === "doc" ? (
                        <Image
                          key={idx}
                          src="/images/documentIcon.png"
                          alt="proof of address"
                          width={100}
                          height={100}
                          className={styles.document}
                          onClick={() => {
                            setDocUrl(el);
                            setShowDocumentViewer(true);
                          }}
                        />
                      ) : (
                        <Image
                          key={idx}
                          src="/images/imageIcon.png"
                          alt="proof of address"
                          width={100}
                          height={100}
                          className={styles.document}
                          onClick={() => {
                            setDocUrl(el);
                            setShowDocumentViewer(true);
                          }}
                        />
                      )}
                    </>
                  )}
                </>
              ))}
            </label>
          </div>
        </div>
        <div className={styles.deatilsItem}>
          <h6>Mailing Address</h6>
          <div>
            {contextOptions?.selectedCompanyDetails
              ?.subsriptionPaymentStatus ? (
              <>
                {contextOptions?.selectedCompanyDetails?.mailingAdress ? (
                  <label htmlFor="mail-address">
                    <span id="mail-address">
                      {contextOptions?.selectedCompanyDetails?.mailingAdress}
                    </span>
                  </label>
                ) : (
                  <label htmlFor="mail-address">
                    <span id="mail-address">
                      Your mailroom subscription is active! We’ll update your
                      mailing address within 5–7 business days.
                    </span>
                  </label>
                )}
              </>
            ) : (
              <button type="button" onClick={handleSubscription}>
                View
              </button>
            )}
          </div>
        </div>
      </div>
      <DocumentPreview
        onClose={() => setShowDocumentViewer(false)}
        open={showDocumentViewer}
        url={docUrl}
      />
      <SubscriptionRenew
        onClose={() => setSubStatus(false)}
        open={subStatus}
        companyId={contextOptions?.selectedCompanyDetails?.id}
        openNotification={openNotification}
      />
    </section>
  );
};

export default page;
