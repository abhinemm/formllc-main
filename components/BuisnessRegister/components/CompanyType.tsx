import React from "react";

import styles from "../StartBusiness.module.scss";

import { Collapse, Space } from "antd";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const CompanyType = () => {
  return (
    <Space direction="vertical">
      <Collapse
        collapsible="header"
        
        items={[
          {
            key: "1",
            label: <div className={styles.accordionHeader}>
                <h5>LLC</h5>
                <div><p>Minimal fees + unmatched privacy and flexibility.</p>
                <input type="checkbox"></input></div>
            </div>,
            children: <p>{text}</p>,
          },
        ]}
      />
      <Collapse
        collapsible="header"
      
        items={[
          {
            key: "1",
            label:<div className={styles.accordionHeader}>
            <h5>C-corporation </h5>
           <div> <p>Ideal for startups that plan to seek outside funding.</p>
            <input type="checkbox"></input></div>

        </div>,
            children: <p>{text}</p>,
          },
        ]}
      />
     
    </Space>
  );
};

export default CompanyType;
