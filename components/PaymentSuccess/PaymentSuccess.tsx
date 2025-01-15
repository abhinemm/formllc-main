'use client'
import React from 'react'
import styles from "./PaymentSuccess.module.scss";
import { useRouter, useSearchParams } from 'next/navigation';


const PaymentSuccess = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter()
    const handleRedirection = () => {
        router.push(`/company-registration?id=${id}`);
    }
    return (
        <div className={styles.container}>
            <div className={styles.successAnimation}>
                <div className={styles.checkmark}></div>
            </div>
            <h1 className={styles.title}>Payment Successful!</h1>
            <p className={styles.message}>
                Thank you for your payment. Your transaction has been successfully processed.
            </p>
            <button className={styles.button} onClick={handleRedirection}>
                Continue
            </button>
        </div>
    )
}

export default PaymentSuccess