"use client";

import React from "react";
import { Table, Space } from "antd";

import styles from '../company.module.scss'

const data = [
  {
    key: "1",
    document: "Project Plan",
  },
  {
    key: "2",
    document: "Budget Report",
  },
  {
    key: "3",
    document: "Meeting Notes",
  },
  {
    key: "4",
    document: "Design Document",
  },
  {
    key: "5",
    document: "User Guide",
  },
  {
    key: "6",
    document: "Test Report",
  },
];

const page = () => {
  return (

    <section className={styles.tableWrapper}>

<Table
      dataSource={data}
      columns={[
        {
          title: "Document Name",
          dataIndex: "document",
          key: "document",
          render: (text) => <a>{text}</a>,
          width: "100%",
        },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <Space size="middle">
              <button className={styles.editBtn}>Edit</button>
              <button className={styles.previewBtn}>Preview</button>
              <button className={styles.deleteBtn}>Delete</button>
            </Space>
          ),
          width: "max-content",
        },
      ]}
      pagination={{
        pageSize: 3,
       
        
        
      }}
      style={{ width: "100%" }}
    />


    </section>
   
  );
};

export default page;
