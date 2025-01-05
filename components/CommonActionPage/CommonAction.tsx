import React from "react";
import styles from "./CommonAction.module.scss";
import { useRouter } from "next/navigation";
interface ICommonAction {
  title: string;
  btnText: string;
  redirectUrl: string;
  description: string;
}

const CommonAction: React.FC<ICommonAction> = ({
  title,
  btnText,
  redirectUrl,
  description,
}) => {
  const router = useRouter();

  const redirectToPayment = () => {
    if (redirectUrl === "payment") {
      console.log("redirectUrl");
    } else {
      router.push(redirectUrl); // Replace with your actual payment page route
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>{description}</p>
      <button className={styles.button} onClick={redirectToPayment}>
        {btnText}
      </button>
    </div>
  );
};

export default CommonAction;
