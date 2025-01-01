import React from "react";

import styles from "../company.module.scss";
import Image from "next/image";

const page = () => {
  return (
    <section className={styles.deatialsMainWrapper}>
      <h3>Details</h3>
      <label htmlFor="">Personal and company details</label>

      <div className={styles.detailsListWrapper}>
        {" "}
        <div className={styles.deatilsItem}>
          <h6>Company Name</h6>
          <div>
            <label htmlFor="">
              <span>Avoxer LLC</span>
            </label>
          </div>
        </div>
        <div className={styles.deatilsItem}>
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
        </div>
        <div className={styles.deatilsItem}>
          <h6>State</h6>
          <div>
            <label htmlFor="">
              <span>Wyoming</span>
            </label>
          </div>
        </div>
        <div className={styles.deatilsItem}>
          <h6>Industry</h6>
          <div>
            <label htmlFor="">
              <span>Ecommerce</span>
            </label>
          </div>
        </div>
        <div className={styles.deatilsItem}>
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
        </div>

        <div className={styles.deatilsItem}>
          <h6>Industry</h6>
          <div>
            <label htmlFor="">
                Name
              <span>client Name</span>
            </label>
            <label htmlFor="">
                Address
              <span>adderss line 1  , addressline 2 <article>(100%)</article> </span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
