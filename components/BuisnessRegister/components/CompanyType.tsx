import React from "react";

import styles from "../StartBusiness.module.scss";

import { Collapse, Space } from "antd";

interface ICompanyType {
  companyType: any;
  setCompanyType: any;
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const CompanyType: React.FC<ICompanyType> = ({
  companyType,
  setCompanyType,
}) => {
  const handleChecked = (event: any, type) => {
    console.log("event.target.checked", event.target.checked);
    if (event.target.checked) {
      setCompanyType(type);
    }
    console.log("the event is:", event);
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
      <Collapse
        collapsible="header"
        items={[
          {
            key: "1",
            label: (
              <div className={styles.accordionHeader}>
                <h5>C-corporation </h5>
                <div>
                  {" "}
                  <p>Ideal for startups that plan to seek outside funding.</p>
                  <input
                    type="checkbox"
                    checked={companyType === "C-corporation"}
                    onChange={(event) => handleChecked(event, "C-corporation")}
                  ></input>
                </div>
              </div>
            ),
            children: <p>{text}</p>,
          },
        ]}
      />
    </Space>
  );
};

export default CompanyType;
