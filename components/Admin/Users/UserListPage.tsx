"use client";
import React, { useState } from "react";
import styles from "./users.module.scss";
import AgGridTable from "../AgGridTable";
import { ColDef } from "ag-grid-community";

const UserListPage = () => {
  const [rowData, setRowData] = useState<any>([
    {
      slno: 1,
      fname: "christin",
      lname: "L F",
      email: "Email",
      status: "Active",
    },
  ]);
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

    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        const value = params.value;
        const color =
          value === "Active"
            ? "green"
            : value === "Deleted"
            ? "red"
            : "#fd7e14";
        const label =
          value === 1 ? "Active" : value === 2 ? "Deleted" : "InActive";
        return (
          <span style={{ color: color, fontWeight: "bold" }}>{value}</span>
        );
      },
    },
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
    <section>
      <div className={styles.headerWrapper}>
        <div className={styles.actionContentWrapper}>
          <div className={styles.actionFlex}>
            <button type="button" className={styles.active}>
              Customers
            </button>
            <button type="button">Managers</button>
          </div>
        </div>
      </div>
      <div className={styles.agridWrapper}>
        <AgGridTable
          columnDefs={columnDefs}
          rowData={rowData}
          onRowClick={handleRowClick}
        />
      </div>
    </section>
  );
};

export default UserListPage;
