"use client";

import React, { useState } from "react";
import { Table, Space } from "antd";

import styles from "../company.module.scss";
import Delete from "../../../../../components/Modals/user-modals/Delete";
import AddDocument from "../../../../../components/Modals/user-modals/AddDocument";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleAddCancel = () => {
    setAddIsModalOpen(false);
  };

  return (
    <section className={`${styles.tableWrapper} `}>
      <div className={styles.addwrapper}>
        <button onClick={()=>setAddIsModalOpen(true)}>
          Add Document
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M10 14H12M12 14H14M12 14V16M12 14V12"
                stroke="#94949e  "
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z"
                stroke="#94949e"
                stroke-width="1.5"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </div>

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
                <button className={styles.editBtn} onClick={()=>setAddIsModalOpen(true)}>Edit</button>
                <button className={styles.previewBtn}>Download</button>
                <button className={styles.deleteBtn} onClick={()=>setIsModalOpen(true)}>Delete</button>
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

      <Delete isModalOpen={isModalOpen} handleCancel={handleCancel} />
      <AddDocument isAddModalOpen={isAddModalOpen} handleAddCancel={handleAddCancel} />
    </section>
  );
};

export default page;
