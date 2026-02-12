import React from "react";

import styles from "../StartBusiness.module.scss";

import { Collapse, Space } from "antd";
import Link from "next/link";
import { RegistrationStation } from "@/constants/constants";

interface IPlansSelection {
  plan: any;
  setPlan: any;
  setCompanyLocation: any;
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const PlansSelection: React.FC<IPlansSelection> = ({
  plan,
  setPlan,
  setCompanyLocation,
}) => {
  const handleChecked = (event: any, type: string) => {
    if (event.target.checked) {
      if (type === "pro") {
        setCompanyLocation(RegistrationStation?.wyoming_state);
      }
      if (type === "basic") {
        setCompanyLocation(RegistrationStation?.mexico_state);
      }
      setPlan(type);
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
                <h5>Basic</h5>
                <div>
                  <p>The plan is used to for register buisness in New Mexico</p>
                  <input
                    type="checkbox"
                    checked={plan === "basic"}
                    onChange={(event) => handleChecked(event, "basic")}
                  ></input>
                </div>
                <Link href="#">View Details</Link>
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
                <h5>Pro</h5>
                <div>
                  {" "}
                  <p>The plan is used to for register buisness in Wyoming.</p>
                  <input
                    type="checkbox"
                    checked={plan === "pro"}
                    onChange={(event) => handleChecked(event, "pro")}
                  ></input>
                </div>
                <Link href="#">View Details</Link>
              </div>
            ),
            children: <p>{text}</p>,
          },
        ]}
      />
    </Space>
  );
};

export default PlansSelection;
