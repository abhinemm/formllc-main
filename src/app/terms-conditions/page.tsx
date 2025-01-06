import React from 'react'

import styles from './terms.module.scss'

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';



const TabContent = () => {

    return (
        <div className={styles.policyWrapper}>
        <div className={styles.date}><p><strong>Last Modified:</strong> November 5, 2021</p></div>
        <p>
            Thank you for choosing Firstbase.io, Inc. We value your privacy and recognize your right to protect and secure your personal data.
        </p>
        <p>
            By using or accessing our services, you agree to the terms of this Privacy Policy. Updates will be posted at{' '}
            <a href="">https://www.firstbase.io/privacy-policy</a>.
        </p>

        <div>
            <h2>About This Policy</h2>
            <p>
                This policy aims to:
            </p>
            <ul>
                <li>Explain what personal data we collect and why.</li>
                <li>Describe how we use your data for better services.</li>
                <li>Clarify your rights regarding your personal data.</li>
            </ul>
        </div>
        <div>

            <h2>Children</h2>
            <p>
                Our services are not intended for children under 13. If we discover such data has been collected, we will promptly delete it.
            </p>

            <h2>Personal Information We Collect</h2>
            <ul>
                <li>Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Geolocation Data</li>
                <li>Social Security Number</li>
                <li>Bank Account & Credit/Debit Card Numbers</li>
            </ul>
        </div>

        <div>
            <h2>Information Provided Directly</h2>
            <p>
                We collect information when you:
            </p>
            <ul>
                <li>Register for an account.</li>
                <li>Subscribe to newsletters.</li>
                <li>Make purchases.</li>
                <li>Participate in surveys or events.</li>
            </ul>

            <h2>Automatic Data Collection</h2>
            <p>
                We use cookies and tracking technologies to collect data such as:
            </p>
            <ul>
                <li>Navigation patterns.</li>
                <li>Interactions with emails.</li>
                <li>Error logs.</li>
            </ul>
        </div>
        <div>

            <h2>Third-Party Cookies</h2>
            <p>
                Third parties may use cookies for advertising or analytics. We recommend reviewing their privacy policies directly.
            </p>

            <h2>Data Usage</h2>
            <p>
                We use your data to:
            </p>
            <ul>
                <li>Provide and improve our services.</li>
                <li>Send updates and notifications.</li>
                <li>Enforce our agreements.</li>
            </ul>
        </div>

        <div>
            <h2>Data Retention</h2>
            <p>
                We retain your data as long as necessary for legal, tax, or business purposes. Requests for deletion can be sent to{' '}
                <a href="">support@firstbase.io</a>.
            </p>

            <h2>Security</h2>
            <p>
                We use physical, electronic, and managerial safeguards to protect your data. However, no system is entirely secure.
            </p>

            <h2>Contact Us</h2>
            <p>
                For questions or concerns, contact us at{' '}
                <a href="">support@firstbase.io</a>.
            </p>

            <p>©2024 Firstbase.io. All Rights Reserved.</p>
        </div>
    </div>
    )
}



const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Firstbase Terms of Use',
        children: <TabContent />,
    },
    {
        key: '2',
        label: 'Mailroom Services Terms of Use',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: 'Agent Services Terms of Use',
        children: 'Content of Tab Pane 3',
    },
    {
        key: '4',
        label: 'Accounting Terms of Service',
        children: 'Content of Tab Pane 3',
    },
];



const page = () => {
    return (
        <section className='container' >
            
        <div className={styles.termsWrapper}>
                <h1>Terms of Use</h1>
    
    
                <Tabs defaultActiveKey="1" items={items} />
        </div>


        </section>
    )
}

export default page