"use client";
import React, { useState } from "react";

import styles from "../company.module.scss";
import { useAppContext } from "../../../../../components/Context/AppContext";
import Image from "next/image";
import DocumentPreview from "../../../../../components/Modals/DocumentPreview";

const page = () => {
  const { contextOptions } = useAppContext();
  const [showDocumentViewer, setShowDocumentViewer] = useState<boolean>(false);
  const [docUrl, setDocUrl] = useState<string>("");
  return (
    <section className={styles.deatialsMainWrapper}>
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
        {/* <div className={styles.deatilsItem}>
          <h6>Industry</h6>
          <div>
            <label htmlFor="">
              <span>Ecommerce</span>
            </label>
          </div>
        </div> */}
        {/* <div className={styles.deatilsItem}>
          <h6>Website</h6>

          <div className={styles.inputActionWrapper}>
            {" "}
            <input type="text" placeholder="website.com" />
            <button>
              <span>Change</span>
              <Image
                src="/icons/editIcon.svg"
                width={14}
                height={14}
                alt="Upload Icon"
              />
            </button>{" "}
          </div>
        </div> */}
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
              {contextOptions?.selectedCompanyDetails?.document && (
                <Image
                  src={contextOptions?.selectedCompanyDetails?.document}
                  alt="proof of address"
                  width={100}
                  height={100}
                  className={styles.document}
                  onClick={() => {
                    setDocUrl(contextOptions?.selectedCompanyDetails?.document);
                    setShowDocumentViewer(true);
                  }}
                />
              )}
            </label>
          </div>
        </div>
        <div className={styles.deatilsItem}>
          <h6>Mailing Address</h6>
          <div>
            <label htmlFor="">
              Address
              <span>
                adderss line 1 , addressline 2 <article>(100%)</article>{" "}
              </span>
            </label>
          </div>
        </div>
      </div>
      <DocumentPreview
        onClose={() => setShowDocumentViewer(false)}
        open={showDocumentViewer}
        url={docUrl}
      />
    </section>
  );
};

export default page;
