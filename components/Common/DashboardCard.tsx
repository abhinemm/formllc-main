import React from "react";
import styles from "./common.module.scss";
import { ArrowUp, ArrowDown } from "lucide-react";

interface ICard {
  title: any;
  value: any;
  isPositive: boolean;
  change: string;
}

const DashboardCard: React.FC<ICard> = ({ title, value, isPositive, change }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>{title}</div>
      <div className={styles.content}>
        <h2>{value}</h2>
        {/* <div
          className={`${styles.change} ${
            isPositive ? styles.positive : styles.negative
          }`}
        >
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span>{change}</span>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardCard;
