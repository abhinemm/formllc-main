"use client";
import React, { useState } from "react";
import AgGridTable from "../../AgGridTable";
import { ColDef } from "ag-grid-community";
import styles from "../Affiliates.module.scss";
import { Tooltip } from "antd";

const UserDetails = () => {
  const staticData: any = [
    {
      id: 1,
      slno: 1,
      fname: "christin",
      lname: "kf",
      email: "christin@gmail.com",
      // status: "",
      // action: "",
    },
  ];
  const [rowData, setRowData] = useState<any>(staticData);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: "Sl.No", field: "slno", sortable: true, filter: true },
    {
      headerName: "First Name",
      field: "fname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last Name",
      field: "lname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
    },

    // {
    //   headerName: "Status",
    //   field: "status",
    //   sortable: true,
    //   filter: true,
    //   cellRenderer: (params) => {
    //     const value = params.value ? params.value.toLowerCase() : "";
    //     const color = value === "active" ? "green" : "red";
    //     const label = value === "active" ? "Active" : "Inactive";
    //     return (
    //       <span style={{ color: color, fontWeight: "bold" }}>{label}</span>
    //     );
    //   },
    // },
  ]);

  const handleRowClick = (e: any) => {
    if (e.id) {
      console.log("e.id", e.id);
      //   const selectedCompany = allCompanies?.find((el: any) => el.id === e.id);
      //   setContextOptions((prev) => ({
      //     ...prev,
      //     selectedCompanyDetails: selectedCompany,
      //   }));
      //   router.push(`/admin/company-details/${e.id}`);
    }
  };
  return (
    <div className={styles.affiliatesDetails}>
      <div className={styles.headerWrapper}>
        <div className={styles.cardsWrapper}>
          <div className={styles.card}>
            <div className={styles.absoluteWrapper}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <Tooltip title="prompt text">
              <span>
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                  width={20}
                  height={20}
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </span>
            </Tooltip>
            <h3>Total Profit</h3>
            <p>
              <span>$</span>100
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.absoluteWrapper}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div></div>
            <Tooltip title="prompt text">
              <span>
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                  width={20}
                  height={20}
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </span>
            </Tooltip>
            <h3>Total Profit</h3>
            <p>
              <span>$</span>100
            </p>
          </div>
        </div>
        <div className={styles.actionWrapper}>
          <button>Create List</button>
        </div>
      </div>
      <AgGridTable
        columnDefs={columnDefs}
        rowData={rowData}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default UserDetails;
