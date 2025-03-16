import React from "react";

import styles from "../StartBusiness.module.scss";

import { Collapse, Space } from "antd";

interface ICompanyType {
  companyType: any;
  setCompanyType: any;
  setActiveTabNumber: any;
}

const text = `
Low-cost, flexible, and ideal for small businesses or e-commerce. Provides personal asset protection and privacy. Simple to manage with minimal paperwork, making it perfect for entrepreneurs starting out.
`;

const CompanyType: React.FC<ICompanyType> = ({
  companyType,
  setCompanyType,
  setActiveTabNumber,
}) => {
  const handleChecked = (event: any, type) => {
    if (event.target.checked) {
      setCompanyType(type);
    }
  };
  return (
    <Space direction="vertical">
      <Collapse
        collapsible="header"
        items={[
          {
            key: "1",
            label: (
              <div className={styles.accordionHeader}>
                <h5>LLC</h5>
                <div>
                  <p>Minimal fees + unmatched privacy and flexibility.</p>
                  <input
                    type="checkbox"
                    checked={companyType === "LLC"}
                    onChange={(event) => handleChecked(event, "LLC")}
                  ></input>
                </div>
              </div>
            ),
            children: <p>{text}</p>,
          },
        ]}
      />
      <div className={styles.buttonContainer}>
        <div className={styles.btnWrapper}>
          <button type="button" onClick={() => setActiveTabNumber(2)}>
            <span> Continue </span>
            <span></span>
          </button>
        </div>
      </div>
    </Space>
  );
};

export default CompanyType;
